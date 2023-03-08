import React from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

import "./global/styles/reset.scss";
import "./global/styles/styles.scss";

export const App = () => (
    <RouterProvider router={router} />
);
