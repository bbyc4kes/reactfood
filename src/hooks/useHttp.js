import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const resData = await response.json()
    
    if (!response.ok) {
        throw new Error(
            resData.message || ('Something went wrong, failed to send request.')
        );
    }

    return resData;
}

export default function useHttp(url, config, initialData) {
    const [fetchedData, setFetchedData] = useState(initialData);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setFetchedData(initialData)
    }

    const sendRequest = useCallback(
      async function sendRequest(data) {
        setIsFetching(true);
        try {
            const resData = await sendHttpRequest(url, {...config, body: data});
            setFetchedData(resData)
        } catch (e) {
            setError(e.message) || console.error(e)
        }
        setIsFetching(false);
      }, [url, config]
    );

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);
    
    return {
        fetchedData,
        isFetching,
        error,
        sendRequest,
        clearData
    }
}

