import "react-native-get-random-values";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Constants from "expo-constants";

const url = Constants.expoConfig?.extra?.convexUrl || process.env.EXPO_PUBLIC_CONVEX_URL!;
export const convex = new ConvexReactClient(url);

export const WithConvex: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ConvexProvider client={convex}>{children}</ConvexProvider>
);
