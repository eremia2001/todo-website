import React from "react";
import { useNavigate } from "react-router-dom";

const NameQuestion = () => {
  const navigate = useNavigate();

  const confirmName = () => {
    navigate("/account");
  };

  return (
    <div
      className="p-4 mt-60 
     max-w-[700px] mx-auto"
    >
      <div className="flex flex-col gap-2">
        <p className="font-medium pl-2 text-xl">
          Wie willst du genannt werden ?{" "}
        </p>
        <input
          type="text"
          className="border  py-3 px-4 bg-transparent rounded-2xl w-full"
          placeholder="Name"
        />

        <button
          onClick={confirmName}
          className="border w-full font-bold rounded-2xl border-none mt-5 lg:mt-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 "
        >
          Weiter{" "}
        </button>
      </div>
    </div>
  );
};

export default NameQuestion;
