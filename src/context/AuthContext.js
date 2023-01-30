import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebase";

const userContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const createUser = (email, passwort) => {
    return createUserWithEmailAndPassword(auth, email, passwort);
  };

  const signInUser = (email, passwort) => {
    const resultUser = signInWithEmailAndPassword(auth, email, passwort);
    if (resultUser) {
      setUser({ email, passwort });
    }
    return resultUser;
  };

  const googleSignIn = () => {
    const provier = new GoogleAuthProvider();
    signInWithRedirect(auth, provier);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userContext.Provider
      value={{ createUser, googleSignIn, user, logOut, signInUser }}
    >
      {children}
    </userContext.Provider>
  );
}

export default userContext;
