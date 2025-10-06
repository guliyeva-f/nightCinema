import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite"; // ⬅️ loadEnv əlavə edildi

export default defineConfig(({ mode }) => {
  // 🔥 Env faylını əllə yüklə
  const env = loadEnv(mode, process.cwd(), ""); // bütün env-ləri oxuyur

  const API_URL = env.VITE_APP_URL || "http://localhost:5000";
  const PORT = env.VITE_PORT || 3333;

  console.log("🔍 Loaded ENV:");
  console.log("   VITE_APP_URL =", API_URL);
  console.log("   VITE_PORT =", PORT);

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: PORT,
      host: true,
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
          configure: (proxy, options) => {
            proxy.on("proxyReq", (proxyReq, req) => {
              console.log(
                `🛰️ [Proxy Request] ${req.method} ${req.url} → ${options.target}${req.url}`
              );
            });
            proxy.on("proxyRes", (proxyRes, req) => {
              console.log(
                `✅ [Proxy Response] ${req.method} ${req.url} ← ${options.target}${req.url} (${proxyRes.statusCode})`
              );
            });
            proxy.on("error", (err, req) => {
              console.error(`❌ [Proxy Error] ${req.url}`, err.message);
            });
          },
        },
      },
    },
    preview: {
      port: PORT,
      allowedHosts: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
