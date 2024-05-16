import { NavBar } from "./components/NavBar";
import { Box } from "./components/Box";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { NumResults } from "./components/NumResults";
import { MovieList } from "./components/MovieList";
// import axios from "axios";
import { WatchedSummary } from "./components/WatchedSummary";
import { WatchedMoviesList } from "./components/WatchedMoviesList";
import { SelectedMovie } from "./components/SelectedMovie";
import {useMovies} from "./hooks/useMovies";
import useLocalStorageState from "./hooks/useLocalStorageState";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched , setWatched] = useLocalStorageState([] , "watched")
  const {movies , error , isLoading} = useMovies(query , handleCloseSelectMovie)

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseSelectMovie() {
    setSelectedId(null);
  }

  function handleDeleteWatched(id) {
    setWatched((movie) => movie.filter((item) => item.imdbID !== id));
  }


  function handleAddWatched(movie) {
    setWatched((watched) => {
      return [...watched, movie];
    });
  }
 
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
