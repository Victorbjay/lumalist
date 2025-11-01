import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "~/lib/theme";

const KEY = "lumalist-theme";

export function useThemePersist() {
  const [mode, setMode] = useState<"light"|"dark">("light");
  const [ready, setReady] = useState(false);

  useEffect(() => { (async () => {
    const saved = await AsyncStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") setMode(saved);
    setReady(true);
  })(); }, []);

  const theme = mode === "dark" ? darkTheme : lightTheme;
  const toggle = async () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next); await AsyncStorage.setItem(KEY, next);
  };

  return { mode, theme, toggle, ready };
}
