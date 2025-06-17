import { useState, useCallback } from 'react';

interface ChatBotState {
  sendMessage: (message: string) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

// Backend API endpoint - use environment variable or fallback
const getApiUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  if (process.env.NODE_ENV === 'production') {
    // Use the current domain for production
    return `${window.location.origin}/api/chat`;
  }
  
  return 'http://localhost:3001/api/chat';
};

const API_URL = getApiUrl();

export const useChatBot = (): ChatBotState => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the server');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return "I'm sorry, I encountered an error while processing your request. Please try again.";
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendMessage,
    isLoading,
    error
  };
}; 