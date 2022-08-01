import {
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Avatar,
  Box,
  FormControlLabel,
  Checkbox,
  Container,
  Stack,
  Snackbar,
  Alert,
  Button,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PeopleIcon from "@mui/icons-material/People";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { motion } from "framer-motion";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { createUser } from "../../redux/features/user/userSlice";
import moment from "moment";

const boxVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, type: "spring" },
  },
  tap: {
    scale: 0.9,
  },
};

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert ref={ref} elevation={2} {...props} />;
});

export const Register = ({ title }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [birthDay, setBirthDay] = useState("");
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("home");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [validationError, setValidationError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    birthDay: "",
    address: "",
  });

  const dispatch = useDispatch();
  const avatar = "";

  useEffect(() => {
    document.title = title;
  }, [title]);

  const registerHandler = async (e) => {
    e.preventDefault();

    // BODY
    const name = `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${
      lastName.charAt(0).toUpperCase() + lastName.slice(1)
    }`;
    const age = parseInt(moment(birthDay, "YYYYMMDD").fromNow().slice(0, 2));

    const userInfo = {
      name: name,
      age: age,
      gender: gender,
      email: email,
      password: password,
      addresses: [
        {
          details: address,
          addrType: addressType,
        },
      ],
      phone: phone,
      avatar: avatar,
    };

    // Validations
    if (!firstName.match(/^[a-zA-Z]+$/)) {
      setValidationError({
        firstName: "Enter a valid name",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        birthDay: "",
        address: "",
      });
      setFirstName("");
      return;
    }

    if (!lastName.match(/^[a-zA-Z]+$/)) {
      setValidationError({
        lastName: "Enter a valid name",
        firstName: "",
        email: "",
        password: "",
        phone: "",
        birthDay: "",
        address: "",
      });
      setLastName("");
      return;
    }

    if (password.length < 8) {
      setValidationError({
        password: "Password must be at least 8 digits!",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDay: "",
        address: "",
      });
      return;
    }

    if (!phone.match(/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
      setValidationError({
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "Please enter a valid phone number",
        birthDay: "",
        address: "",
      });
      return;
    }

    // check connection

    try {
      setLoading(true);
      setValidationError({});
      dispatch(createUser(userInfo));

      // empty fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setBirthDay(null);
      setAddress("");
      setAddressType("home");
      setGender("male");
      setAgreed(false);

      // hint the user
      setSnackBarOpen(true);
    } catch {
      const { error } = dispatch(createUser(userInfo));
      setError(error);
    }

    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component={motion.div}
        variants={boxVariants}
        initial="hidden"
        animate="visible"
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PeopleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        {/* Start Form */}
        <Box component="form" onSubmit={registerHandler} sx={{ mt: 2 }}>
          <Stack direction={"row"} spacing={2} mb={1}>
            <TextField
              fullWidth
              label="First Name"
              disabled={loading}
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!validationError.firstName}
              helperText={
                !!validationError.firstName && validationError.firstName
              }
            />

            <TextField
              fullWidth
              disabled={loading}
              label="Last Name"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!validationError.lastName}
              helperText={
                !!validationError.lastName && validationError.lastName
              }
            />
          </Stack>
          <TextField
            fullWidth
            margin="normal"
            disabled={loading}
            label="Email"
            type="email"
            error={!!validationError.email}
            helperText={!!validationError.email && validationError.email}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            disabled={loading}
            label="Password"
            type={showPassword ? "text" : "password"}
            error={!!validationError.password}
            helperText={
              !!validationError.password
                ? validationError.password
                : "Use 8 or more characters using letters, numbers, or symbols"
            }
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            disabled={loading}
            label="Phone"
            type="tel"
            error={!!validationError.phone}
            required
            sx={{ marginBottom: 2 }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            helperText={
              !!validationError.phone
                ? validationError.phone
                : "Example: 010xxxxxxxx"
            }
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Birthday"
              value={birthDay}
              required
              onChange={(newValue) => {
                setBirthDay(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!validationError.age}
                />
              )}
            />
          </LocalizationProvider>

          <FormControl sx={{ width: "100%", marginTop: 1 }}>
            <FormLabel>Address</FormLabel>
            <Stack direction={"row"} spacing={2} mb={1} mt={1}>
              <TextField
                fullWidth
                label="Address"
                disabled={loading}
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={!!validationError.address}
                helperText={
                  !!validationError.address && validationError.address
                }
              />

              <Select
                fullWidth
                required
                value={addressType}
                onChange={(e) => setAddressType(e.target.value)}
              >
                <MenuItem value="home">Home</MenuItem>
                <MenuItem value="work">Work</MenuItem>
              </Select>
            </Stack>
          </FormControl>

          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              defaultValue="male"
              row
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                required
                disabled={loading}
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
            }
            label="I agree to privacy terms and conditions."
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            disableElevation
            component={motion.button}
            variants={boxVariants}
            whileTap="tap"
          >
            Register
          </Button>
        </Box>
        {/* End Form */}

        <Typography sx={{ mb: 2 }}>
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Login
          </Link>
        </Typography>

        <Typography color="text.secondary" align="center">
          Copyright ©{" "}
          <Link color="inherit" href="https://virtualworkernow.com/">
            VWM
          </Link>
        </Typography>
      </Box>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <SnackbarAlert
          severity={"info"}
          onClose={(e, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setSnackBarOpen(false);
          }}
        >
          {!error ? "Registered successfully!" : error}
        </SnackbarAlert>
      </Snackbar>
    </Container>
  );
};
