import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Starts an Express web server to serve quotes data and static files or proxy requests in development.
 *
 * @param {Object} quotesData - An object containing quotes data to be served by the API.
 * @param {Array} quotesData.quotes - An array of quote objects to be returned by the /api/quotes endpoint.
 *
 * @returns {void}
 */
export const startWebServer = async (quotesData) => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const isDev = process.env.NODE_ENV === "development";

  app.get('/api/quotes', (req, res) => {
    res.json(quotesData.quotes || []);
  });

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
