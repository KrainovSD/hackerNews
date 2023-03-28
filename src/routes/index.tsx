import { NewsInfo } from "../models/news/NewsInfo";
import { NewsList } from "../models/news/NewsList";
import { Navigate } from "react-router-dom";

export const routes = [
  { path: "/", element: <NewsList /> },
  { path: "/news/:id", element: <NewsInfo /> },
  { path: "*", element: <Navigate to={"/"} replace /> },
];
