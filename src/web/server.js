import express from "express";
import path from "path";
import { fileURLToPath } from "url";

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
  return author.replace(/\s+/g, "-").toLowerCase();
};

const downloadIconSVG = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <!--Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free-->
    <path
      d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"
    ></path>
    <path d="M13 8h-2v4H8l4 4 4-4h-3z"></path>
  </svg>
`;

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
    quotesData.quotes.forEach((quote) => {
      res.write(html`
        <div
          class="quote-card"
          id="quote-${quote.id || formatAuthorString(quote.author)}"
        >
          <div class="quote-bar">
            <button
              class="quote-download-button"
              onclick="downloadQuote('quote-${quote.id ||
              formatAuthorString(quote.author)}', '${quote.author}')"
            >
              ${downloadIconSVG}
            </button>
          </div>
          <p class="quote-text">${quote.quote}</p>
          <p class="quote-author">${quote.author}</p>
          <p class="quote-date">${formatDate(quote.createdAt)}</p>
        </div>
      `);
    });
    res.end();
  });

  app.use(express.static(path.join(__dirname)));

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
