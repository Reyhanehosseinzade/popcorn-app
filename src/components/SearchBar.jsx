
export const SearchBar = ({setQuery , query}) => {

  return (
    <div className="search-bar col-span-12 md:col-span-6 order-1 md:order-none grid">
      <input
        type="text"
        placeholder="search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-md w-full p-2 capitalize placeholder:text-white outline-none mt-2 md:mt-0 sm:text-base bg-slate-300 text-white"
      />
    </div>
  );
};
