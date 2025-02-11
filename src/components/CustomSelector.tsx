import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

const CustomSelector = ({ title }) => {
  const [show, setShow] = useState(false);

  const date = ["Today", "Last Week", "Last Month"];

  return (
    <div className="w-full border-b pb-4 mb-4 flex items-center justify-between cursor-pointer">
      <p className="text-lg font-semibold">{title}</p>

      <span
        className="relative inline-flex text-primary font-semibold text-sm items-center gap-1 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {" "}
        <Calendar className="w-4" /> Today <ChevronDown className="w-4" />
        {show && (
          <div className="w-[120px] flex flex-col items-start gap-2 text-slate-600 absolute top-10 -right-14 bg-white ">
            {date.map((dt, idx) => (
              <p
                key={idx}
                className="text-sm cursor-pointer hover:text-white hover:bg-primary transition-all rounded w-full p-2"
              >
                {dt}
              </p>
            ))}
          </div>
        )}
      </span>
    </div>
  );
};

export default CustomSelector;
