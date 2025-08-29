import React, { useEffect } from "react";
import { IconSquareRoundedX } from "@tabler/icons-react";

interface ColorProps {
  id: number;
  default: string;
  secondary: string;
}

export interface ThemeProps {
  id: number;
  title: string;
  addClass: string;
  colors: ColorProps[];
}

interface ThemePropsChild {
  showtheme: boolean;
  handleShowTheme: () => void;
}

export const themes = [
  {
    id: 1,
    title: "Light Layout",
    addClass: "light",
    colors: [
      { id: 1, default: "#7366ff", secondary: "#838383" },
      { id: 2, default: "#4831D4", secondary: "#ea2087" },
      { id: 3, default: "#d64dcf", secondary: "#8e24aa" },
      { id: 4, default: "#4c2fbf", secondary: "#2e9de4" },
      { id: 5, default: "#7c4dff", secondary: "#7b1fa2" },
      { id: 6, default: "#3949ab", secondary: "#4fc3f7" },
    ],
  },
  {
    id: 2,
    title: "Dark Layout",
    addClass: "dark-only",
    colors: [
      { id: 1, default: "#7366ff", secondary: "#838383" },
      { id: 2, default: "#4831D4", secondary: "#ea2087" },
      { id: 3, default: "#d64dcf", secondary: "#8e24aa" },
      { id: 4, default: "#4c2fbf", secondary: "#2e9de4" },
      { id: 5, default: "#7c4dff", secondary: "#7b1fa2" },
      { id: 6, default: "#3949ab", secondary: "#4fc3f7" },
    ],
  },
];

const ThemeOptions: React.FC<ThemePropsChild> = ({
  showtheme,
  handleShowTheme,
}) => {
  const handleSetTheme = (themeData: ThemeProps, colorsData: ColorProps) => {
    if (document.body.classList.contains("light")) {
      document.body.classList.remove("light");
    } else {
      document.body.classList.remove("dark-only");
    }
    document.body.classList.add(themeData.addClass);
    document.documentElement.style.setProperty(
      "--theme-default",
      colorsData.default
    );
    document.documentElement.style.setProperty(
      "--theme-secondary",
      colorsData.secondary
    );
    localStorage.setItem("themeMode", themeData.addClass);
    localStorage.setItem("colorMode", JSON.stringify(colorsData));
  };

  useEffect(() => {
    let thememode: string | null = localStorage.getItem("themeMode");
    let colorModeStr = localStorage.getItem("colorMode");
    let colorMode = colorModeStr ? JSON.parse(colorModeStr) : null;
    if (thememode) {
      document.body.classList.add(thememode);
    }
    if (colorMode) {
      document.documentElement.style.setProperty(
        "--theme-default",
        colorMode.default
      );
      document.documentElement.style.setProperty(
        "--theme-secondary",
        colorMode.secondary
      );
    }
  });

  return (
    <div className={`themeSettingDiv ${showtheme ? "showtheme" : ""}`}>
      <div className="themeSettingDivHead position-relative">
        <h2>Preview Settings</h2>
        <p>Try it Real Time</p>
        <div className="closeBtn themoptioncloseBtn" onClick={handleShowTheme}>
          <IconSquareRoundedX />
        </div>
      </div>
      <div className="themeSettingInnerDiv">
        {themes.map((theme) => {
          return (
            <div className="themeDiv" key={theme.id}>
              <h4>{theme.title}</h4>
              <div className="themeColorsDiv">
                {theme.colors.map((colors) => {
                  return (
                    <span
                      key={colors.id}
                      onClick={() => handleSetTheme(theme, colors)}
                      className="themeColors"
                      style={{ background: colors.default }}
                    ></span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ThemeOptions);
