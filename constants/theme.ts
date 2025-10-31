import type { DefaultTheme } from "styled-components/native";

export const lightTheme: DefaultTheme = {
  mode: "light",
  bg: "#F6F7FB",
  card: "#FFFFFF",
  border: "#E6E8EF",
  text: "#0B1020",
  subtext: "#6C7282",
  primary: "#7C3AED",
  primarySoft: "#F1E9FF",
  accent: "#5B9BFF",
  gray: "#D1D2DA",
};

export const darkTheme: DefaultTheme = {
  mode: "dark",
  bg: "#0B1020",
  card: "#25273D",
  border: "#393A4B",
  text: "#C8CBE7",
  subtext: "#5B5E7E",
  primary: "#8B5CF6",
  primarySoft: "#2A1B4A",
  accent: "#3A7CFD",
  gray: "#5B5E7E",
};
