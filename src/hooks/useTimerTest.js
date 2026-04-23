import { useState, useEffect } from "react";

function useTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  let timer;

  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
    
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  return {
    isRunning,
    minutes,
    remainingSeconds,
    start,
    pause,
    reset,
  };
}

export default useTimer;
