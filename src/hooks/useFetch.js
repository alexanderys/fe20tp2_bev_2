import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    setTimeout(() => {
      fetch((url), { signal: abortController.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted")
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    // cleanup function, aborts whatever fetch it is associated with
    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;

// useFetch(`https://api.com/user${uid}`)
// useFetch("https://annatapi.com")
