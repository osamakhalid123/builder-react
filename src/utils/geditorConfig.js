import { API_HOST, API_HOST2 } from "../api";
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
import { ReactHooksWrapper, getHook, setHook } from "react-hooks-outside";
import { fetchAssets, uploadAsset } from "../redux/features/assets/assetSlice";
import { pushViewPage, testExit } from "../redux/features/page/pageSlice";
import { useDispatch, useSelector } from "react-redux";

import Component from "./Componenet";
import { async } from "@firebase/util";
import customCodePlugin from "grapesjs-custom-code";
import gjsPresetWebage from "grapesjs-preset-webpage";
import grapesjs from "grapesjs";
import grapesjsPluginIframe from "grapesjs-plugin-iframe";
import iFramePlugin from "grapesjs-plugin-iframe";

const GeditorConfig = (
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
) => {
  const projectEndpoint = `${API_HOST}pages/${pageId}/content`;

  const editor = grapesjs.init({
    container: "#editor",
    allowScripts: 1,
    exportWrapper: true,
    assetManager: {
      storageType: "",
      storeOnChange: true,
      storeAfterUpload: true,
      assets: [],
      autoAdd: true,
      upload: true,
      uploadFile: async function (e) {
        var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        await uploadImage(files[0]).then((url) => {
          const assetInfo = {
            type: files[0].type,
            src: url,
            userId: currentUser._id,
          };
          dispatch(uploadAsset(assetInfo));
        });
      },
    },
    storageManager: {
      // type: 0,
      type: "remote",
      // type: "local",
      // autoload: false,
      autosave: true,
      stepsBeforeSave: 1,
      contentTypeJson: true,
      storeComponents: true,
      storeStyles: true,
      storeHtml: true,
      storeCss: true,
      headers: {
        "Content-Type": "application/json",
      },

      // id: "mycustom-",
      // urlStore: `${API_HOST}pages/${pageId}/content`,
      // urlLoad: `${API_HOST}pages/${pageId}/content`,
      options: {
        remote: {
          urlStore: projectEndpoint,
          urlLoad: projectEndpoint,

          // onStore: data => ({ id: projectID, data }),
          // onLoad: (result) => console.log(result.data),
        },
      },
    },

    plugins: [
      gjsPresetWebage,
      customCodePlugin,
      iFramePlugin,
      grapesjsPluginIframe,
    ],
    pluginsOpts: {
      gjsPresetWebage: {},
      customCodePlugin: {},
      iFramePlugin: {},
    },
  });
  const srcs = assets.map((asset) => asset.src);
  editor.AssetManager.add(srcs);
  ////////////////////////////////////////////////////////////

  editor.on("run:preview", () => {
    editor.DomComponents.getWrapper().onAll(
      (comp) => comp.is("text") && comp.set({ editable: false })
    );
  });

  editor.on("stop:preview", () => {
    editor.DomComponents.getWrapper().onAll(
      (comp) => comp.is("text") && comp.set({ editable: false })
    );
  });
  ////////////////////////////////////////////////////////////////////////////

  // editor.on("storage:start", () => {
  //   console.log("start storage");
  // });

  // editor.on("component:create", () => {
  //   // document.getElementById("i2jw")
  //   // dispatch(fetchAssets());
  //   console.log(document.getElementById("ii3m"));
  //   console.log("test");
  // });
  // editor.on("run:open-assets", function () {
  //   const assets = document.getElementsByClassName(".gjs-plh-image");
  //   assets.addEventListener("click", () => console.log("callback"));
  // });

  // const projectData = editor.getProjectData();
  // ...
  // Load project data
  // editor.loadProjectData(projectData);
  // console.log(editor.load());
  // console.log(editor.loadProjectData(editor.getProjectData().assets));
  //////////////////////////////////////////////////////////////////////////////

  editor.Panels.addButton("options", [
    {
      id: "exit",
      className: "fa fa-times",
      command: "exit",
      attributes: { title: "Exit" },
    },
  ]);

  editor.Commands.add("exit", {
    run: function (editor, sender) {
      sender.set("active", true);

      const viewInfo = [
        pageId,
        {
          HTML: editor.getHtml(),
          CSS: editor.getCss(),
        },
      ];

      dispatch(pushViewPage(viewInfo));
      editor.store();
      setTimeout(() => {
        window.location.replace(`${API_HOST2}dashboard/settings/pages`);
      }, 800);
    },
  });

  editor.Panels.addButton("options", [
    {
      id: "adduser",
      className: "fa fa-user-plus",
      command: "adduser",
      attributes: { title: "Add Name" },
    },
  ]);

  editor.Commands.add("adduser", {
    run: function (editor, sender) {
      sender.set("active", true);
      setOpen(true);
    },
  });

  ///////////////////////////////////////////////////////////////////
  editor.Panels.addButton("options", [
    {
      id: "save-db",
      className: "fa fa-floppy-o",
      command: "save-db",
      attributes: { title: "Save DB" },
    },
  ]);

  editor.Commands.add("save-db", {
    run: function (editor, sender) {
      sender.set("active", true);

      const viewInfo = [
        pageId,
        {
          HTML: editor.getHtml(),
          CSS: editor.getCss(),
        },
      ];

      dispatch(pushViewPage(viewInfo));
      editor.store();
      setSnackBarOpen(true);
    },
  });
};

export default GeditorConfig;
