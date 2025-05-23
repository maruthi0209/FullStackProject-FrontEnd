// pages/SearchResults.js
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar, FaRegClock, FaSearch } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
// import Loader from '../components/Loader';

export default function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (query) {
            try {
                setIsLoading(true);
                setError(null);
                fetch(`https://fullstackproject-backend-z5rx.onrender.com/movies/name?name=${query}`)
                .then(res => res.json())
                .then(data => setResults(data));

            } catch (err) {
                setError('Failed to fetch search results');
                console.error(err);
            } finally {
                setIsLoading(false);
      }
        }
    }, [query]);

//     if (isLoading) {
//     return <Loader />;
//   }

    if (error) {
    return (
      <div className="search-results-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <IoIosArrowBack /> Back
        </button>
        <h2>
          {query 
            ? `Search Results for "${query}"` 
            : 'No search query provided'}
        </h2>
      </div>

      {(results && results.length > 0 ) ? (
        <div className="results-grid">
          {results.map((movie) => (
            <div 
              key={movie._id} 
              className="movie-card"
              onClick={() => navigate(`/moviedetails/${movie._id}`)}
            >
              <div className="movie-poster">
                {movie.moviePoster ? (
                  <img src={movie.moviePoster} alt={movie.movieName} />
                ) : (
                  <div className="poster-placeholder">
                    <FaSearch size={24} />
                  </div>
                )}
              </div>
              <div className="movie-info">
                <h3>{movie.movieName} ({movie.movieReleaseYear})</h3>
                <div className="movie-meta">
                  <span className="rating">
                    <FaStar color="#FFD700" /> {movie.movieAverageRating}
                  </span>
                  <span className="runtime">
                    <FaRegClock /> {movie.movieRunningTimeInMinutes} mins
                  </span>
                </div>
                <div className="genres">
                  {/* {movie.movieGenre.join(', ')} */}
                  Director : {movie.movieDirector}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No results found for "{query}"</p>
          <p>Try different keywords or check the spelling</p>
        </div>
      )}
    </div>
  );
}
