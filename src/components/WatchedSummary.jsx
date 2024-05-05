
export const WatchedSummary = ({ watched }) => {
  // function average() {
  //   if (watched.length === 0) return;
  //   let sum = watched.reduce()
  // }
  return (
    <div className="summary bg-opacity-40 bg-slate-500 p-3 rounded-md my-3">
      <h4 className="uppercase font-medium">movies you watched</h4>
      <div className="flex justify-between gap-2 mt-2">
        <p className="text-sm sm:text-base">
          <span>🎬</span>
          <span> {watched.length} movies</span>
        </p>
        <p className="text-sm sm:text-base">
          <span>⭐</span>
          <span>8.65</span>
        </p>
        <p className="text-sm sm:text-base">
          <span>🌟</span>
          <span>{ watched.userRate}</span>
        </p>
        <p className="text-sm sm:text-base">
          <span>⏳</span>
          <span>146 min</span>
        </p>
      </div>
    </div>
  );
}
