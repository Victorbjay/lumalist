import React from "react";
import { ImageBackground, useWindowDimensions, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Header({ mode }: { mode: "light"|"dark" }) {
  const { width } = useWindowDimensions();
  const mobile = width < 700;

  const src =
    mode === "light"
      ? (mobile ? require("~/assets/images/header-mobile-light.jpg") : require("~/assets/images/header-desktop-light.jpg"))
      : (mobile ? require("~/assets/images/header-mobile-dark.jpg") : require("~/assets/images/header-desktop-dark.jpg"));

  // 300px desktop header target; scale for mobile
  const height = mobile ? 200 : 300;

  return (
    <View>
      <ImageBackground source={src} style={{ width: "100%", height }}>
        <LinearGradient
          colors={["#5596FF", "#AC2DEB"]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
          style={{ flex: 1, opacity: 0.82 }}
        />
      </ImageBackground>
    </View>
  );
}
