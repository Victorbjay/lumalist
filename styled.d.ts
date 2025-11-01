import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bg: string;
      text: string;
      subtext: string;
      card: string;
      border: string;
      primary: string;
      accent: string;
      muted: string;
    };
  }
}
