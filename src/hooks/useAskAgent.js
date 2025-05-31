import { useState } from "react";
import axios from "axios";

export const useAskAgent = () => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [sources, setSources] = useState([]);
  const [thoughtProcess, setThoughtProcess] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'processing' | 'success' | 'error'

  const askAgent = async (query) => {
    setLoading(true);
    setAnswer(null);
    setSources([]);
    setThoughtProcess(null);
    setStatus('processing');
    
    try {
      setStatus('processing');
      const res = await axios.post(`http://3.145.91.195/api/ask`, { query }, {
        timeout: 120000, 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      // Check if we have any response at all
      if (!res) {
        throw new Error('No response received from server');
      }

      // Check if we have data
      if (!res.data) {
        throw new Error('Empty response from server');
      }

      // Try to handle the response data
      const responseData = res.data;
      
      // If the response is a string, use it directly
      if (typeof responseData === 'string') {
        setAnswer(responseData);
        setStatus('success');
      }
      // If the response is an object
      else if (typeof responseData === 'object') {
        // Try different possible response formats
        const possibleAnswer = responseData.answer || 
                             responseData.response || 
                             responseData.result || 
                             responseData.message || 
                             JSON.stringify(responseData, null, 2);

        setAnswer(possibleAnswer);
        setSources(responseData.sources || responseData.references || []);
        setThoughtProcess(responseData.thought_process || responseData.thoughtProcess || null);
        setStatus('success');
      } else {
        throw new Error('Unexpected response format');
      }

    } catch (err) {
      setStatus('error');
      
      // Handle different types of errors with specific messages
      if (err.code === 'ECONNABORTED') {
        setAnswer("The request is taking longer than expected. The backend is still processing your query...");
      } else if (err.response) {
        // Server responded with an error status
        const statusCode = err.response.status;
        const errorMessage = err.response.data?.message || 'Unknown server error';
        setAnswer(`Server responded with status ${statusCode}: ${errorMessage}`);
      } else if (err.request) {
        // Request was made but no response received
        setAnswer("The server is processing your request but hasn't responded yet. This might take a while...");
      } else {
        // Other errors
        setAnswer(`Request failed: ${err.message || 'Unknown error occurred'}`);
      }
      
      setSources([]);
      setThoughtProcess(null);
    } finally {
      setLoading(false);
    }
  };

  return { 
    askAgent, 
    loading, 
    answer, 
    sources, 
    thoughtProcess,
    status // Add status to the return object
  };
};