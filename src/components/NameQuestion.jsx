import { async } from "@firebase/util";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import userInfoContext from "../context/UserInfoContext";
import { uid } from "uid";

const NameQuestion = () => {
  const [userName, setUserName] = useState("");
  const { userInfo, setUserInfo } = useContext(userInfoContext);
  const navigate = useNavigate();

  // Name Bestätigen
  const confirmName = async () => {
    const newId = auth.currentUser.uid;
    try {
      // speichere Name in Datenbank
      const docId = await setDoc(doc(db, "Nutzerdaten", newId), {
        name: userName,
        documentID: newId,
      });

      navigate("/account");
      // speichere lokal
      //setUserInfo({ ...userInfo, name: userName, docId: randomNumber });
    } catch (e) {
      console.log("Error : ", e);
    }
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
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
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
