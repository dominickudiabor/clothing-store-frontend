import React from "react";

export const themes = {
  blue: {
    color: "Blue",
    code: "#12cad6",
  },
  green: {
    color: "Green",
    code: "#06b6a7",
  },
  red: {
    color: "Red",
    code: "#e24141",
  },
  purple: {
    color: "Purple",
    code: "#aa069ce0",
  },
};

const ThemeContext = React.createContext({
  theme: themes.blue,
  switchTheme: (code: string) => {},
});

export default ThemeContext;
