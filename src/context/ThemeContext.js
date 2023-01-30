import { createContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  function handleClick() {
    setDarkTheme(!darkTheme);
  }

  return (
    <ThemeContext.Provider value={{ darkTheme, handleClick }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
