import React, { useEffect } from "react";

import Routes from "./Routes";
import { AppState } from "./types";

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "./redux/actions";
import axios from "axios";
import "./App.scss";

export default function App() {
  const dispatch = useDispatch();

  const { sessionExp: sessionExpTime, token } = useSelector(
    (state: AppState) => state.user
  );

  axios.defaults.baseURL = "http://localhost:9000/api/v1/";
  token && (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  useEffect(() => {
    function activateSessionCheck(time: number) {
      if (Date.now() > time) {
        dispatch(signOut());
      }
    }
    sessionExpTime && activateSessionCheck(sessionExpTime);
  }, [dispatch, sessionExpTime]);

  return (
    <>
      <Routes />
    </>
  );
}
