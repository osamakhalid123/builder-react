import {
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Avatar,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Container,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const boxVariants = {
  hidden: {
    opacity: 0,
    x: "-100vw",
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

export const Login = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remeberMe, setRemeberMe] = useState(false);

  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
    if (currentUser) {
      navigate("/redirecting");
    }
  }, [title, currentUser, navigate]);

  const loginHandler = (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      login(email, password);

      if (localStorage.getItem("uid")) {
        navigate("/redirecting");
      }
    } catch (err) {
      setError(err.message);
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={loginHandler} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            label="Email"
            type="email"
            fullWidth
            required
            disabled={loading}
            error={!!error}
            helperText={!!error && "Incorrect Email or Password"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            disabled={loading}
            error={!!error}
            helperText={!!error && "Incorrect Email or Password"}
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
          <FormControlLabel
            control={
              <Checkbox
                disabled={loading}
                checked={remeberMe}
                onChange={(e) => setRemeberMe(e.target.checked)}
              />
            }
            label="Remeber Me?"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            disableElevation
            endIcon={<LoginIcon />}
            component={motion.button}
            variants={boxVariants}
            whileTap="tap"
          >
            Login
          </Button>
        </Box>

        <Grid container>
          <Grid item xs>
            <Link href="/forgot-password" underline="hover">
              <Typography variant="body2">Forgot Password?</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/register" underline="hover">
                Sign Up
              </Link>
            </Typography>
          </Grid>
        </Grid>

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
      </Box>
    </Container>
  );
};
