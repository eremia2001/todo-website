import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "../context/AuthContext";

const Protected = ({ children }) => {
  const { user } = useContext(userContext);

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Protected;
