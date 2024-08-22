/** Try it out at https://ant.design/theme-editor */

// Used only for the antd theme setup

const headerHeight = 40;
const footerHeight = 40;

// Used for our components
export const theme = {
  colors: {
    primary: "#6873e7",
    info: "#D1B75C",
    success: "#52c41a",
    warning: "#faad14",
    error: "#ff4d4f",
    text: "#fdfeff",
    bg: "#201c24",
  },
  layout: {
    layoutMaxWidth: "1400px",
    layoutPadding: "20px",
    headerHeight: `${headerHeight}px`,
    footerHeight: `${footerHeight}px`,
    siderWidth: "200px",
    mainHeight: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`,
  },
  others: {
    borderRadius: "6px",
    boxShadow:
      "0 1px 2px 0 rgba(32, 28, 36 0.03), 0 1px 6px -1px rgba(32, 28, 36 0.02), 0 2px 4px 0 rgba(32, 28, 36 0.02)",
    boxShadowSecondary:
      "0 6px 16px 0 rgba(32, 28, 36 0.08),0 3px 6px -4px rgba(32, 28, 36 0.12),0 9px 28px 8px rgba(32, 28, 36 0.05)",
  },
};

export const antdTheme = {
  colorPrimary: theme.colors.primary,
  colorInfo: theme.colors.info,
  colorSuccess: theme.colors.success,
  colorWarning: theme.colors.warning,
  colorError: theme.colors.error,
  colorTextBase: theme.colors.text,
  colorBgBase: theme.colors.bg,
  baseBorderRadius: theme.others.borderRadius,
  boxShadow: theme.others.boxShadow,
  boxShadowSecondary: theme.others.boxShadowSecondary,
};
