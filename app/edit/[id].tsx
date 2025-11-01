import React, { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SafeAreaView, TextInput, Pressable, Text } from "react-native";
import styled from "styled-components/native";

const Screen = styled(SafeAreaView)`flex:1; padding:16px; background:${({theme})=>theme.colors.bg}; gap:12px;`;
const Field = styled(TextInput)`border:1px solid ${({theme})=>theme.colors.border}; color:${({theme})=>theme.colors.text}; padding:12px; border-radius:12px;`;
const Button = styled(Pressable)`background:${({theme})=>theme.colors.primary}; padding:14px; border-radius:12px;`;
const BtnText = styled(Text)`color:white; font-weight:700; text-align:center;`;

export default function Edit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const list = useQuery(api.todos.list, {}) ?? [];
  const current = useMemo(()=> list.find(t => t._id === id), [list, id]);

  const [title, setTitle] = useState(current?.title ?? "");
  const [desc, setDesc] = useState(current?.description ?? "");
  const [due, setDue] = useState(current?.dueDate ? new Date(current.dueDate).toISOString().slice(0,10) : "");

  const update = useMutation(api.todos.update);
  const router = useRouter();

  if (!current) return null;

  return (
    <Screen>
      <Field value={title} onChangeText={setTitle} />
      <Field value={desc} onChangeText={setDesc} />
      <Field value={due} onChangeText={setDue} />

      <Button onPress={async()=>{
        await update({
          id: current._id,
          title,
          description: desc || undefined,
          dueDate: due ? Date.parse(due) : undefined
        });
        router.back();
      }}>
        <BtnText>Update</BtnText>
      </Button>
    </Screen>
  );
}
