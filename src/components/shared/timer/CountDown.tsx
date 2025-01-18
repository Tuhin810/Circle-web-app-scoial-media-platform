import React, { useState, useEffect } from "react";
import { CountDownProps } from "../../../@types/props/countDown.interface.props";
import "./countDownStyles.css";

const CountDown: React.FC<CountDownProps> = ({ setTimerModel }) => {
  const [timeLeft, setTimeLeft] = useState<number>(3);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleCloseTimer = () => {
    setTimerModel(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-lg z-50">
      <div className="relative w-48 h-48  flex justify-center items-center">
        <div
          className={`absolute inset-0 rounded-full border-8 border-transparent animate-spin-slow transition-all duration-1000`}
          style={{
            borderImage: `conic-gradient(from 0deg, white, transparent ${
              timeLeft * 33.33
            }%) 1`,
          }}
        />

        <h1 className="text-6xl text-white animate-pop" key={timeLeft}>
          {timeLeft}
        </h1>
      </div>
      <button
        onClick={handleCloseTimer}
        className="absolute bottom-40 p-2 bg-white text-black rounded-md"
      >
        Cancel
      </button>
    </div>
  );
};

export default CountDown;
