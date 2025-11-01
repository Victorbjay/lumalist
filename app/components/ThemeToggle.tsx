import React from "react";
import { Pressable, Text } from "react-native";
import styled from "styled-components/native";
import * as Haptics from "expo-haptics";

const Btn = styled(Pressable)`
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
`;
const Label = styled(Text)`color: ${({ theme }) => theme.colors.text}; fontWeight: 600;`;

export default function ThemeToggle({ mode, onToggle }: { mode:"light"|"dark"; onToggle():void }) {
  return (
    <Btn accessibilityRole="button" accessibilityLabel="Toggle theme"
      onPress={async()=>{ await Haptics.selectionAsync(); onToggle(); }}>
      <Label>{mode === "dark" ? "☀️ Light" : "🌙 Dark"}</Label>
    </Btn>
  );
}
