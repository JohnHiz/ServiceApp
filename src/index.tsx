import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

const rootNode = document.getElementById("app") as Element;
const rootElement = createRoot(rootNode);

rootElement.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
