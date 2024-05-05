
export const NumResults = ({ movies }) => {
  return (
    <div className="results text-white col-span-6 md:col-span-3 justify-end flex">
      found {movies?.length} results
    </div>
  );
}
