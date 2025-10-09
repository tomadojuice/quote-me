import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const startWebServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    app.use(
      createProxyMiddleware({
        target: "http://localhost:5173",
        changeOrigin: true,
        ws: true,
      })
    );
  } else {
    app.use(express.static(path.join(__dirname, "web", "dist")));
  }

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    if (isDev) {
      console.log("Development mode: proxying to Vite dev server");
    }
  });
};
