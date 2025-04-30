import React, { useRef, useState } from "react";
import {
  View,
  Text as RNText,
} from "react-native";
import Svg, { G, Path, Image as SvgImage, Text as SvgText } from "react-native-svg";
import SvgComponent from "./mapComponent";


export default function Map() {

  return(
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Svg width="100%" height="100%" viewBox="0 0 500 500" fill="#FF0000">
      <SvgComponent />
</Svg>
    </View>
  )
}