import { createContext, useContext, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import userAuthContext from "../context/AuthContext";
import { db } from "../firebase";

const userInfoContext = createContext();

export const UserInfoContextProvider = ({ children }) => {
  const { user } = useContext(userAuthContext);
  const [userInfo, setUserInfo] = useState({
    name: user,
    docId: "",
    todos: {
      todoName: "",
      checked: false,
    },
  });

  console.log(userInfo.docId);
  return (
    <userInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userInfoContext.Provider>
  );
};

export default userInfoContext;
