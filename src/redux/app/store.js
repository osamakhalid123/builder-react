import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/page/pageSlice";
import userReducer from "../features/user/userSlice";
import assetsReducer from "../features/assets/assetSlice";

const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    assets: assetsReducer,
  },
});

export default store;
