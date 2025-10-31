import { DefaultTheme } from "styled-components";
import styled from "styled-components/native";

const Wrap = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.card};
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border};
  border-radius: 12px;
  padding: 12px;
  margin: 12px 0;
`;
const Input = styled.TextInput.attrs(({ theme }: { theme: DefaultTheme }) => ({
  placeholderTextColor: theme.subtext,
}))`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
  font-size: 16px;
`;

export default function SearchBar({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (t: string) => void;
}) {
  return (
    <Wrap accessibilityRole='search'>
      <Input
        placeholder='Search todos...'
        value={value}
        onChangeText={onChangeText}
      />
    </Wrap>
  );
}
