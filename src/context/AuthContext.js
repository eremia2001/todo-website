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
import { set, ref } from "firebase/database";
import { auth } from "../firebase";

const userAuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  const createUser = (email, passwort) => {
    return createUserWithEmailAndPassword(auth, email, passwort);
  };

  const signInUser = (email, passwort) => {
    signInWithEmailAndPassword(auth, email, passwort)
      .then((userCredentials) => {
        console.log("Erfolgreich angemeldet");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
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
    <userAuthContext.Provider
      value={{ createUser, googleSignIn, user, logOut, signInUser, setUser }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export default userAuthContext;
