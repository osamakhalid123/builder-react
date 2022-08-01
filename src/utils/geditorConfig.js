import { API_HOST } from "../api";
import customCodePlugin from "grapesjs-custom-code";
import gjsPresetWebage from "grapesjs-preset-webpage";
import grapesjs from "grapesjs";
import grapesjsPluginIframe from "grapesjs-plugin-iframe";
// import grapesjsimagemanager from "grapesjs-image-manager";
import iFramePlugin from "grapesjs-plugin-iframe";
import { pushViewPage } from "../redux/features/page/pageSlice";
import { uploadAsset } from "../redux/features/assets/assetSlice";
// 'grapesjs-image-manager'
const geditorConfig = (
  assets,
  pageId,
  uploadImage,
  currentUser,
  dispatch,
  setSnackBarOpen
) => {
  const editor = grapesjs.init({
    container: "#editor",
    allowScripts: 1,
    exportWrapper: true,
    storageManager: {
      type: "remote",
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
      options: {
        remote: {
          urlStore: `${API_HOST}pages/${pageId}/content`,
          urlLoad: `${API_HOST}pages/${pageId}/content`,
          // urlLoad: `${API_HOST}pages/${pageId}/assets`,
        },
      },
    },
    assetManager: {
      storageType: "",
      storeOnChange: true,
      storeAfterUpload: true,
      assets: [],
      autoAdd: true,
      // upload: false,
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
    plugins: [
      gjsPresetWebage,
      customCodePlugin,
      iFramePlugin,
      grapesjsPluginIframe,
      "grapesjs-image-manager",
    ],
    pluginsOpts: {
      gjsPresetWebage: {},
      customCodePlugin: {},
      iFramePlugin: {},
      // grapesjsPluginIframe: {},
      "grapesjs-image-manager": {},
    },
  });

  const srcs = assets.map((asset) => asset.src);
  editor.AssetManager.add(srcs);

  ////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////////////////////////
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

export default geditorConfig;

// editor.Commands.add("save-db", {
//   run: function (editor, sender) {
//     // sender.set("active", true);
//     // const viewInfo = [pageId, { document: pageDocument }];
//     // dispatch(pushViewPage(viewInfo));
//     // editor.store();
//     // setSnackBarOpen(true);
//     console.log(pageDocument);
//     console.log(Document);
//   },
