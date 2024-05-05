
export const SearchBar = ({setQuery , query}) => {

  return (
    <div className="search-bar col-span-6 grid">
      <input
        type="text"
        placeholder="search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-md w-full p-2 capitalize placeholder:text-white outline-none text-xs sm:text-base bg-slate-300 text-white"
      />
    </div>
  );
};
