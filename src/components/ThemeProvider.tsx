import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

// Extend MUI theme to include custom colors
declare module "@mui/material/styles" {
  interface Palette {
    sidebar: {
      background: string;
      text: string;
      textSecondary: string;
      hover: string;
      active: string;
      activeHover: string;
      divider: string;
    };
    table: {
      headerBackground: string;
      headerText: string;
      rowHover: string;
      rowAlternate: string;
    };
  }

  interface PaletteOptions {
    sidebar?: {
      background?: string;
      text?: string;
      textSecondary?: string;
      hover?: string;
      active?: string;
      activeHover?: string;
      divider?: string;
    };
    table?: {
      headerBackground?: string;
      headerText?: string;
      rowHover?: string;
      rowAlternate?: string;
    };
  }
}

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme; // user choice (light/dark/system)
  setTheme: (theme: Theme) => void;
  actualTheme: "dark" | "light"; // resolved theme
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  actualTheme: "light",
};

const ThemeContext = createContext<ThemeProviderState>(initialState);

const isValidTheme = (theme: string): theme is Theme =>
  ["dark", "light", "system"].includes(theme);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "talk to pro ui theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = localStorage.getItem(storageKey);
    return stored && isValidTheme(stored) ? stored : defaultTheme;
  });

  const [systemTheme, setSystemTheme] = useState<"dark" | "light">("light");
  const actualTheme = theme === "system" ? systemTheme : theme;

  // Watch system preference
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const resolve = () => setSystemTheme(mediaQuery.matches ? "dark" : "light");
    resolve();
    mediaQuery.addEventListener("change", resolve);
    return () => mediaQuery.removeEventListener("change", resolve);
  }, [theme]);

  // Create MUI theme object dynamically
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: actualTheme,
          ...(actualTheme === "light"
            ? {
                primary: {
                  main: "#DB2777",
                  light: "#F472B6",
                  dark: "#BE185D",
                  contrastText: "#FFFFFF",
                },
                secondary: {
                  main: "#7C3AED",
                  light: "#A78BFA",
                  dark: "#5B21B6",
                  contrastText: "#FFFFFF",
                },
                sidebar: {
                  background: "#1F1F1F",
                  text: "#F8FAFC",
                  textSecondary: "#CBD5E1",
                  hover: "rgba(248, 250, 252, 0.08)",
                  active: "#DB2777",
                  activeHover: "#BE185D",
                  divider: "rgba(148, 163, 184, 0.2)",
                },
                table: {
                  headerBackground: "#1F1F1F",
                  headerText: "#F8FAFC",
                  rowHover: "rgba(219, 39, 119, 0.04)",
                  rowAlternate: "#FDF2F8",
                },
              }
            : {
                primary: {
                  main: "#1C2E8A", // Dark Blue
                  light: "#2A3B9F",
                  dark: "#162470",
                  contrastText: "#FFFFFF",
                },
                secondary: {
                  main: "#E61E2D", // Red
                  light: "#EA4C57",
                  dark: "#C11925",
                  contrastText: "#FFFFFF",
                },
                background: {
                  default: "#0D1A3B",
                  paper: "#1A1A1A",
                },
                text: {
                  primary: "#FFFFFF",
                  secondary: "#B0B0B0",
                },
                // Custom colors for dark mode
                sidebar: {
                  background: "#1C2E8A",
                  text: "#FFFFFF",
                  textSecondary: "rgba(255, 255, 255, 0.7)",
                  hover: "rgba(255, 255, 255, 0.1)",
                  active: "#E61E2D",
                  activeHover: "#C11925",
                  divider: "rgba(255, 255, 255, 0.2)",
                },
                table: {
                  headerBackground: "#1C2E8A",
                  headerText: "#FFFFFF",
                  rowHover: "rgba(28, 46, 138, 0.1)",
                  rowAlternate: "rgba(255, 255, 255, 0.05)",
                },
              }),
        },
        typography: {
          fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              contained: {
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(28, 46, 138, 0.2)",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(28, 46, 138, 0.3)",
                },
              },
              outlined: {
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 500,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                "&:hover": {
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: 8,
                },
              },
            },
          },
          // MuiTableContainer: {
          //   styleOverrides: {
          //     root: {
          //       borderRadius: 12,
          //       boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          //     },
          //   },
          // },
          MuiTableHead: {
            styleOverrides: {
              root: ({ theme }) => ({
                "& .MuiTableCell-head": {
                  backgroundColor: theme.palette.table.headerBackground,
                  color: theme.palette.table.headerText,
                  fontWeight: 600,
                  fontSize: "0.875rem",
                },
              }),
            },
          },
          MuiTableRow: {
            styleOverrides: {
              root: ({ theme }) => ({
                "&:nth-of-type(even)": {
                  backgroundColor: theme.palette.table.rowAlternate,
                },
                "&:hover": {
                  backgroundColor: theme.palette.table.rowHover,
                },
              }),
            },
          },
        },
      }),
    [actualTheme],
  );

  const value: ThemeProviderState = {
    theme,
    actualTheme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
