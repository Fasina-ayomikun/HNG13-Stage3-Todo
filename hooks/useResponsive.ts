import { useWindowDimensions } from "react-native";

export function useResponsive() {
  const { width } = useWindowDimensions();
  const isPhone = width < 420;
  const isSmallPhone = width < 360;

  return {
    isPhone,
    isSmallPhone,
    heroH: isSmallPhone ? 160 : isPhone ? 190 : 220,
    titleSize: isSmallPhone ? 22 : isPhone ? 26 : 32,
    containerPad: isSmallPhone ? 16 : isPhone ? 20 : 35,
    gap: isSmallPhone ? 10 : isPhone ? 14 : 20,
    cardRadius: isPhone ? 10 : 12,
    rowPadV: isSmallPhone ? 10 : isPhone ? 12 : 14,
    rowPadH: isSmallPhone ? 12 : isPhone ? 14 : 17,
    radioSize: isSmallPhone ? 16 : isPhone ? 18 : 24,
    fontSm: isSmallPhone ? 12 : 12,
    fontMd: isSmallPhone ? 14 : 15,
  };
}
