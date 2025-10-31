import React from "react";
import { DefaultTheme } from "styled-components";
import styled from "styled-components/native";
import CheckIcon from "./CheckIcon";

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 15px;
  padding: 18px 17px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.card};
`;

const Radio = styled.TouchableOpacity<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: ${({ checked }: { checked: boolean }) => (checked ? 0 : 1)};
  border-color: ${({ theme }: { theme: DefaultTheme }) => theme.border};
  background-color: ${({
    theme,
    checked,
  }: {
    theme: DefaultTheme;
    checked: boolean;
  }) => (checked ? theme.primary : "transparent")};
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text<{ done: boolean }>`
  flex: 1;
  font-size: 15px;
  color: ${({ theme, done }: { theme: DefaultTheme; done: boolean }) =>
    done ? theme.subtext : theme.text};
  text-decoration-line: ${({ done }: { done: boolean }) =>
    done ? "line-through" : "none"};
  text-decoration-thickness: 1px;
  text-decoration-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.subtext};
  opacity: ${({ done }: { done: boolean }) => (done ? 0.7 : 1)};
`;

const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.border};
`;

export default function TodoItem({
  todo,
  onToggle,
  showDivider,
}: {
  todo: { _id: string; title: string; completed: boolean };
  onToggle: () => void;
  showDivider?: boolean;
}) {
  return (
    <>
      <Row>
        <Radio
          checked={todo.completed}
          onPress={onToggle}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole='checkbox'
          accessibilityState={{ checked: todo.completed }}
        >
          {todo.completed && <CheckIcon />}
        </Radio>

        <Title done={todo.completed}>{todo.title}</Title>
      </Row>
      {showDivider ? <Divider /> : null}
    </>
  );
}
