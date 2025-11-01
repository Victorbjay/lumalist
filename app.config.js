import 'dotenv/config';
export default {
  expo: {
    name: 'LumaList',
    slug: 'lumalist',
    scheme: 'lumalist',
    plugins: ['expo-router'],
    experiments: { typedRoutes: true },
    extra: { convexUrl: process.env.EXPO_PUBLIC_CONVEX_URL },
  },
};
