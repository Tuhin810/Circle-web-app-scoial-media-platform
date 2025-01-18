/* eslint-disable prefer-const */

import { useEffect, useRef, useState } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { RiUser4Line } from "react-icons/ri";
import { TbSmartHome } from "react-icons/tb";

/* eslint-disable @typescript-eslint/no-explicit-any */
const MobileNavigation = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0); // Default active index (Add)
  const navRef = useRef<HTMLUListElement | null>(null);
  const navIndicatorRef = useRef<HTMLSpanElement | null>(null);

  // Update the position of the nav indicator when activeIndex changes
  useEffect(() => {
    const navIndicator = navIndicatorRef.current;
    const nav = navRef.current;

    if (navIndicator && nav) {
      const activeLink = nav.querySelectorAll("li a")[activeIndex];
      const indicatorPosition = activeLink
        ? activeLink.getBoundingClientRect().left
        : 0;
      navIndicator.style.left = `calc(${indicatorPosition + 60}px - 45px)`; // Adjust the position
    }
  }, [activeIndex]); // Dependency on activeIndex

  // Handle navigation item click
  const handleClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <>
      <ul
        className="nav bg-black w-full justify-between backdrop-blur-lg rounded-lg drop-shadow-lg shadow-gray-400"
        ref={navRef}
      >
        <span className="nav-indicator bg-black" ref={navIndicatorRef}></span>
        <li>
          <a
            href="#"
            onClick={() => handleClick(0)}
            className={activeIndex === 0 ? "nav-item-active" : ""}
          >
            <TbSmartHome
              className={
                activeIndex === 0
                  ? "h-8 w-8 text-[#d8fc5f]"
                  : "h-8 w-8 text-gray-200"
              }
            />
            {activeIndex === 0 && <span className="text-sm">Home</span>}
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => handleClick(1)}
            className={activeIndex === 1 ? "nav-item-active" : ""}
          >
            <IoChatbubbleOutline
              className={
                activeIndex === 1
                  ? "h-8 w-8 text-[#d8fc5f]"
                  : "h-8 w-8 text-gray-200"
              }
            />
            <span className="title">Chat</span>
          </a>
        </li>

        <li>
          <a
            href="#"
            onClick={() => handleClick(2)}
            className={activeIndex === 2 ? "nav-item-active" : ""}
          >
            <RiUser4Line
              className={
                activeIndex === 2
                  ? "h-8 w-8 text-[#d8fc5f]"
                  : "h-8 w-8 text-gray-200"
              }
            />
            <span className="title">Add</span>
          </a>
        </li>
      </ul>

      <svg
        className="h-10"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="filter-svg"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default MobileNavigation;
