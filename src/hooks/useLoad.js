import { useState, useEffect } from "react";

export function useLoad(loadCallback){
    
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    async function loadAndSet() {
        setIsLoading(true);
        try {
            const result = await loadCallback();
            setData(result);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadAndSet();
    }, []);

    return {
        data,
        isLoading
    }
}