import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TypewriterText from './TypewriterText';
import SourceLinks from './SourceLinks';
import ThoughtProcess from './ThoughtProcess';

export default function AnswerContent({ answer, sources, thoughtProcess }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(answer);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (!answer) return null;

  return (
    <div className="answer-content">
       {thoughtProcess && (
        <ThoughtProcess thoughtProcess={thoughtProcess} />
      )}
      <TypewriterText text={answer} />
      
      <div className="copy-section">
        <button 
          onClick={handleCopy}
          className={`copy-button ${isCopied ? 'copied' : ''}`}
          title={isCopied ? "Copied!" : "Copy answer"}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            {isCopied ? (
              // Checkmark icon
              <path 
                d="M20 6L9 17L4 12" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            ) : (
              // Copy icon
              <>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </>
            )}
          </svg>
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>

   
      
      {sources && sources.length > 0 && (
        <SourceLinks sources={sources} />
      )}
    </div>
  );
}