import React from "react";
import styled from "styled-components/native";
import { Pressable } from "react-native";

const Card = styled.View`
  background:${({theme})=>theme.colors.card};
  border:1px solid ${({theme})=>theme.colors.border};
  border-radius:14px; padding:14px; gap:6px;
`;
const Row = styled.View`flex-direction:row; justify-content:space-between; align-items:center;`;
const Title = styled.Text<{done?:boolean}>`
  color:${({theme})=>theme.colors.text}; font-size:16px; font-weight:700;
  text-decoration:${({done})=>done?"line-through":"none"};
  opacity:${({done})=>done?0.6:1};
`;
const Muted = styled.Text`color:${({theme})=>theme.colors.subtext}; font-size:12px;`;
const Actions = styled.View`flex-direction:row; gap:10px;`;
const Btn = styled(Pressable)`padding:8px 12px; border-radius:10px; border:1px solid ${({theme})=>theme.colors.border};`;

export default function TodoItem(p:{
  title:string; description?:string; due?:string; completed:boolean;
  onToggle():void; onEdit():void; onDelete():void;
}) {
  return (
    <Card>
      <Row>
        <Title done={p.completed}>{p.title}</Title>
        <Actions>
          <Btn onPress={p.onToggle}><Muted>{p.completed?"Undo":"Done"}</Muted></Btn>
          <Btn onPress={p.onEdit}><Muted>Edit</Muted></Btn>
          <Btn onPress={p.onDelete}><Muted>✕</Muted></Btn>
        </Actions>
      </Row>
      {p.description ? <Muted>{p.description}</Muted> : null}
      {p.due ? <Muted>Due: {p.due}</Muted> : null}
    </Card>
  );
}
