import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    optimizeDeps: {
        exclude: ["@health/ui", "@health/core"],
    },
    server: {
        port: 5173,
        strictPort: true,
        fs: {
            allow: [path.resolve(__dirname, "../..")],
        },
    },
});