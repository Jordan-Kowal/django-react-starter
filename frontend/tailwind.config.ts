import { theme } from "./src/styles";

module.exports = {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      primary: theme.colors.primary,
      info: theme.colors.info,
      success: theme.colors.success,
      warning: theme.colors.warning,
      error: theme.colors.error,
      text: theme.colors.text,
      bg: theme.colors.bg,
    },
    extend: {
      spacing: {
        default: theme.layout.layoutPadding,
        header: theme.layout.headerHeight,
        footer: theme.layout.footerHeight,
        sider: theme.layout.siderWidth,
      },
      borderRadius: {
        default: theme.others.borderRadius,
      },
      boxShadow: {
        default: theme.others.boxShadow,
        secondary: theme.others.boxShadowSecondary,
      },
      height: {
        header: theme.layout.headerHeight,
      },
    },
  },
  plugins: [],
};
