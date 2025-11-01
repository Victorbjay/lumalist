import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { SafeAreaView, TextInput, Pressable, Text } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";

const Screen = styled(SafeAreaView)`flex:1; padding:16px; background:${({theme})=>theme.colors.bg}; gap:12px;`;
const Field = styled(TextInput)`border:1px solid ${({theme})=>theme.colors.border}; color:${({theme})=>theme.colors.text}; padding:12px; border-radius:12px;`;
const Button = styled(Pressable)`background:${({theme})=>theme.colors.primary}; padding:14px; border-radius:12px;`;
const BtnText = styled(Text)`color:white; font-weight:700; text-align:center;`;

export default function Add() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [due, setDue] = useState<string>("");
  const add = useMutation(api.todos.add);
  const router = useRouter();

  return (
    <Screen>
      <Field placeholder="Title" placeholderTextColor="#9CA3AF" value={title} onChangeText={setTitle} />
      <Field placeholder="Description" placeholderTextColor="#9CA3AF" value={desc} onChangeText={setDesc} />
      <Field placeholder="Due date (YYYY-MM-DD)" placeholderTextColor="#9CA3AF" value={due} onChangeText={setDue} />

      <Button onPress={async()=>{
        const dueMs = due ? Date.parse(due) : undefined;
        await add({ title, description: desc || undefined, dueDate: dueMs });
        router.back();
      }}>
        <BtnText>Save</BtnText>
      </Button>
    </Screen>
  );
}
