import {
  Typography,
  Divider,
  Stack,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Box,
  Alert,
  Button,
  Snackbar,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { updateUser } from "../../../redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../context/AuthProvider";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert ref={ref} elevation={2} {...props} />;
});

export const AccountSettings = ({ userEmail, userPhone, userUid }) => {
  const [phoneValue, setPhoneValue] = useState("");
  const [changePhone, setChangePhone] = useState(false);
  const [expanded, setExpanded] = useState("EmailPanel");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    invalidCurrentPassword: "",
    newPasswordLength: "",
    newPasswordNoMatch: "",
    phone: "",
  });

  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const handleExpandtion = (isExpanded, panel) => {
    setExpanded(isExpanded ? panel : false);
  };

  const updatePhoneHandler = () => {
    //Phone Validation
    if (!phoneValue) {
      return;
    }

    if (
      phoneValue &&
      !phoneValue.match(/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    ) {
      setError({
        ...error,
        phone: "Enter a valid phone number",
      });
      return;
    }

    const updateInfo = [userUid, { phone: phoneValue }];

    try {
      setLoading(true);
      setError({});
      dispatch(updateUser(updateInfo));
      setSnackBarOpen(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch {
      setError({
        ...error,
        phone: "Error updating your phone number",
      });
    }
    setLoading(false);
    setPhoneValue("");
  };

  const changePasswordHandler = () => {
    if (!currentPassword || !newPassword || !reNewPassword) {
      return;
    }

    if (currentPassword !== currentUser?.password) {
      setError({
        ...error,
        invalidCurrentPassword: "Invalid Password",
        newPasswordLength: "",
        newPasswordNoMatch: "",
      });
      return;
    }

    if (newPassword.length < 8) {
      setError({
        ...error,
        invalidCurrentPassword: "",
        newPasswordLength: "Password must be at least 8 digits",
        newPasswordNoMatch: "",
      });
      return;
    }

    if (newPassword !== reNewPassword) {
      setError({
        ...error,
        invalidCurrentPassword: "",
        newPasswordLength: "",
        newPasswordNoMatch: "Password doesn't match",
      });
      return;
    }

    if (newPassword && reNewPassword === currentUser.password) {
      setError({
        ...error,
        invalidCurrentPassword: "",
        newPasswordLength: "Please choose another password",
        newPasswordNoMatch: "",
      });
      return;
    }

    try {
      setLoading(true);
      setError({});
      dispatch(updateUser([userUid, { password: newPassword }]));
      setSnackBarOpen(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch {
      console.log("Error Changing your photo.");
    }
    setLoading(false);
    setCurrentPassword("");
    setNewPassword("");
    setReNewPassword("");
  };

  return (
    <>
      <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
        Account
      </Typography>
      <Divider />
      <Stack spacing={2}>
        <Accordion
          sx={{ mt: 2 }}
          elevation={0}
          expanded={expanded === "EmailPanel"}
          onChange={(e, isExpanded) =>
            handleExpandtion(isExpanded, "EmailPanel")
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>Email</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 1 }}>
            <Box p={1}>
              <Typography display="inline-flex" sx={{ fontWeight: 500 }}>
                {userEmail}
              </Typography>
              <Typography display="inline-flex" color="primary" sx={{ ml: 1 }}>
                - Primary
              </Typography>
              <Typography sx={{ ml: 1 }} variant="body2" color="text.secondary">
                Not visible in emails
              </Typography>
              <Typography sx={{ ml: 1 }} variant="body2" color="text.secondary">
                Receives notifications
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{ mt: 2 }}
          elevation={0}
          expanded={expanded === "PhonePanel"}
          onChange={(e, isExpanded) =>
            handleExpandtion(isExpanded, "PhonePanel")
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>Phone Number</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 1 }}>
            <Box p={1}>
              <Typography display="inline-flex" sx={{ fontWeight: 400 }}>
                {userPhone}
              </Typography>
              <Typography
                fontWeight={400}
                display="inline-flex"
                color="primary"
                sx={{ ml: 1, cursor: "pointer" }}
                component="span"
                onClick={() => {
                  setChangePhone(!changePhone);
                }}
              >
                - Change
              </Typography>
              <Typography sx={{ ml: 1 }} variant="body2" color="text.secondary">
                Not visible in phones
              </Typography>
              <Typography sx={{ ml: 1 }} variant="body2" color="text.secondary">
                Not Receiving notifications
              </Typography>
              {changePhone && (
                <TextField
                  disabled={loading.info}
                  label="Phone"
                  placeholder="0102 848 3696"
                  type="tel"
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  error={!!error.phone}
                  helperText={!!error.phone && error.phone}
                  sx={{ mt: 2 }}
                />
              )}
            </Box>
          </AccordionDetails>
          {changePhone && (
            <AccordionActions>
              <Button
                variant="contained"
                color="success"
                disableElevation
                onClick={updatePhoneHandler}
              >
                Update Phone Number
              </Button>
            </AccordionActions>
          )}
        </Accordion>

        <Accordion
          elevation={0}
          expanded={expanded === "PasswordPanel"}
          onChange={(e, isExpanded) =>
            handleExpandtion(isExpanded, "PasswordPanel")
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>Change Password</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 1 }}>
            <Stack width={300} alignItems="flex-start">
              <TextField
                label="Current"
                type="password"
                sx={{ padding: 1, input: { padding: 1 } }}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={!!error.invalidCurrentPassword}
                helperText={
                  !!error.invalidCurrentPassword && error.invalidCurrentPassword
                }
              />
              <TextField
                label="New"
                type="password"
                sx={{ padding: 1, input: { padding: 1 } }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={!!error.newPasswordLength}
                helperText={
                  !!error.newPasswordLength && error.newPasswordLength
                }
              />
              <TextField
                label="Re-type new"
                type="password"
                sx={{ padding: 1, input: { padding: 1 } }}
                value={reNewPassword}
                onChange={(e) => setReNewPassword(e.target.value)}
                error={!!error.newPasswordNoMatch}
                helperText={
                  !!error.newPasswordNoMatch && error.newPasswordNoMatch
                }
              />
            </Stack>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="contained"
              color="success"
              disableElevation
              onClick={changePasswordHandler}
            >
              Change password
            </Button>
          </AccordionActions>
        </Accordion>

        <Snackbar
          open={snackBarOpen}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <SnackbarAlert
            severity={!error.invalidCurrentPassword ? "info" : "error"}
            onClose={(e, reason) => {
              if (reason === "clickaway") {
                return;
              }
              setSnackBarOpen(false);
            }}
          >
            {!error.invalidCurrentPassword
              ? "Settings changed successfully!"
              : "Error changing your settings!"}
          </SnackbarAlert>
        </Snackbar>
      </Stack>
    </>
  );
};
