interface CustomToggleProps {
  onClick: () => void;
  toggle: boolean;
}

const CustomToggle = ({ onClick, toggle }: CustomToggleProps) => {
  return (
    <div
      onClick={onClick}
      className={`w-[45px] h-[22px] border rounded-xl ${
        toggle ? "bg-green-300 justify-end p-[1px]" : "bg-gray-400"
      } flex items-center  cursor-pointer transition-transform duration-300`}
    >
      <div
        className={`${
          toggle ? "" : ""
        } w-[22px] bg-white h-[18px] rounded-full`}
      ></div>
    </div>
  );
};

export default CustomToggle;
