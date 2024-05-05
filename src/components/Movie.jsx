import { FcPlanner } from "react-icons/fc";

export const Movie = ({ Title,imdbID, Poster, Year, handleSelectMovie }) => {
  return (
    <>
      <li
        onClick={() => handleSelectMovie(imdbID)}
        className="flex gap-2 p-2 rounded-md bg-opacity-50 bg-slate-400 cursor-pointer"
      >
        <img
          src={Poster}
          className="h-14 w-14 object-cover rounded-md"
          alt=""
        />
        <div className="grid">
          <h3 className="title font-semibold">{Title}</h3>
          <span className="flex items-center gap-1 ">
            <FcPlanner />
            <span className="text-gray-300">{Year}</span>
          </span>
        </div>
      </li>
    </>
  );
};
