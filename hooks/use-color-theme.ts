import { darkTheme, lightTheme } from "../constants/theme";
import { useColorScheme } from "./use-color-scheme";

export function useColorTheme(
  props: { light?: string; dark?: string } = {},
  colorName: keyof typeof lightTheme & keyof typeof darkTheme
): string {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props?.[theme];

  if (colorFromProps) return colorFromProps;
  return theme === "dark"
    ? (darkTheme[colorName] ?? "#000")
    : (lightTheme[colorName] ?? "#fff");
}
