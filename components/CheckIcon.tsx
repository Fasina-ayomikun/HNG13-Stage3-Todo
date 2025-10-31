import React from "react";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

export default function CheckIcon({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24'>
      {/* thin white circle with light stroke */}
      <Circle cx='12' cy='12' r='11.5' fill='white' stroke='#E3E4F1' />
      {/* gradient fill circle */}
      <Circle cx='12' cy='12' r='12' fill='url(#paint0_linear_0_595)' />
      {/* check mark */}
      <Path
        d='M8 12.3041L10.6959 15L16.6959 9'
        stroke='white'
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id='paint0_linear_0_595'
          x1={-12}
          y1={12}
          x2={12}
          y2={36}
          gradientUnits='userSpaceOnUse'
        >
          <Stop stopColor='#55DDFF' />
          <Stop offset={1} stopColor='#C058F3' />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
