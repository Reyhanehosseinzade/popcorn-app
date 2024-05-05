import { average } from "../App";
export const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRate = average(watched.map((movie) => movie.userRate));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary bg-opacity-40 bg-slate-500 p-3 rounded-md mb-3">
      <h4 className="uppercase font-medium">movies you watched</h4>
      <div className="flex justify-between gap-2 mt-2">
        <p className="text-sm sm:text-base">
          <span>🎬</span>
          <span> {watched.length} movies</span>
        </p>
        <p className="text-sm sm:text-base">
          <span>⭐</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p className="text-sm sm:text-base">
          <span>🌟</span>
          <span>{avgUserRate.toFixed(2)}</span>
        </p>
        <p className="text-sm sm:text-base">
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};
