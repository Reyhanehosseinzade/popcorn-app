import { Logo } from "./Logo";

export const NavBar = ({children}) => {
  return (
    <div className="navbar grid gap-1 grid-cols-12 shadow-md rounded-md min-h-14 items-center bg-slate-400 p-2">
      <Logo />
      {children}
    </div>
  );
};
