import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import userContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import TodoMascot from "../assets/TodoMascot.png";

const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const { createUser, googleSignIn, user } = useContext(userContext);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async () => {
    try {
      await createUser(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/account");
    }
  }, [user]);

  return (
    <div
      className={`px-5 max-w-[700px] mx-auto flex flex-col justify-center select-none
      } `}
    >
      <h1 className=" font-bold text-3xl mt-10 text-center">Sign up. </h1>

      <div className="mt-20 flex flex-col ">
        <div className="gap-5 pb-10 flex flex-col  ">
          <div
            className="flex items-center justify-center border  rounded-2xl gap-5 text-[17px] py-3 px-4 cursor-pointer"
            onClick={handleGoogleSignIn}
          >
            <AiOutlineGoogle className="text-[25px]" />{" "}
            <p>Continue with Google</p>
          </div>
          <div
            className="flex items-center justify-center border  rounded-2xl gap-5 text-[17px] py-3 px-4 cursor-pointer"
            onClick={handleGoogleSignIn}
          >
            <BsFacebook className="text-[25px]" /> <p>Continue with Facebook</p>
          </div>
        </div>

        <p className="text-center font-medium text-xl">or</p>

        <div className="flex flex-col gap-5 pt-10">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="border  py-3 px-4 bg-transparent rounded-2xl"
            placeholder="Email"
          />

          <input
            type="passwort"
            className="border  py-3 px-4 bg-transparent rounded-2xl"
            placeholder="Passwort"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={signUp}
        className="border w-full font-bold rounded-2xl border-none mt-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 "
      >
        Sign up!
      </button>
      <p className="text-center text-gray-400 mt-5">
        Already have an account ?{" "}
        <Link to="/" className=" text-gray-200">
          {" "}
          Sign In.
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
