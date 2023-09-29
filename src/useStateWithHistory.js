import React, { useState, useRef } from "react";

export function useStateWithHistory(initialState) {
  const [state, setInternalState] = useState(initialState);
  const history = useRef([state]);
  const historyIndex = useRef(0);

  const setState = (newState) => {
    history.current.push(newState);
    historyIndex.current = history.current.length - 1;
    setInternalState(newState);
  };

  const goBack = () => {
    if (historyIndex.current === 0) return;

    historyIndex.current--;
    setInternalState(history.current[historyIndex.current]);
  };

  const goForward = () => {
    if (historyIndex.current === history.current.length - 1) return;

    historyIndex.current++;
    setInternalState(history.current[historyIndex.current]);
  };

  return [state, setState, goBack, goForward, history.current];
}
