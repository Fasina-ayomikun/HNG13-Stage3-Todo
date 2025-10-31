// app/_layout.tsx
import { JosefinSans_700Bold, useFonts } from "@expo-google-fonts/josefin-sans";
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { useTheme } from "styled-components/native";
import ConvexCtxProvider from "../providers/ConvexProvider";
import AppThemeProvider from "../providers/ThemeProvider";

function NavBridge() {
  const scTheme = useTheme(); // valid because AppThemeProvider wraps this
  return (
    <NavThemeProvider
      value={scTheme.mode === "dark" ? NavDarkTheme : NavDefaultTheme}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={scTheme.mode === "dark" ? "light" : "dark"} />
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ JosefinSans_700Bold });
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConvexCtxProvider>
        <AppThemeProvider>
          <NavBridge />
        </AppThemeProvider>
      </ConvexCtxProvider>
    </GestureHandlerRootView>
  );
}
