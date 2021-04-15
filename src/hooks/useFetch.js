// import { useState, useEffect, useCallback } from "react";

// // use custom hook --> useFetch(http://API.com)
// export const useFetch = (url) => {
//     const [loading, setLoading] = useState(true);
//     const [media, setMedia] = useState([]);

//     const getMedia = useCallback(async () => {
//         const response = await fetch(url);
//         const media = await response.json();
//         setMedia(media);
//         setLoading(false);
//     }, [url]);

//     useEffect(() => {
//         getMedia();
//     }, [url, getMedia]);

//     return { loading, media };
// };

import { useState, useEffect, useCallback } from "react";

export const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const getProducts = useCallback(async () => {
        const response = await fetch(url);
        const products = await response.json();
        setProducts(products);
        setLoading(false);
    }, [url]);

    useEffect(() => {
        getProducts();
    }, [url, getProducts]);

    return { loading, products };
};
