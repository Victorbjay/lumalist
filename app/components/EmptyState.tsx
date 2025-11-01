import React from "react";
import styled from "styled-components/native";
const Box = styled.View`padding:24px; align-items:center;`;
const Txt = styled.Text`color:${({theme})=>theme.colors.subtext};`;
export default function EmptyState({text="No todos yet"}:{text?:string}){ return <Box><Txt>{text}</Txt></Box>; }
