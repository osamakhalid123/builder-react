import React, { forwardRef, useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Alert,
  Snackbar,
  Container,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DoneIcon from "@mui/icons-material/Done";
import Cover from "../../../assets/cover.png";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert ref={ref} elevation={2} {...props} />;
});

export const Profile = () => {
  const [cover, setCover] = useState(Cover);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userName, userEmail, avatar } = useOutletContext();

  useEffect(() => {
    document.title = userName ? userName : "Profile";
  }, [userName]);

  return (
    <Box pt={2} minHeight="calc(100vh - 64px)">
      <Container>
        <Box
          p={1}
          height={320}
          borderRadius={4}
          sx={{ backgroundColor: "white" }}
        >
          <Box position={"relative"}>
            <Box borderRadius={4} overflow="hidden" position="relative">
              <Avatar
                src={cover}
                variant="rounded"
                sx={{ width: "100%", height: 200 }}
                alt="cover"
              />
            </Box>

            <Stack
              direction={{ sm: "row", xs: "column" }}
              alignItems={{ sm: "flex-end", xs: "center" }}
              spacing={{ sm: 2, xs: 1 }}
              ml={{ sm: 6, xs: 0 }}
              position="absolute"
              bottom={{ sm: "-30%", xs: "-50%" }}
              left={{ sm: 0, xs: "50%" }}
              sx={{
                transform: { sm: "translateX(0)", xs: "translateX(-50%)" },
              }}
              minWidth={200}
            >
              <Avatar
                src={avatar}
                alt="avatar"
                sx={{
                  width: { sm: 120, xs: 100 },
                  height: { sm: 120, xs: 100 },
                }}
              />

              <Stack alignItems={{ sm: "flex-start", xs: "center" }}>
                <Typography fontSize={{ sm: 18, xs: 16 }} fontWeight={600}>
                  {userName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={{ sm: 15, xs: 13 }}
                >
                  {userEmail}
                </Typography>
              </Stack>
            </Stack>
          </Box>
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
            severity="info"
            onClose={(e, reason) => {
              if (reason === "clickaway") {
                return;
              }
              setSnackBarOpen(false);
            }}
          >
            Cover Changed successfully!
          </SnackbarAlert>
        </Snackbar>
      </Container>
    </Box>
  );
};
