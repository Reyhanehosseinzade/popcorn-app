import { FaRegTimesCircle } from "react-icons/fa";

export const WatchedMovie = ({
  Title,
  Poster,
  Runtime,
  imdbRating,
  userRate = 0,
  imdbID,
  onDelete,
}) => {
  return (
    <li className="flex gap-2 p-2 rounded-md bg-opacity-50 bg-slate-400 relative">
      <img src={Poster} className="h-14 w-14 object-cover rounded-md" alt="" />
      <div className="grid">
        <h3 className="title font-semibold">{Title}</h3>
        <div className="flex justify-between gap-5 mt-2">
          <p className="text-sm sm:text-base">
            <span>⭐</span>
            <span>{imdbRating}</span>
          </p>
          <p className="text-sm sm:text-base">
            <span>🌟</span>
            <span>{userRate}</span>
          </p>
          <p className="text-sm sm:text-base">
            <span>⏳</span>
            <span>{Runtime} min</span>
          </p>
        </div>
      </div>
      <button
        onClick={() => onDelete(imdbID)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-200"
      >
        <FaRegTimesCircle />
      </button>
    </li>
  );
};
