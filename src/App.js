import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Account from "./components/Account";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthContextProvider } from "./context/AuthContext";
import ThemeContext from "./context/ThemeContext";
import { useContext } from "react";
import Header from "./components/Header";
import Protected from "./components/Protected";
import NameQuestion from "./components/NameQuestion";
import { UserInfoContextProvider } from "./context/UserInfoContext";

function App() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div className="text-[#EDEDED] ">
      <AuthContextProvider>
        <Header />

        <UserInfoContextProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/account"
              element={
                <Protected>
                  <Account />
                </Protected>
              }
            />
            <Route path="/nameQuestion" element={<NameQuestion />} />
          </Routes>
        </UserInfoContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
