import reactRefresh from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [reactRefresh()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8080",
            },
        },
    },
})