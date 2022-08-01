import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Slide,
  Snackbar,
  Typography,
} from "@mui/material";
import { Button, TextField } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";

import { createPage } from "../../../redux/features/page/pageSlice";
import { useAuth } from "../../../context/AuthProvider";
import { useDispatch } from "react-redux";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert ref={ref} elevation={2} {...props} />;
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AddPage = ({ pageState }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [show, setShow] = useState(false);

  const { currentUser } = useAuth();
  const { pages } = pageState;
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setIsValid(false);
      return;
    }
    const userPages = pages.filter((page) => page.userId === currentUser._id);
    if (userPages.find((page) => page.name === name)) {
      setIsDuplicated(true);
      return;
    }
    const pageInfo = {
      name: name,
      userId: currentUser._id,
    };

    setOpen(false);
    dispatch(createPage(pageInfo));
    setSnackBarOpen(true);
    setName("");
    setIsDuplicated(false);
  };

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
          onClick={() => setOpen(true)}
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
            Create new page
          </Typography>
        </Box>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle>Create Page</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new page, please enter the page title here. By creating
            this page you agree to our privacy and policy of pages.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Page Title"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!isValid || isDuplicated}
            helperText={
              !isValid
                ? "Please provide a valid name."
                : isDuplicated
                ? "Page already exist."
                : null
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>

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
          {"Page created successfully!"}
        </SnackbarAlert>
      </Snackbar>
    </>
  );
};
