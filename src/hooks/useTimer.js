import {useState, useEffect, useRef, useCallback} from 'react';

function useTimer() {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = seconds % 60;



    const ref = useRef(null);
    const start = () => {
        setIsRunning(true);

    }   
    const pause = () => {
        setIsRunning(false);
    } 
    const reset = () => {
        setIsRunning(false);
        setSeconds(0);
    }

    useEffect(() => {
        if(isRunning) {
            ref.current = setInterval(() => {
                setSeconds((prev) => prev + 1)
                
            }, 1000)
        }
        return () => {
            if(ref.current) {
                clearInterval(ref.current)
                ref.current = null;
            }
        }
    }, [isRunning])

    return {
        isRunning,
        remainingSeconds,
        minutes,
        start,
        pause,
        reset
    }
}

export default useTimer;