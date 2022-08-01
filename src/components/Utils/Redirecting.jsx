import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Redirecting = ({ title }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 3000);
  }, [title, navigate]);

  return (
    <Box
      bgcolor={"primary.light"}
      width="100%"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress sx={{ color: "white" }} />
    </Box>
  );
};
