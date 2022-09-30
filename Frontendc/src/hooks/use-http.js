import { useState, useCallback } from "react";
import axios from "axios";
const useHttp = () => {
  const [isLoading, setisloading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setisloading(true);
    setError(null);
    let response;
    let data;
    try {
      if (requestConfig.method === "POST") {
        response = await axios.post(requestConfig.url, requestConfig.body);
        data = await response.data;
      } else {
        response = await axios.get(requestConfig.url);

        data = await response.data.Items;
      }
      if (response.status !== 200) {
        throw new Error("Request Failed");
      }
      applyData(data);
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
    setisloading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;
