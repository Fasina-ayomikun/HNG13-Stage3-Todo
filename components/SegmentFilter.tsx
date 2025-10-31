import React from "react";
import type { DefaultTheme } from "styled-components";
import styled from "styled-components/native";

const Wrap = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.card};
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border};
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
`;

const Segment = styled.TouchableOpacity<{ active: boolean }>`
  padding: 10px 16px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text<{ active: boolean }>`
  color: ${({ theme, active }: { theme: DefaultTheme; active?: boolean }) =>
    active ? theme.accent : theme.subtext};
  font-size: 12px;
  font-weight: 600;
`;

type Props = {
  value: "all" | "active" | "completed";
  onChange: (v: Props["value"]) => void;
  style?: any;
};

export default function SegmentedFilter({ value, onChange, style }: Props) {
  return (
    <Wrap style={style}>
      {(["all", "active", "completed"] as const).map((v) => (
        <Segment key={v} active={value === v} onPress={() => onChange(v)}>
          <Label active={value === v}>
            {v === "all" ? "All" : v[0].toUpperCase() + v.slice(1)}
          </Label>
        </Segment>
      ))}
    </Wrap>
  );
}
