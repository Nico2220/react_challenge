import React, { useEffect, useReducer } from "react";

function useFetch(url) {
  //   const [responseJson, setResponseJson] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState(null);

  const [state, dispatch] = useReducer(reducer, {
    responseJson: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let shouldCancel = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await fetch(url);
        const newResponseJson = await response.json();
        if (shouldCancel) return;
        dispatch({ type: "success", responseJson: newResponseJson });
      } catch (err) {
        if (shouldCancel) return;
        dispatch({ type: "error", error: err });
      }
    };

    fetchData();

    return () => (shouldCancel = true);
  }, [url]);

  return state;
}

function reducer(state, { type, responseJson, error }) {
  switch (type) {
    case "loading":
      return { ...state, loading: true };
    case "success":
      return { responseJson, isLoading: false, error: null };
    case "error":
      return { responseJson: null, isLoading: false, error };
  }
}
