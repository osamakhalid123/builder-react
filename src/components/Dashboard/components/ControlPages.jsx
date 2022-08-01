import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ControlPages = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  return (
    <>
      {!show ? (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          sx={{ height: { xs: 150, sm: 200 } }}
        />
      ) : (
        <Box
          onClick={() => navigate("settings/pages")}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={{ xs: 150, sm: 200 }}
          borderRadius={1}
          sx={{
            cursor: "pointer",
            backgroundColor: "success.light",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "error.light",
              transform: "scale(1.01)",
            },
          }}
        >
          <Typography
            fontWeight={500}
            color="white"
            sx={{ fontSize: { xs: 20, sm: 24 } }}
          >
            Control your pages
          </Typography>
        </Box>
      )}
    </>
  );
};
