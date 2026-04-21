import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import GarageDetailPage from "./pages/GarageDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/garage/:id",
    Component: GarageDetailPage,
  },
]);
