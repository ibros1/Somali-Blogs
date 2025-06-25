import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainRoute from "./pages/MainRoute";
import NotFound from "./pages/notFound";
import Login from "./pages/auth/logIn";
import Signup from "./pages/auth/signUp";
import Articles from "./pages/articles/Articles";
import ArticleDetail from "./pages/articles/articleDetail";
import MyProfile from "./components/myProfile";
import MyArticlesPage from "./pages/articles/MyArticlesPage";
import ListMembers from "./components/listMembers";
import GetOneMember from "./components/getOneMember";

// import MyPosts from "./pages/articles/myPosts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/posts",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/posts/new",
        element: <Articles />,
      },
      {
        path: "/articles/:articleId",
        element: <ArticleDetail />,
      },

      {
        path: "/members",
        element: <ListMembers />,
      },
      {
        path: "/members/:userId",
        element: <GetOneMember />,
      },
      {
        path: "my-posts",
        element: <MyArticlesPage />,
      },

      {
        path: "my-account",
        element: <MyProfile />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
