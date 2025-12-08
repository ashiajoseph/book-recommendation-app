import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number = 350): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };

  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
