import { NavBar } from "./components/NavBar";
import { Box } from "./components/Box";
import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { NumResults } from "./components/NumResults";
import { MovieList } from "./components/MovieList";
import axios from "axios";
import { WatchedSummary } from "./components/WatchedSummary";
import { WatchedMoviesList } from "./components/WatchedMoviesList";
import { SelectedMovie } from "./components/SelectedMovie";
const KEY = "41be285d";
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched")
    return JSON.parse(storedValue)
  });

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseSelectMovie() {
    setSelectedId(null);
  }

  function handleDeleteWatched(id) {
    setWatched((movie) => movie.filter((item) => item.imdbID !== id));
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchMovies = async () => {
      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: signal }
        );
        if (res.data.Response === "False") {
          setError("Movie Not Found!");
        } else {
          setMovies(res.data.Search);
          setError("");
        }
      } catch (error) {
        if (error.name == "AbortError") return;
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    handleSelectMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  function handleAddWatched(movie) {
    setWatched((watched) => {
      return [...watched, movie];
    });
  }
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <main className="2xl:container mx-auto min-h-screen w-full pb-8 p-3 sm:p-5 bg-slate-800">
      <NavBar>
        <SearchBar movies={movies} query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <div className="grid lg:grid-cols-2 gap-3 mt-4 p-2 ">
        {/* left-side list of movies********************** */}
        <Box>
          {isLoading && (
            <h1 className="text-2xl mx-auto p-3 text-center">loading...</h1>
          )}
          {error && <div className="text-center text-red-400">{error}</div>}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
        </Box>
        {/* right-side movie details and you watched*************** */}
        <Box>
          {selectedId ? (
            <SelectedMovie
              movies={movies}
              watched={watched}
              selectedId={selectedId}
              onClose={handleCloseSelectMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} movies={movies} />
              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </div>
    </main>
  );
}

export default App;
