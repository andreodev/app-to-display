import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import Svg from "react-native-svg";
import SvgComponent from "./mapComponent";

export default function Map() {
  const scale = useRef(new Animated.Value(1)).current;
  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const lastScale = useRef(1);
  const lastOffset = useRef({ x: 0, y: 0 });
  const lastDistance = useRef<number | null>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        translate.setOffset(lastOffset.current);
        translate.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (gestureState.numberActiveTouches === 2) {
          const touches = e.nativeEvent.touches;
          const dx = touches[0].pageX - touches[1].pageX;
          const dy = touches[0].pageY - touches[1].pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (lastDistance.current === null) {
            lastDistance.current = distance;
          } else {
            const scaleChange = distance / lastDistance.current;
            let newScale = lastScale.current * scaleChange;
            newScale = Math.max(1, Math.min(5, newScale)); // limitar o zoom entre 1x e 5x
            scale.setValue(newScale);
          }
        } else if (gestureState.numberActiveTouches === 1) {
          Animated.event(
            [
              null,
              {
                dx: translate.x,
                dy: translate.y,
              },
            ],
            { useNativeDriver: false }
          )(e, gestureState);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.numberActiveTouches < 2) {
          lastOffset.current.x += gestureState.dx;
          lastOffset.current.y += gestureState.dy;
          translate.flattenOffset();
        }

        const listenerId = scale.addListener(({ value }) => {
          lastScale.current = value;
          scale.removeListener(listenerId); // limpa o listener após uso
        });
        lastDistance.current = null;
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.svgContainer,
          {
            transform: [
              { scale: scale },
              { translateX: translate.x },
              { translateY: translate.y },
            ],
          },
        ]}
      >
        <Svg width={900} height={420} viewBox="0 0 500 500">
          <SvgComponent />
        </Svg>
      </Animated.View>

      <Text style={styles.text}>Buscar Representante</Text>
      <Text style={styles.subtext}>
        Clique no estado para localizar o representante
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  svgContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 16,
  },
});
