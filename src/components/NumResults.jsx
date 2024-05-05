
export const NumResults = ({ movies }) => {
  return (
    <div className="results text-white text-xs sm:text-base col-span-3 flex justify-end">
      found {movies?.length} results
    </div>
  );
}
