import { useRef } from "react";
import { Outlet } from "react-router-dom";
import Style from "./Auth.module.scss";

const AuthModule = () => {
  const emailRef = useRef("");

  return (
    <div className={Style.root}>
      <div className={Style.root_inner}>
        <div className={`${Style.logoWrapper} pro-pb-5`}></div>
        <div className={`${Style.auth} pro-pt-3`}>
          <Outlet context={{ emailRef }} />
        </div>
      </div>
    </div>
  );
};

export default AuthModule;
