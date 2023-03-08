import React from "react";
import { useRouteError } from "react-router-dom";

import { errorCheck } from "./ErrorPage.helpers";

export const ErrorPage = () => {
    const error = useRouteError();

    return errorCheck(error) ? (
        <div id="error-page">
            <h1>Oops! Page not found</h1>
            <p>Sorry the route you are looking for does not exist.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    ) : (
        <></>
    );
};
