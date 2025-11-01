import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import React, { useEffect } from "react";
import { StatusBar, UIManager, Platform, View } from "react-native";
import { WithConvex } from "~/lib/convexClient";
import { useThemePersist } from "./hooks/useThemePersist";

export default function Layout() {
  const { theme, mode, ready } = useThemePersist();
  useEffect(()=>{ if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) { UIManager.setLayoutAnimationEnabledExperimental(true); }},[]);
  if (!ready) return <View style={{ flex:1, backgroundColor:"#000" }} />;

  return (
    <WithConvex>
      <ThemeProvider theme={theme}>
        <StatusBar style={mode==="dark" ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </WithConvex>
  );
}
