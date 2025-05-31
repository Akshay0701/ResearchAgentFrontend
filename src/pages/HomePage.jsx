import { useState, useRef, useEffect } from "react";
import { useAskAgent } from "../hooks/useAskAgent";
import QueryInput from "../components/QueryInput";
import LoadingDots from "../components/LoadingDots";
import AnswerContent from "../components/AnswerContent";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function HomePage() {
  const [conversation, setConversation] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const { askAgent, loading, answer, sources, thoughtProcess } = useAskAgent();
  const currentQueryRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, loading]);

  // Handle API response
  useEffect(() => {
    if (answer && !loading && currentQueryRef.current) {
      const aiMessage = {
        role: 'assistant',
        content: answer,
        sources: sources,
        thoughtProcess: thoughtProcess,
        timestamp: new Date().toISOString()
      };

      setConversation(prev => [...prev, aiMessage]);
      currentQueryRef.current = null; // Reset the current query
    }
  }, [answer, sources, thoughtProcess, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    // Store the current query
    currentQueryRef.current = inputValue;
    
    // Clear input and add user message
    setInputValue('');
    setConversation(prev => [...prev, userMessage]);

    try {
      await askAgent(inputValue);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      // Add error message to conversation
      const errorMessage = {
        role: 'assistant',
        content: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date().toISOString()
      };
      setConversation(prev => [...prev, errorMessage]);
      currentQueryRef.current = null;
    }
  };

  const startNewChat = () => {
    setConversation([]);
    setIsSidebarOpen(false);
    currentQueryRef.current = null;
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={startNewChat}
      />
      
      <main className="chat-container">
        {conversation.length === 0 ? (
          <div className="welcome-container">
            <h1>Research Assistant</h1>
            <p>Ask me anything, and I'll provide answers with citations from the web.</p>
            <div className="welcome-cards">
              <div className="welcome-card">
                <h3>🔍 Web Research</h3>
                <p>I can find and summarize the latest information from across the web.</p>
              </div>
              <div className="welcome-card">
                <h3>📚 Source Citations</h3>
                <p>All answers include references to the original sources.</p>
              </div>
              <div className="welcome-card">
                <h3>💡 Example Questions</h3>
                <ul>
                  <li onClick={() => setInputValue("Explain quantum computing basics")}>Explain quantum computing basics</li>
                  <li onClick={() => setInputValue("Latest trends in AI for 2024")}>Latest trends in AI for 2024</li>
                  <li onClick={() => setInputValue("Compare React and Vue performance")}>Research Best Phones Under $1000 in 2025</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="messages">
            {conversation.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-content">
                  <div className="message-body">
                    <div className="message-text">
                      {message.role === 'user' ? (
                        message.content
                      ) : (
                        <AnswerContent 
                          answer={message.content} 
                          sources={message.sources}
                          thoughtProcess={message.thoughtProcess}
                        />
                      )}
                    </div>
                    <div className="message-timestamp">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message ai">
                <div className="message-bubble">
                  <LoadingDots />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="scroll-anchor" />
          </div>
        )}
        
        <div className="input-container">
          <div className="query-form">
            <QueryInput 
              query={inputValue} 
              setQuery={setInputValue} 
              loading={loading} 
            />
            <button 
              onClick={handleSubmit}
              className="submit-button" 
              disabled={loading || !inputValue.trim()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="disclaimer">
            Research Assistant may produce inaccurate information. Verify critical facts.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}