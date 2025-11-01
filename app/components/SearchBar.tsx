import React from "react";
import styled from "styled-components/native";
import { TextInput } from "react-native";
const Wrap = styled.View`
  border: 1px solid ${({theme})=>theme.colors.border};
  background: ${({theme})=>theme.colors.card};
  border-radius: 14px; padding: 12px 16px; flex:1;
`;
export default function SearchBar({value,onChange}:{value:string;onChange:(s:string)=>void}) {
  return <Wrap><TextInput placeholder="Create a new todo..." placeholderTextColor="#9CA3AF" value={value} onChangeText={onChange} style={{color:"#4B5563"}} /></Wrap>;
}
