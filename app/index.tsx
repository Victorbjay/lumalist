import React, { useMemo, useState, useCallback } from "react";
import { SafeAreaView, View, LayoutAnimation, Pressable, Text } from "react-native";
import styled from "styled-components/native";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import EmptyState from "./components/EmptyState";
import TodoItem from "./components/TodoItem";
import { Link, useRouter } from "expo-router";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useThemePersist } from "./hooks/useThemePersist";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const Screen = styled(SafeAreaView)`flex:1; background:${({theme})=>theme.colors.bg};`;
const Container = styled.View`margin-top:-80px; padding:0 16px 16px; gap:12px;`;
const Row = styled.View`flex-direction:row; align-items:center; gap:12px;`;
const Title = styled.Text`color:${({theme})=>theme.colors.bg}; font-size:36px; font-weight:800; letter-spacing:-0.25px; margin: 0 16px;`;

const AddBtn = styled(Link)`
  border:1px solid ${({theme})=>theme.colors.border};
  background:${({theme})=>theme.colors.primary};
  padding:12px 16px; border-radius:12px;
`;
const AddText = styled.Text`color:white; font-weight:800;`;

export default function Home() {
  const { mode, toggle } = useThemePersist();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"all"|"active"|"completed">("all");

  const list = useQuery(api.todos.list, { filter: q || undefined, tab }) ?? [];
  const toggleTodo = useMutation(api.todos.toggle);
  const remove = useMutation(api.todos.remove);
  const reorder = useMutation(api.todos.reorder);

  const data = useMemo(()=> list, [list]);

  const renderItem = useCallback(({ item }: RenderItemParams<any>) => (
    <View style={{ marginBottom:12 }}>
      <TodoItem
        title={item.title}
        description={item.description}
        completed={item.completed}
        due={item.dueDate ? new Date(item.dueDate).toDateString() : undefined}
        onToggle={async()=>{ LayoutAnimation.easeInEaseOut(); await toggleTodo({ id: item._id }); }}
        onEdit={()=> router.push(`/edit/${item._id}`)}
        onDelete={async()=>{ LayoutAnimation.easeInEaseOut(); await remove({ id: item._id }); }}
      />
    </View>
  ), []);

  return (
    <Screen>
      <Header mode={mode} />
      <Title>TODO</Title>
      <Container>
        <Row>
          <SearchBar value={q} onChange={setQ} />
          <ThemeToggle mode={mode} onToggle={toggle} />
          <AddBtn href="/add"><AddText>+ Add</AddText></AddBtn>
        </Row>

        <View style={{ marginTop:12 }}>
          <Row>
            {(["all","active","completed"] as const).map(t => (
              <Pressable key={t} onPress={()=>{ LayoutAnimation.easeInEaseOut(); setTab(t); }}>
                <Text style={{ color: tab===t? "#5596FF" : "#6B6F80", fontWeight: "700", marginRight:12 }}>{t[0].toUpperCase()+t.slice(1)}</Text>
              </Pressable>
            ))}
          </Row>
        </View>

        {data.length === 0 ? (
          <EmptyState text={q ? "No results" : "No todos yet. Add one!"}/>
        ) : (
          <DraggableFlatList
            data={data}
            keyExtractor={(item)=> item._id}
            onDragEnd={({ data }) => reorder({ idsInOrder: data.map((d:any)=>d._id) })}
            renderItem={renderItem}
          />
        )}
      </Container>
    </Screen>
  );
}
