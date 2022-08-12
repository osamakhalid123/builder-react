import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Slide,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { ClientName, deletePage } from "../../../redux/features/page/pageSlice";
import React, { forwardRef, useState } from "react";

import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";
import { createPage } from "../../../redux/features/page/pageSlice.js";
import moment from "moment";
import { useAuth } from "../../../context/AuthProvider.js";
import { useDispatch } from "react-redux";

//////////////////////////////////////////////////////

////////////////////////////////////////////////////

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert ref={ref} elevation={2} {...props} />;
});
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PagesSettings = ({ userUid, pageState }) => {
  const [error, setError] = useState("");
  const [pageToDelete, setPageToDelete] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { pages } = pageState;
  const userPages = pages.filter((page) => page.userId === userUid);
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [openNewPage, setopenNewPage] = useState(false);

  const [nameNewPage, setnameNewPage] = useState("");
  const [clienPagetid, setclienPagetid] = useState("");
  const { currentUser } = useAuth();

  const HandleUser = () => {
    dispatch(ClientName([clienPagetid, { customName: name }]));
    setOpen(false);
    setName("");
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };

  /////////////////////////////////////////////////////////////////////
  const handleSubmitNewPage = async (e) => {
    e.preventDefault();
    if (!nameNewPage) {
      setIsValid(false);
      return;
    }
    const userPages = pages.filter((page) => page.userId === currentUser._id);
    if (userPages.find((page) => page.name === nameNewPage)) {
      setIsDuplicated(true);
      return;
    }
    const pageInfo = {
      name: nameNewPage,
      userId: currentUser._id,
    };

    setopenNewPage(false);
    dispatch(createPage(pageInfo));
    // setSnackBarOpen(true);
    setName("");
    setIsDuplicated(false);
  };

  ///////////////////////////////////////////////////////////

  const HandlePageDeletion = () => {
    if (!pageToDelete) {
      return;
    }

    try {
      dispatch(deletePage(pageToDelete));
      setShowDeleteDialog(false);
      setSnackBarOpen(true);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch {
      setError("Error Deleting your page!");
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          width: { xs: 400, md: 700 },
          mt: { xs: 2, md: 0 },
        }}
      >
        <Table
          sx={{ minWidth: { xs: 400, md: 700 } }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
              {/* ///////////////////////////////////////////////////////////////// */}

              {/* ////////////////////////////////////////////////////////////////////////////   */}
              <TableCell
                sx={{
                  fontWeight: 600,
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Date Created
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Last Modified
              </TableCell>

              <TableCell sx={{ fontWeight: 600 }}>
                <Button onClick={() => setopenNewPage(true)}>
                  Create new Page
                </Button>

                <Dialog
                  open={openNewPage}
                  onClose={() => setopenNewPage(false)}
                  TransitionComponent={Transition}
                >
                  <DialogTitle>Create Page</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To create new page, please enter the page title here. By
                      creating this page you agree to our privacy and policy of
                      pages.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="nameNewPage"
                      label="Page Title"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={nameNewPage}
                      onChange={(e) => setnameNewPage(e.target.value)}
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
                    <Button onClick={() => setopenNewPage(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitNewPage}>Create</Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userPages.map((page) => (
              <TableRow
                key={page._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Box>
                    <Typography sx={{ display: "inline-block" }}>
                      {page.name}
                    </Typography>
                    ({page.slug})
                  </Box>
                  <Stack direction={"row"} spacing={1} alignItems="center">
                    <Link
                      to={`/editor/${page._id}`}
                      style={{ color: "blue", textDecoration: "none" }}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="text"
                      color="error"
                      sx={{ textTransform: "none" }}
                      onClick={() => {
                        setShowDeleteDialog(true);
                        setPageToDelete(page._id);
                      }}
                    >
                      Delete
                    </Button>

                    <Link
                      to={{
                        pathname: `${
                          page.customName
                            ? `/view/${page.customName}/${page._id}`
                            : `/view/${page._id}`
                        }`,
                      }}
                      // state={`${page._id}`}
                      // state={{ id: `${page._id}` }}
                      style={{ color: "blue", textDecoration: "none" }}
                    >
                      View
                    </Link>

                    <Button
                      variant="text"
                      sx={{ textTransform: "none" }}
                      onClick={() => {
                        setOpen(true);
                        setclienPagetid(page._id);
                      }}
                    >
                      User
                    </Button>
                    <Dialog
                      open={open}
                      onClose={() => setOpen(false)}
                      TransitionComponent={Transition}
                    >
                      <DialogTitle>Add User</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Please Add the User Conected to The page
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="User Name"
                          type="text"
                          fullWidth
                          variant="standard"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button
                          onClick={() => {
                            HandleUser();
                          }}
                        >
                          Add
                        </Button>
                      </DialogActions>
                    </Dialog>
                    {/* /////////////////////////////////////////////////////////////////// */}
                  </Stack>
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {moment
                    .utc(page.createdAt, "YYYY-MM-DDTHH:mm:ssZ")
                    .format("YYYY-MM-DD")}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {moment
                    .utc(page.updatedAt, "YYYY-MM-DDTHH:mm:ssZ")
                    .format("YYYY-MM-DD")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure to Delete the page?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            By Deleting this page you won't be able to restore it again and all
            page data will be lost, proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>
            Keep the page
          </Button>
          <Button onClick={HandlePageDeletion}>Delete</Button>
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
          severity={!error ? "info" : "error"}
          onClose={(e, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setSnackBarOpen(false);
          }}
        >
          {!error ? "Page deleted successfully!" : error}
        </SnackbarAlert>
      </Snackbar>
    </>
  );
};
