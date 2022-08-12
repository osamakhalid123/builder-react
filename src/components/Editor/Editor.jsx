import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_HOST } from "../../api";
import { ClientName } from "../../redux/features/page/pageSlice";
import GeditorConfig from "../../utils/geditorConfig";
import { fetchAssets } from "../../redux/features/assets/assetSlice";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert ref={ref} elevation={2} {...props} />;
});

const Editor = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const { pageId } = useParams();
  const assetsState = useSelector((state) => state.assets);
  const { assets } = assetsState;
  const dispatch = useDispatch();
  const { currentUser, uploadImage } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAssets());
  }, [uploadImage]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [Images, setImages] = useState([]);

  const HandleAddUserBtn = () => {
    dispatch(ClientName([pageId, { customName: name }]));
    setOpen(false);
    setName("");
  };

  useEffect(() => {
    async function getallpages() {
      try {
        const response = await dispatch(fetchAssets());
        setImages(response.payload);
      } catch (error) {
        console.log("error", error);
      }
    }
    getallpages();
  }, []);

  useEffect(() => {
    const editor = GeditorConfig(
      assets,
      pageId,
      uploadImage,
      currentUser,
      dispatch,
      setSnackBarOpen,
      navigate,
      Link,
      setOpen,
      Images
    );
  }, [assets, pageId, uploadImage, currentUser, dispatch, setSnackBarOpen]);

  return (
    <Box>
      <Box id="editor"></Box>

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
          Page saved successfully!
        </SnackbarAlert>
      </Snackbar>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        // TransitionComponent={Transition}
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
              HandleAddUserBtn();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Editor;
