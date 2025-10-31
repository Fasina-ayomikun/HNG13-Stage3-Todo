import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "../constants/theme";

type Mode = "light" | "dark";
type Ctx = { mode: Mode; toggle: () => void; setMode: (m: Mode) => void };

const ThemeCtx = createContext<Ctx | null>(null);

export const useThemeMode = () => useContext(ThemeCtx)!;

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("themeMode");
      if (saved === "dark" || saved === "light") setMode(saved);
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("themeMode", mode);
  }, [mode]);

  const value: Ctx = {
    mode,
    setMode,
    toggle: () => setMode((p) => (p === "light" ? "dark" : "light")),
  };

  return (
    <ThemeCtx.Provider value={value}>
      <SCThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        {children}
      </SCThemeProvider>
    </ThemeCtx.Provider>
  );
}
