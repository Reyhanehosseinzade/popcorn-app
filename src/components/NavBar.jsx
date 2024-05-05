import { Logo } from "./Logo";

export const NavBar = ({children}) => {
  return (
    <div className="navbar grid gap-1 grid-cols-12 shadow-md rounded-md h-14 items-center bg-slate-400 px-2">
      <Logo />
      {children}
    </div>
  );
};
