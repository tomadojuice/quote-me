import { useState, useEffect } from 'react'
import './App.css'
import { QuoteCard } from './QuoteCard'
import type { Quote } from './models/Quote'

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('/api/quotes');
        if (!response.ok) {
          throw new Error('Failed to fetch quotes');
        }
        const quotesData = await response.json();
        setQuotes(quotesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return <div>Loading quotes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (quotes.length === 0) {
    return <div>No quotes found.</div>;
  }

  return (
    <>
    <h1>Quote Me</h1>
    <div className="quotes-container">
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} />
      ))}
    </div>
    </>
  )
}

export default App
