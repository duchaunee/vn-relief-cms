import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        "custom-bezier": "cubic-bezier(0, 0, 0.2, 1)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        notification: {
          DEFAULT: "hsl(var(--notification-background))",
          foreground: "hsl(var(--notification-foreground))",
        },
        post: {
          DEFAULT: "hsl(var(--post-background))",
          foreground: "hsl(var(--post-foreground))",
        },
        icon: {
          DEFAULT: "hsl(var(--icon-background))",
          foreground: "hsl(var(--icon-foreground))",
          "hover/background": "hsl(var(--icon-hover-background))",
          "hover/foreground": "hsl(var(--icon-hover-foreground))",
        },
        header: {
          DEFAULT: "hsl(var(--header-background))",
          foreground: "hsl(var(--header-foreground))",
          primary: "hsl(var(--header-primary))",
          "primary-foreground": "hsl(var(--header-primary-foreground))",
          accent: "hsl(var(--header-accent))",
          "accent-foreground": "hsl(var(--header-accent-foreground))",
          border: "hsl(var(--header-border))",
          ring: "hsl(var(--header-ring))",
        },
        transparentAdmin: "transparent",
        currentAdmin: "currentColor",
        whiteAdmin: "#FFFFFF",
        blackAdmin: "#171718",
        primaryAdmin: "#335CFF",
        grayAdmin: {
          "100": "#FAFBFC",
          "200": "#F9FAFB",
          "300": "#E2E8F0",
          "400": "#F5F7FA",
          "500": "#B9BEC6",
          "600": "#9CA3AF",
          "700": "#6B7280",
          DEFAULT: "#525866",
        },
        dangerAdmin: {
          DEFAULT: "#EF4444",
          light: "#FEE2E2",
        },
        successAdmin: {
          DEFAULT: "#22C55E",
          light: "#DCFCE7",
        },
        warningAdmin: "#EAB308",
        "light-theme": "#F4F7FF",
        "light-orange": "#FFEDD5",
        "light-blue": "#E0F2FE",
        "light-purple": "#F3E8FF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
