import { async } from "@firebase/util";
import React, { useContext } from "react";
import userContext from "../context/AuthContext";

const Account = () => {
  const { user, logOut } = useContext(userContext);
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-auto max-w-[600px] my-16 p-4">
      <h1 className="font-bold text-2xl py-4">Account</h1>
      <p>User Email : {user.displayName} </p>

      <button onClick={handleLogOut} className="border px-6 py-2 my-4">
        Logout
      </button>
    </div>
  );
};

export default Account;
