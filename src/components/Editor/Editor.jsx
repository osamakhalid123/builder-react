import { Alert, Box, Snackbar } from "@mui/material";
import { forwardRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import { fetchAssets } from "../../redux/features/assets/assetSlice";
import geditorConfig from "../../utils/geditorConfig";
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

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  useEffect(() => {
    const editor = geditorConfig(
      assets,
      pageId,
      uploadImage,
      currentUser,
      dispatch,
      setSnackBarOpen
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
    </Box>
  );
};
export default Editor;
