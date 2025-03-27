import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'

import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import { getTrendingMovies, updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [debouncedSearchedTerm, setDebouncedSearchedTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [movieList, setMovieList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [trendingMovies, setTrendingMovies] = useState([]);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  // usDebounce( function, delay_by_ms, dependency )
  useDebounce(() => setDebouncedSearchedTerm(searchTerm), 500, [searchTerm])

  const fetchGenres = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}/genre/movie/list`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch genres');
        setGenreList([]);
        return;
      }

      console.log(data);
      setGenreList(data.genres || []);

    } catch (error) {
      console.error(`Error fetching genres: ${error}`);
      setErrorMessage('Error fetching genres. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      console.log(data);
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    console.log("Updated genreList: ", genreList);
  }, [genreList]);

  useEffect(() => {
    fetchMovies(debouncedSearchedTerm);
  }, [debouncedSearchedTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const handleModal = (movie) => {
    if (movie === null) {
      setModal(false);
      setModalData(null);
    } else {
      console.log(movie.title + " clicked!");
      setModal(true);
      setModalData(movie);
    }
  }

  return (
    <main>
      {modal && (
        <div className="modal">
          <MovieModal movie={modalData} genres={genreList} handleModal={handleModal} />
        </div>
      )}

      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} handleModal={handleModal} />
              ))}
            </ul>
          )}
        </section>


      </div>
    </main>
  )
}

export default App