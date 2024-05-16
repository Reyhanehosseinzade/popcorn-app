import axios from "axios";
import { useEffect, useState } from "react";
const KEY = "41be285d";

export function useMovies(query , callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
      const fetchMovies = async () => {
    callback?.()
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
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return {isLoading, error, movies , callback};
}
