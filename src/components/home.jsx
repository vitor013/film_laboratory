import { useEffect, useState } from 'react';
import './home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_KEY = '6908c6ce';

  const fetchMoviesByTitle = async (title) => {
    try {
      if (!title.trim()) {
        setMovies([]);
        setError(null);
        return;
      }

      setLoading(true);
      const response = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === 'True') setMovies(data.Search);
      else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async () => {
    const randomTitles = [
      'Avengers', 'Batman', 'Superman', 'Matrix', 'Inception',
      'Titanic', 'Joker', 'Star Wars', 'Spiderman', 'Wonder Woman',
    ];

    const shuffledTitles = randomTitles.sort(() => 0.5 - Math.random());
    const randomSelections = shuffledTitles.slice(0, 5);

    try {
      const allSuggestions = await Promise.all(
        randomSelections.map(async (title) => {
          const response = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`);
          const data = await response.json();
          return data.Response === 'True' ? data.Search[0] : null;
        })
      );
      setSuggestions(allSuggestions.filter(Boolean));
    } catch (err) {
      console.error('Erro ao buscar sugestões:', err.message);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
      const data = await response.json();
      setSelectedMovie(data);
    } catch (err) {
      console.error('Erro ao buscar detalhes do filme:', err.message);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMoviesByTitle(searchTerm);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMoviesByTitle(searchTerm);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="home-container">
      <h1>Film laboratory</h1>

      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Buscar filme..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </form>

      {error && <p className="error-message">Erro: {error}</p>}

      {!searchTerm && (
        <div className="suggestions">
          <h2>Filmes sugeridos:</h2>
          <div className="movie-list">
            {suggestions.map((movie) => (
              <div
                key={movie.imdbID}
                className="movie-card"
                onClick={() => fetchMovieDetails(movie.imdbID)}
              >
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'}
                  alt={`Poster de ${movie.Title}`}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h3>{movie.Title}</h3>
                  <p><strong>Ano:</strong> {movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <p>Carregando filmes...</p>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => fetchMovieDetails(movie.imdbID)}
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'}
                alt={`Poster de ${movie.Title}`}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p><strong>Ano:</strong> {movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>X</button>
            <h2>{selectedMovie.Title}</h2>
            <p><strong>Ano:</strong> {selectedMovie.Year}</p>
            <p><strong>Gênero:</strong> {selectedMovie.Genre}</p>
            <p><strong>Diretor:</strong> {selectedMovie.Director}</p>
            <p><strong>Elenco:</strong> {selectedMovie.Actors}</p>
            <p><strong>Enredo:</strong> {selectedMovie.Plot}</p>
            <img
              src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/200x300'}
              alt={`Poster de ${selectedMovie.Title}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
