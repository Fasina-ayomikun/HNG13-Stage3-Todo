import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    bg: string;
    card: string;
    text: string;
    subtext: string;
    primary: string;
    primarySoft?: string;
    accent?: string;
    gray?: string;
    border: string;
  }
}
