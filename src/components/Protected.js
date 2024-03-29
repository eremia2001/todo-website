import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import userAuthContext from "../context/AuthContext";

const Protected = ({ children }) => {
  const { user } = useContext(userAuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Protected;
