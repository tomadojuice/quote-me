import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html = (strings, ...values) => {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] || "");
  }, "");
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatAuthorString = (author) => {
  return author.replace(/\s+/g, '-').toLowerCase();
}

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
  const PORT = process.env.PORT || 3001;

  app.get("/api/quotes", (req, res) => {
    return (
      quotesData.quotes.map((quote) =>
        res.write(html`
          <div class="quote-card" id="quote-${quote.id || formatAuthorString(quote.author)}">
            <p class="quote-text">${quote.quote}</p>
            <p class="quote-author">${quote.author}</p>
            <button 
              class="quote-download-button"
              onclick="downloadQuote('quote-${quote.id || formatAuthorString(quote.author)}', '${quote.author}')"
            >
              Download
            </button>
            <p class="quote-date">${formatDate(quote.createdAt)}</p>
          </div>
        `)
      ),
      res.end()
    );
  });

  app.use(express.static(path.join(__dirname)));

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
