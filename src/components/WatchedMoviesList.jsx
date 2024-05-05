import { WatchedMovie } from "./WatchedMovie";

export const WatchedMoviesList = ({ watched, onDelete }) => {
  const watchedList = watched || [];

  return (
    <ul className="grid gap-2 p-1">
      {watchedList.map((movie) => {
        return (
          <WatchedMovie key={movie.imdbID} {...movie} onDelete={onDelete} />
        );
      })}
    </ul>
  );
};