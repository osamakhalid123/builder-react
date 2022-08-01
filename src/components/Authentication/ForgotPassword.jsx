import {
  Avatar,
  Box,
  TextField,
  Container,
  Typography,
  Link,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const boxVariants = {
  hidden: {
    opacity: 0,
    y: "100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, type: "spring" },
  },
  tap: {
    scale: 0.9,
  },
};

export const ForgotPassword = ({ title }) => {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
    return <Alert ref={ref} elevation={2} {...props} />;
  });

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>

        <Box component="form" onSubmit={forgotPasswordHandler} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            label="Email"
            type="email"
            fullWidth
            required
            disabled={loading}
            error={!!isError}
            helperText={!!isError && "Email Address Not Exist!"}
            inputRef={emailRef}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            disableElevation
            loading={loading}
            component={motion.button}
            variants={boxVariants}
            whileTap="tap"
          >
            Reset
          </Button>
        </Box>

        <Link href="/login" underline="hover" variant="body2">
          Login?
        </Link>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Copyright ©{" "}
          <Link color="inherit" href="https://virtualworkernow.com/">
            VWM
          </Link>
        </Typography>
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
            Check The Message Sent to your Email!
          </SnackbarAlert>
        </Snackbar>
      </Box>
    </Container>
  );
};
