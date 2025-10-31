import React, { useState } from "react";
import type { DefaultTheme } from "styled-components";
import styled from "styled-components/native";

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 14px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.card};
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border};
  border-radius: 5px;
  height: 64px;
  padding: 0 17px;
`;

const Radio = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  border-width: 1px;
  border-color: ${({ theme }: { theme: DefaultTheme }) => theme.border};
  background-color: transparent;
  opacity: 0.6;
`;

const Input = styled.TextInput.attrs(({ theme }: { theme: DefaultTheme }) => ({
  placeholderTextColor: theme.subtext,
  underlineColorAndroid: "transparent",
}))`
  flex: 1;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
  font-size: 15px;
  border-width: 0;
  outline-width: 0;
  padding: 16px 0;
`;

export default function TodoComposer({
  onAdd,
}: {
  onAdd: (d: { title: string }) => void;
}) {
  const [title, setTitle] = useState("");

  return (
    <Row>
      <Radio pointerEvents='none' />
      <Input
        value={title}
        onChangeText={setTitle}
        placeholder='Create a new todo...'
        returnKeyType='done'
        onSubmitEditing={() => {
          const t = title.trim();
          if (t) {
            onAdd({ title: t });
            setTitle("");
          }
        }}
      />
    </Row>
  );
}
