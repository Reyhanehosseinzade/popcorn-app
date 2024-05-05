import { useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

export const Box = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="left-side bg-slate-600 text-white rounded-md min-h-[550px] relative overflow-hidden">
      <div className="flex justify-end absolute top-2 right-2">
        <button className="text" onClick={() => setIsOpen((o) => !o)}>
          {isOpen ? <FaMinusCircle /> : <FaPlusCircle />}
        </button>
      </div>
      <div
        className={`${
          isOpen ? "h-[520px]" : "h-0"
        } duration-500 ease-linear transition-[height] overflow-y-auto list`}
      >
        {children}
      </div>
    </div>
  );
};
