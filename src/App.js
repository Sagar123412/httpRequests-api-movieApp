import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {

    /* Using typical promises and then and catch block */

    /*
fetch('https:swapi.dev/api/films')
//fetch api returns a promise which we will then handle
.then(response => {
return response.json();
})
//json() also returns a promise

.then(data => {
const transformedData = data.results.map(moviesData => {
return {
id: moviesData.episode_id,
title: moviesData.title,
releaseDate: moviesData.release_date,
openingText: moviesData.opening_crawl,
}
})

// now we can initialize our movies state with this newly transformed data
//which we will then pass as a prop to our MovieList Component
setMovies(transformedData);
}) */




    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };

      });

      setMovies(transformedMovies);

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);


  // for sending http post requests [to post data throu api to server ] do the following

  /* async function addMovieHandler(movie) {
     const response = await fetch('https://react-http-6b4a6.firebaseio.com/movies.json', {
       method: 'POST',
       body: JSON.stringify(movie),
       headers: {
         'Content-Type': 'application/json'
       }
     });
     const data = await response.json();
     console.log(data);
   }
 
 */


  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;