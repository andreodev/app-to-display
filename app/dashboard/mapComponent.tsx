import * as React from "react";
import Svg, { G, Path, Text } from "react-native-svg";
import { estado } from "./brasil";
import { useRouter } from "expo-router";

function SvgComponent(props: any) {
  const router = useRouter();

const handlePress = (estadoId: string) => {
  router.push({
    pathname: "/dashboard/[id]",
    params: { id: estadoId },
  });
}

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="450px"
      height="460px"
      viewBox="0 0 450 440"
      xmlSpace="preserve"
      {...props}
    >
      {estado.map((estado) => (
        <G key={estado.id} className="estado">
          {Array.isArray(estado.d) ? (
            estado.d.map((pathD, idx) => (
              <Path
                key={idx}
                d={pathD}
                stroke="#FFF"
                strokeWidth={2.1404}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#3498db"
                onPress={() => handlePress(estado.name)}
              />
            ))
          ) : (
            <Path
              d={estado.d}
              stroke="#FFF"
              strokeWidth={1.0404}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#3498db"
              onPress={() => handlePress(estado.name)}
            />
          )}

          <Text
            transform={`translate(${estado.position.x} ${estado.position.y})`}
            fill="#FFF"
          >
            {estado.id}
          </Text>
        </G>
      ))}
    </Svg>
  );
}

export default SvgComponent;
