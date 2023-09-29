import React, { useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const callBackRef = useRef();

  useEffect(() => {
    callBackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;
    const intervalId = setInterval(() => callBackRef.current(), delay);

    return () => clearInterval(intervalId);
  }, [delay]);
}
