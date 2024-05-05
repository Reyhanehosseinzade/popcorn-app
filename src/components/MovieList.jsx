import { Movie } from "./Movie";
export const MovieList = ({ movies, handleSelectMovie }) => {
  return (
    <ul className="grid gap-2 p-1">
      {movies.map((movie) => {
        return (
          <Movie
            key={movie.imdbID}
            {...movie}
            handleSelectMovie={handleSelectMovie}
          />
        );
      })}
    </ul>
  );
};
