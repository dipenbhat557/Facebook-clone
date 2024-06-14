import { configureStore } from "@reduxjs/toolkit";
import postReducer from "@/lib/features/postSlice";

export default configureStore({
  reducer: {
    post: postReducer,
  },
});
