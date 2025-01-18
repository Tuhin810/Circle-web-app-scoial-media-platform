import { SelectionModelProps } from "../../../@types/interface/selection.interface";

const SelectionModel: React.FC<SelectionModelProps> = ({
  handlePhotoSelection,
}) => {
  const handleSelectionWithDelay = (type: "profile" | "cover") => {
    setTimeout(() => {
      handlePhotoSelection(type);
    }, 1000);
  };

  return (
    <div className="w-52 bg-[#242832] bg-gradient-to-br from-[#242832] to-[#251c28] rounded-lg p-4 flex flex-col gap-2">
      <ul className="list-none flex flex-col gap-2 px-2">
        <li className="flex items-center text-[#7e8590] gap-2 transition-all duration-300 p-1 rounded-md cursor-pointer hover:bg-[#5353ff] hover:text-white hover:translate-y-[-1px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7e8590"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
            <path d="m15 5 4 4"></path>
          </svg>
          <p className="font-semibold text-[#bd89ff]">Which One?</p>
        </li>
        <div className="border-t border-[#42434a]"></div>
        <li
          className="flex items-center text-[#7e8590] gap-2 transition-all duration-300 p-1 rounded-md cursor-pointer hover:bg-[#5353ff] hover:text-white hover:translate-y-[-1px]"
          onClick={() => handleSelectionWithDelay("profile")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7e8590"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 21a8 8 0 0 1 13.292-6"></path>
            <circle r="5" cy="8" cx="10"></circle>
            <path d="M19 16v6"></path>
            <path d="M22 19h-6"></path>
          </svg>
          <p className="font-semibold">Profile Photo</p>
        </li>
      </ul>
      <ul className="list-none flex flex-col gap-2 px-2">
        <li
          className="flex items-center text-[#7e8590] gap-2 transition-all duration-300 p-1 rounded-md cursor-pointer hover:bg-[#5353ff] hover:text-[#bd89ff]"
          onClick={() => handleSelectionWithDelay("cover")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7e8590"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 21a8 8 0 0 0-16 0"></path>
            <circle r="5" cy="8" cx="10"></circle>
            <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
          </svg>
          <p className="font-semibold">Cover Photo</p>
        </li>
      </ul>
    </div>
  );
};

export default SelectionModel;
