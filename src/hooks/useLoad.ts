import { useState, useEffect } from "react";

export function useLoad<T>(loadCallback: () => Promise<T[]>) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);

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
    isLoading,
  };
}