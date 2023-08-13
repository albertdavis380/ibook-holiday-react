import React from "react";
import {
  BrowserRouter,
  Route,
  Routes as BrowserRoutes,
} from "react-router-dom";

import AuthModule from "../components/Auth";
import Login from "../components/Auth/Login";

const Routes = () => {
  return (
    <BrowserRouter>
      <BrowserRoutes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<AuthModule />}>
          <Route path="" element={<Login />}></Route>
        </Route>
      </BrowserRoutes>
    </BrowserRouter>
  );
};

export default Routes;
