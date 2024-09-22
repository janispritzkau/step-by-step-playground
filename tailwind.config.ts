import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.vue", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter Variable",
      },
    },
  },
} satisfies Config;
