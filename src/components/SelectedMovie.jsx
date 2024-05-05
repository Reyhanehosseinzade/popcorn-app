import { FaArrowCircleLeft, FaPlus, FaStar } from "react-icons/fa";
import StarRating from "../StarRating";
import { useEffect, useState } from "react";
import axios from "axios";
const KEY = "41be285d";

export const SelectedMovie = ({
  selectedId,
  onClose,
  onAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRate, setUserRate] = useState(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRate = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRate;

    const {
      Title: title,
      Poster: poster,
      Runtime: runtime,
      imdbRating,
      Plot: plot,
      Released: released,
      Actors: actors,
      Director: director,
      Genre: genre,
    } = movie;

  useEffect(() => {
    const fetchSelected = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = res.data;
        setMovie(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSelected();
  }, [selectedId]);
  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
     function callback (e) {
      if (e.key == "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", callback);
    return (() => {
      document.removeEventListener("keydown", callback);
    })
  }, [onClose]);

  function handleAdd() {
   const newWatchedMovie = {
     imdbID: selectedId,
     title,
     poster,
     imdbRating: Number(imdbRating),
     runtime: Number(runtime.split(" ").at(0)),
     userRate,
   };
    onAddWatched(newWatchedMovie);
    onClose();
  }

  return (
    <div className="relative">
      <div className="flex justify-end absolute top-2 left-2">
        <button className="text" onClick={onClose}>
          <FaArrowCircleLeft />
        </button>
      </div>
      {loading ? (
        <h1 className="text-2xl mx-auto p-3 text-center">loading...</h1>
      ) : (
        <>
          <div className="poster flex bg-slate-700 bg-opacity-55">
            <div className="h-52">
              <img
                className="object-contain h-full"
                src={poster}
                alt={title}
              />
            </div>
            <div className="grid p-3">
              <h2 className="text-xl font-bold capitalize">{title}</h2>
              <span>
                {released} &bull; {runtime}{" "}
              </span>
              <span>{genre}</span>
              <span className="flex items-center gap-2">
                <FaStar color="orange" />
                <span>{imdbRating}</span>
                imdb rating
              </span>
            </div>
          </div>

          <div className="flex justify-center py-4 px-1">
            <div className="bg-slate-700  bg-opacity-55 p-3 rounded-md grid justify-between gap-y-5">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={"25"}
                    onSetRating={setUserRate}
                  />

                  {userRate > 0 && (
                    <button
                      onClick={handleAdd}
                      className="flex bg-orange-400 items-center justify-center text-sm py-2 gap-1 rounded-full font-medium hover:text-slate-600 hover:bg-white"
                    >
                      <FaPlus /> Add to list
                    </button>
                  )}
                </>
              ) : (
                <p className="flex gap-1 items-center">
                  you rated this movie {watchedUserRate}{" "}
                  <FaStar color="orange" />{" "}
                </p>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm w-11/12 mx-auto grid gap-2">
              <em>{plot}</em>
              <span>{actors}</span>
              <span>Directed By : {director}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};
