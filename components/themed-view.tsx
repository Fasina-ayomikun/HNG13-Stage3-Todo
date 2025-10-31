import { View, type ViewProps } from "react-native";
import { useColorTheme } from "../hooks/use-color-theme";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useColorTheme(
    { light: lightColor, dark: darkColor },
    "bg"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
