import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PostState {
  value: any[];
}

const initialState: PostState = {
  value: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<any>) => {
      state.value.unshift(action.payload);
    },
    addAllPost: (state, action: PayloadAction<any[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addPost, addAllPost } = postSlice.actions;
export const selectPost = (state: any) => state.post.value;
export default postSlice.reducer;
