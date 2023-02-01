import { async } from "@firebase/util";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import userInfoContext from "../context/UserInfoContext";
import userAuthContext from "../context/AuthContext";

// backend zu frontend funktioniert
// TODO: überlegen wie man die Collection und Todos speichert
// TODO: überlegen wie man diese dann aufruft

const Account = () => {
  const { userInfo, setUserInfo } = useContext(userInfoContext);
  const { logOut } = useContext(userAuthContext);
  const [collectionInput, setCollectionInput] = useState("");
  const userId = userInfo.docId;

  // Reading from Database
  // wird bei jeder Änderung ausgeführt
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "Nutzerdaten", auth.currentUser.uid),
      (doc) => {
        const name = doc.data().name;
        const docId = doc.data().documentID;
        const collection = doc.data().collection;
        return setUserInfo({
          ...userInfo,
          name: name,
          docId: docId,
          collections: { collection },
        });
      }
    );
    return unsub;
  }, []);
  console.log(userInfo);

  // Logout
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  // add Todo-Collecction
  const addCollection = async () => {
    // add to database
    try {
      // update the die Datenbank
      const test = await updateDoc(doc(db, "Nutzerdaten", userInfo.docId), {
        // array aktualisieren
        collections: arrayUnion(collectionInput),
      });
    } catch (e) {
      console.log("Error : ", e);
    }
  };

  //delete collection
  // hier müssen einzelne todos als maps bzw. als Objekte gespeichert werden um ids für jedes einzelne TODO zu kreieren
  const deleteCollection = async () => {
    // remove from databse
    try {
      const test = await updateDoc(doc(db, "Nutzerdaten", userInfo.id), {
        // array aktualisieren
        todo: arrayRemove(collectionInput),
      });
    } catch (e) {
      console.log("Error : ", e);
    }
  };

  return (
    <div className="mx-auto max-w-[600px] my-16 p-4">
      <h1 className="font-bold text-2xl py-4">Hallo {userInfo.name}</h1>
      <button onClick={handleLogOut} className="border px-6 py-2 my-4">
        Logout
      </button>

      <input
        type="text"
        className="border  py-3 px-4 bg-transparent rounded-2xl w-full"
        placeholder="Name"
        name="userName"
        value={collectionInput}
        onChange={(e) => setCollectionInput(e.target.value)}
      />
      <button
        onClick={addCollection}
        className="border w-full font-bold rounded-2xl border-none mt-5 lg:mt-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 "
      >
        add Collection
      </button>
      <button
        onClick={deleteCollection}
        className="border w-full font-bold rounded-2xl border-none mt-5 lg:mt-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 "
      >
        Delete Collection
      </button>
    </div>
  );
};

export default Account;
