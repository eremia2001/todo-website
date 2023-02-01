import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import ThemeContext from "../context/ThemeContext";
import userAuthContext from "../context/AuthContext";
import { async } from "@firebase/util";
import TodoMascot from "../assets/TodoMascot.png";

const Header = () => {
  const { user, logOut } = useContext(userAuthContext);
  const { darkTheme, handleClick } = useContext(ThemeContext);

  console.log(user);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`flex items-center justify-between p-4 max-w-[1240px] mx-auto select-none ${
        darkTheme && "bg-"
      }`}
    >
      <img src={TodoMascot} className=" w-[100px] " />

      {darkTheme ? (
        <BsSunFill onClick={handleClick} className="text-xl cursor-pointer" />
      ) : (
        <BsMoonStarsFill className="cursor-pointer" onClick={handleClick} />
      )}

      {user ? (
        <button
          className="bg-blue-700 py-2 px-4 text-white rounded-md"
          onClick={handleSignOut}
        >
          Logout
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
