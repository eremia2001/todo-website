import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAuthContext from "../context/AuthContext";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

const SignIn = () => {
  const { signInUser, user, setUser, googleSignIn } =
    useContext(userAuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  // LogIn mit Passwort und Email
  const handleSignIn = async () => {
    try {
      await signInUser(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  // Log In mit Google
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  // Beim Login  wird weiter navigiert
  console.log("HALLOI", user);
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
      <h1 className=" font-bold text-3xl mt-10 text-center">Log in ! </h1>

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
        onClick={handleSignIn}
        className="border w-full font-bold rounded-2xl border-none mt-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 "
      >
        Sign in
      </button>
      <p className="text-center text-gray-400 mt-5">
        Dont have an account yet ?{" "}
        <Link to="/signup" className=" text-gray-200">
          {" "}
          Sign up !
        </Link>
      </p>

      <p className="text-center mt-2">
        <Link to="/signup" className=" text-gray-200 ">
          Forgot Password ?
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
