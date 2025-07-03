import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./slices/auth/login";
import { registerSlice } from "./slices/auth/register";
import { articleSlice } from "./slices/auth/articles/articles";
import { getArticleSlice } from "./slices/auth/articles/getArticle";
import { getArticleDetailSlice } from "./slices/auth/articles/getOneArticle";
import { createCommentSlice } from "./slices/auth/comments/createComment";
import { listArticleCommentsSlice } from "./slices/auth/comments/listComments";
import { myArticlesSlice } from "./slices/auth/articles/myArticles";
import { getMembersSlice } from "./slices/auth/members";
import { getOneMembersSlice } from "./getOneMember";
import { updateUserSlice } from "./slices/auth/updateUser";
import { deleteArticleSlice } from "./slices/auth/articles/deleteArticle";

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
    registerSlice: registerSlice.reducer,
    updateUserSlice: updateUserSlice.reducer,
    articleSlice: articleSlice.reducer,
    getArticleSlice: getArticleSlice.reducer,
    getArticleDetailSlice: getArticleDetailSlice.reducer,
    createCommenSlice: createCommentSlice.reducer,
    listArticleComments: listArticleCommentsSlice.reducer,
    myArticlesSlice: myArticlesSlice.reducer,
    getMembersSlice: getMembersSlice.reducer,
    getOneMembersSlice: getOneMembersSlice.reducer,
    deleteArticleSlice: deleteArticleSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
