import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import useAuth from "./useAuth";
import "./Login.css";

const Login = () => {

  const { formik, handleShowPassword, loginStatus } = useAuth("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="login-form">
      <div className="login-title">
        <h1>Login</h1>
      </div>
      <div className="input-wrap pro-mb-5">
        <label htmlFor="email" className="pro-font-sm pro-mb-1 pro-fw-medium">
          Email
        </label>
        <input
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          className={`pro-input lg ${
            formik.errors.email &&
            (formik.touched.email || formik.values.email) &&
            "error"
          } ${loginStatus === "pending" ? "disabled" : ""} `}
        />
        {formik.errors.email &&
          (formik.touched.email || formik.values.email) && (
            <span className="error-text">{formik.errors.email}</span>
          )}
      </div>

      <div className="input-wrap pro-mb-5 p-re">
        <label
          htmlFor="password"
          className="pro-font-sm pro-mb-1 pro-fw-medium"
        >
          Password
        </label>
        <input
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type={passwordVisible ? "text" : "password"}
          className={`pro-input lg ${
            formik.errors.password && formik.touched.password && "error"
          } ${loginStatus === "pending" ? "disabled" : ""} hide-icon-input`}
        />

        <button
          className="hide-icon"
          onClick={() => setPasswordVisible(!passwordVisible)}
          type="button"
        >
          <span className="material-symbols-outlined">
            {passwordVisible ? "visibility_off" : "visibility"}
          </span>
        </button>

        {formik.errors.password && formik.touched.password && (
          <span className="error-text">{formik.errors.password}</span>
        )}
      </div>

      <div className="login-button-wrapper">
        <button
          className="login-button"
          onClick={formik.handleSubmit}
          disabled={loginStatus === "pending"}
        >
          {loginStatus === "pending" ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
