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

  console.log("rendered")
  let timer;

  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
        console.log("seconds:", seconds);
      }, 1000);
    }
    return () => {
        console.log("CLEARING interval ID:", timer);
      clearInterval(timer);
    };
  }, [isRunning]);
  console.log("new interval ID: ", timer)

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
