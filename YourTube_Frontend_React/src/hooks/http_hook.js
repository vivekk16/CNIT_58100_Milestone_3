import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);
   
    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {})=>{
        setIsLoading(true);
        const httpAbortCtrll = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrll);
    try{
        const response = await fetch(url, {
            method,
            body,
            headers,
            signal: httpAbortCtrll.signal
          })
      
          const responseData = await response.json();
          responseData.ok = response.ok
          setIsLoading(false);
          return responseData;
          
    }catch(err){
        setError(err.message);
        setIsLoading(false);
        throw err;
    }
   
    }, []);

    const clearError = () => {
        setError();
    };

    useEffect(()=>{
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);
    return {isLoading, error, sendRequest, clearError};
    
};