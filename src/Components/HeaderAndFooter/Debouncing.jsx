import { useState, useEffect } from 'react';
// import { useDebounce } from './useDebounce'; // From previous example

export default function Debouncing () {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Debounce the search term (500ms delay)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          "https://fullstackproject-backend-z5rx.onrender.com/movies/name?name=" + `${debouncedSearchTerm}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        setSuggestions(data.results.slice(0, 5)); // Show top 5 results
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchTerm]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies..."
        className="search-input"
      />
      
      {/* Suggestions dropdown */}
      {searchTerm && (
        <div className="suggestions-dropdown">
          {isLoading ? (
            <div className="suggestion-item">Loading...</div>
          ) : error ? (
            <div className="suggestion-item error">{error}</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((movie) => (
              <div 
                key={movie.id} 
                className="suggestion-item"
                onClick={() => {
                  setSearchTerm(movie.title);
                  setSuggestions([]);
                }}
              >
                {movie.title} ({movie.release_date.slice(0, 4)})
              </div>
            ))
          ) : (
            <div className="suggestion-item">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

// Custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
