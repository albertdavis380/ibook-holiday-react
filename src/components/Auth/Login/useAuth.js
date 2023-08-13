import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import useValidations from "../../../utils/hooks/useValidations";

const useAuth = (emailRef) => {
  const navigate = useNavigate();
  const { validateEmail } = useValidations();

  const [loginStatus, setLoginStatus] = useState("idle");
  const [loginInfo, setLoginInfo] = useState({});
  const [showPassword, setShowPassword] = useState(true);


  const userToken = localStorage.getItem("USER_ACCESS_TOKEN");

  useEffect(() => {
    if (loginStatus === "success") {
      navigate("/home");
    } else if (loginStatus === "failed") {
      let errorFields = Object.keys(loginInfo);
      errorFields.forEach((field) => {
        formik.setFieldError(field, loginInfo[field]);
      });
    }
    // eslint-disable-next-line
  }, [loginStatus]);

  useEffect(() => {
    if (userToken != undefined) {
      navigate("/home");
    }
    // eslint-disable-next-line
  }, [userToken]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "*Email Required";
      }
      if (!values.password) {
        errors.password = "*Password Required";
      }
      if (!validateEmail(values.email)) {
        errors.email = "*Enter a valid email";
      }
      return errors;
    },
    onSubmit: (values) => {
      emailRef.current = values.email;

      setLoginStatus("pending");

      login(values).then((response) => {
        if (response.data.success) {
          setLoginInfo(response?.data?.data);
          localStorage.setItem("user_role", response?.data?.data?.user_role);
          localStorage.setItem(
            "USER_ACCESS_TOKEN",
            response?.data?.data?.token
          );
          setLoginStatus("success");
        } else {
          if (response?.message !== "") {
            setLoginStatus("failed");
            setLoginInfo({
              password: response?.message,
            });
          } else {
            setLoginStatus("failed");
            setLoginInfo({
              password:
                "An error occurred during login. Please try again later.",
            });
          }
        }
      });
    },
  });

  const handleShowPassword = (e) => {
    e.preventDefault();

    setShowPassword(!showPassword);
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return {
    formik,
    loginStatus,
    showPassword,
    handleShowPassword,
  };
};

export default useAuth;
