import React from "react";

import SignUp from "../../components/sign-up";
import SignIn from "../../components/sign-in";

import "./authentication.scss";

import { useSelector } from "react-redux";
import { AppState } from "../../types";

const Authentication = () => {
  const showSignUpPage = useSelector(
    (state: AppState) => state.ui.toggleSignUp
  );

  return (
    <>
      <div className="auth-container">
        {showSignUpPage ? <SignUp /> : <SignIn />}
      </div>
    </>
  );
};

export default Authentication;
