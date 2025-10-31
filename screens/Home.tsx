// screens/Home.tsx
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { DefaultTheme, useTheme } from "styled-components/native";

import { useMutation, useQuery } from "convex/dist/cjs/react/index.js";
import SegmentedFilter from "../components/SegmentFilter";
import ThemeToggleIcon from "../components/ThemeToggleIcon";
import TodoComposer from "../components/TodoComposer";
import TodoItem from "../components/TodoItem";
import { api } from "../convex/_generated/api";
import { useResponsive } from "../hooks/useResponsive";
import { useThemeMode } from "../providers/ThemeProvider";

const Screen = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg};
`;

const Hero = styled.View`
  height: 300px;
  overflow: hidden;
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  margin-bottom: 25px;
`;

const Container = styled.View`
  padding: 35px;
  padding-top: 12px;
  align-items: center;
  max-width: 680px;
  width: 100%;
  z-index: 30;
  margin: auto;
  margin-top: -190px;
`;

const Title = styled.Text`
  color: white;
  font-size: 32px;
  font-weight: 400;
  letter-spacing: 6px;
  font-family: "JosefinSans_700Bold";
  text-align: left;
`;

const Sheet = styled.View`
  width: 100%;
`;

const Card = styled.View.attrs(({ theme }: { theme: DefaultTheme }) => ({
  shadowColor:
    theme.mode === "dark"
      ? "rgba(124, 58, 237, 0.25)"
      : "rgba(149, 157, 165, 0.15)",
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 1,
  shadowRadius: theme.mode === "dark" ? 20 : 15,
  elevation: theme.mode === "dark" ? 6 : 5,
}))`
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.card};
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border};
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
`;

const CardInner = styled.View``;

const FooterBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 18px 17px;
  border-top-width: 1px;
  border-top-color: ${({ theme }: { theme: DefaultTheme }) => theme.border};
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.card};
`;

const Chips = styled.View`
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const Chip = styled.TouchableOpacity<{ active?: boolean }>``;

const ChipText = styled.Text<{ active?: boolean }>`
  color: ${({ theme, active }: { theme: DefaultTheme; active?: boolean }) =>
    active ? theme.accent : theme.subtext};
  font-size: 12px;
  font-weight: 600;
`;

const Muted = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.subtext};
  font-size: 12px;
  text-align: center;
  margin-top: 12px;
`;

export default function Home() {
  const theme = useTheme();
  const { toggle } = useThemeMode();
  const R = useResponsive();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { width } = useWindowDimensions();

  const todos = useQuery(api.todos.list);
  const create = useMutation(api.todos.create);
  const update = useMutation(api.todos.update);
  const remove = useMutation(api.todos.remove);
  const reorder = useMutation(api.todos.reorder);

  const visibleTodos = useMemo(() => {
    if (!todos) return undefined;
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);
  const [stale, setStale] = React.useState(false);
  React.useEffect(() => {
    const id = setTimeout(() => setStale(true), 6000);
    return () => clearTimeout(id);
  }, []);

  const clearCompleted = async () => {
    try {
      const completed = (todos ?? []).filter((t) => t.completed);
      await Promise.all(completed.map((t) => remove({ id: t._id })));
    } catch (e: any) {
      Alert.alert("Clear failed", e?.message ?? "Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Screen>
        <Hero>
          <ImageBackground
            source={
              theme.mode === "dark"
                ? require("../assets/images/hero-dark.png")
                : require("../assets/images/hero-light.png")
            }
            style={{ width: "100%", height: "100%" }}
            resizeMode='cover'
          />
        </Hero>

        <Container>
          <TitleRow>
            <Title>TODO</Title>
            <ThemeToggleIcon mode={theme.mode} onPress={toggle} />
          </TitleRow>

          <Sheet>
            <View
              style={{
                alignSelf: "center",
                width: "100%",
                maxWidth: 680,
                gap: 20,
              }}
            >
              <TodoComposer
                onAdd={async ({ title }) => {
                  try {
                    await create({ title });
                  } catch (e: any) {
                    Alert.alert(
                      "Create failed",
                      e?.message ?? "Please try again."
                    );
                  }
                }}
              />

              <Card>
                <CardInner>
                  {!visibleTodos ? (
                    <View style={{ padding: 24, alignItems: "center" }}>
                      <ActivityIndicator />
                      {stale && (
                        <Muted>
                          Still loading… Check EXPO_PUBLIC_CONVEX_URL, internet,
                          and that Convex is deployed.
                        </Muted>
                      )}
                    </View>
                  ) : (visibleTodos?.length ?? 0) === 0 ? (
                    <View style={{ padding: 24, alignItems: "center" }}>
                      <Muted>No todos yet. Add your first task.</Muted>
                    </View>
                  ) : (
                    <DraggableFlatList
                      data={visibleTodos}
                      keyExtractor={(item) => item._id.toString()}
                      activationDistance={12}
                      autoscrollSpeed={250}
                      autoscrollThreshold={60}
                      dragItemOverflow
                      keyboardShouldPersistTaps='handled'
                      renderItem={({ item, drag, isActive, getIndex }) => {
                        const idx = getIndex?.() ?? 0;
                        return (
                          <View
                            style={{
                              transform: [{ scale: isActive ? 1.02 : 1 }],
                              opacity: isActive ? 0.95 : 1,
                            }}
                          >
                            <TouchableWithoutFeedback
                              delayLongPress={150}
                              onLongPress={drag}
                            >
                              <View>
                                <TodoItem
                                  todo={item}
                                  showDivider={
                                    idx < (visibleTodos?.length ?? 0) - 1
                                  }
                                  onToggle={async () => {
                                    try {
                                      await update({
                                        id: item._id,
                                        patch: { completed: !item.completed },
                                      });
                                    } catch (e: any) {
                                      Alert.alert(
                                        "Update failed",
                                        e?.message ?? "Please try again."
                                      );
                                    }
                                  }}
                                />
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                        );
                      }}
                      onDragEnd={async ({ data }) => {
                        try {
                          await reorder({ idsInOrder: data.map((t) => t._id) });
                        } catch (e: any) {
                          Alert.alert(
                            "Reorder failed",
                            e?.message ?? "Please try again."
                          );
                        }
                      }}
                      contentContainerStyle={{ paddingBottom: 8 }}
                    />
                  )}
                </CardInner>

                <FooterBar>
                  <ChipText>
                    {(todos ?? []).filter((t) => !t.completed).length} items
                    left
                  </ChipText>

                  {width >= 768 && (
                    <Chips>
                      {(["all", "active", "completed"] as const).map((f) => (
                        <Chip
                          key={f}
                          active={filter === f}
                          onPress={() => setFilter(f)}
                        >
                          <ChipText active={filter === f}>
                            {f === "all"
                              ? "All"
                              : f[0].toUpperCase() + f.slice(1)}
                          </ChipText>
                        </Chip>
                      ))}
                    </Chips>
                  )}

                  <TouchableOpacity onPress={clearCompleted}>
                    <ChipText>Clear Completed</ChipText>
                  </TouchableOpacity>
                </FooterBar>
              </Card>

              {width < 768 && (
                <SegmentedFilter
                  value={filter}
                  onChange={setFilter}
                  style={{ marginTop: R.gap }}
                />
              )}

              <Muted>Drag and drop to reorder list</Muted>
            </View>
          </Sheet>
        </Container>
      </Screen>
    </SafeAreaView>
  );
}
