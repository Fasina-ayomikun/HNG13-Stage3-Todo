import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ConvexCtxProvider from "../providers/ConvexProvider";
import ThemeProvider from "../providers/ThemeProvider";
import Home from "../screens/Home";

export default function Index() {
  return (
    <ConvexCtxProvider>
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style='auto' />
          <Home />
        </SafeAreaView>
      </ThemeProvider>
    </ConvexCtxProvider>
  );
}
