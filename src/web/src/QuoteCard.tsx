import { useRef, useState, type FunctionComponent } from "react";
import type { Quote } from "./models/Quote";
import * as htmlToImage from "html-to-image";

interface QuoteCardProps {
  quote: Quote;
}

export const QuoteCard: FunctionComponent<QuoteCardProps> = ({ quote }) => {
  const quoteCardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (quoteCardRef.current === null) {
      return;
    }

    setIsDownloading(true);

    try {
      const dataUrl = await htmlToImage.toPng(quoteCardRef.current);

      const link = document.createElement("a");
      link.download = `quote-${quote.author
        .replace(/\s+/g, "-")
        .toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="quote-card" ref={quoteCardRef}>
      <p className="quote-text">{quote.quote}</p>
      <p className="quote-author">{quote.author}</p>
      {!isDownloading && (
        <button className="quote-download-button" onClick={handleDownload} value="Download">
          Download
        </button>
      )}
    </div>
  );
};
