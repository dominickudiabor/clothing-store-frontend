import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import FormInput from "../../components/form-input";

import { useDispatch } from "react-redux";

import { passwordRequestStart } from "../../redux/actions";
import { useHistory } from "react-router-dom";

import "./reset.scss";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setEmail(value);
  };
  const handleReturn = () => history.goBack();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (email) {
      dispatch(passwordRequestStart(email));

      setEmail("");
    } else {
      return;
    }
  };

  return (
    <>
      <div className="reset">
        <p className="title">Forgot your password?</p>
        <p className="message">
          Please enter the email address you used to create your account, and
          we'll send you a link to reset your password.
        </p>
        <form className="reset__form" onSubmit={handleSubmit}>
          <FormInput
            name="email"
            type="email"
            label="Email"
            value={email}
            handleChange={handleChange}
            required
          />
          <Button
            className="button"
            variant="contained"
            color="primary"
            type="submit"
          >
            {" "}
            Submit
          </Button>
        </form>
        <Button className="dash__button" onClick={handleReturn}>
          Return
        </Button>
      </div>
    </>
  );
};
export default ResetPassword;
