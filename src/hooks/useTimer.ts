import {useEffect, useState} from 'react';

export const useTimer = (initialTime: number, onTimeOver: () => void) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      onTimeOver();
    }
  }, [time, onTimeOver]);

  return time;
};
