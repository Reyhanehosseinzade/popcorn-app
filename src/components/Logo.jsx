import popcorn from "/popcorn.png";

export const Logo = () => {
  return (
    <div className="logo flex gap-1 items-center text-white font-bold col-span-6 md:col-span-3">
      <img src={popcorn} alt="" className="h-10 object-cover" />
      usePopcorn
    </div>
  );
};
