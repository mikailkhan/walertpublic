import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./LoginSlice";

export const store = configureStore({
  reducer: { userLoginState: loginSlice.reducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
