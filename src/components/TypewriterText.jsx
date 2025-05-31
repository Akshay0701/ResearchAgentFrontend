import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function TypewriterText({ text, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const textRef = useRef(text);
  const animationRef = useRef(null);
  const currentIndexRef = useRef(0);
  const speedRef = useRef(1); // Base typing speed in ms

  useEffect(() => {
    // Reset state when text changes
    textRef.current = text;
    setDisplayedText('');
    setIsComplete(false);
    currentIndexRef.current = 0;
    
    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const animate = () => {
      if (currentIndexRef.current < textRef.current.length) {
        // Calculate dynamic speed based on content
        const char = textRef.current[currentIndexRef.current];
        let speed = speedRef.current;

        // Handle markdown headers and code blocks instantly
        if (textRef.current.slice(currentIndexRef.current, currentIndexRef.current + 2) === '# ' ||
            textRef.current.slice(currentIndexRef.current, currentIndexRef.current + 3) === '```') {
          // Find the end of the header or code block
          let endIndex = currentIndexRef.current;
          while (endIndex < textRef.current.length && 
                 textRef.current[endIndex] !== '\n') {
            endIndex++;
          }
          setDisplayedText(textRef.current.slice(0, endIndex + 1));
          currentIndexRef.current = endIndex + 1;
          animationRef.current = setTimeout(animate, speed);
          return;
        }

        // Handle newlines without extra delay
        if (char === '\n') {
          setDisplayedText(textRef.current.slice(0, currentIndexRef.current + 1));
          currentIndexRef.current++;
          animationRef.current = setTimeout(animate, speed);
          return;
        }

        setDisplayedText(textRef.current.slice(0, currentIndexRef.current + 1));
        currentIndexRef.current++;
        
        animationRef.current = setTimeout(animate, speed);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [text, onComplete]);

  return (
    <div className={`typewriter-content ${isComplete ? 'complete' : ''}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="markdown-h1" {...props} />,
          h2: ({node, ...props}) => <h2 className="markdown-h2" {...props} />,
          h3: ({node, ...props}) => <h3 className="markdown-h3" {...props} />,
          p: ({node, ...props}) => <p className="markdown-p" {...props} />,
          ul: ({node, ...props}) => <ul className="markdown-ul" {...props} />,
          ol: ({node, ...props}) => <ol className="markdown-ol" {...props} />,
          li: ({node, ...props}) => <li className="markdown-li" {...props} />,
          a: ({node, ...props}) => <a className="markdown-link" {...props} />,
          strong: ({node, ...props}) => <strong className="markdown-strong" {...props} />,
          em: ({node, ...props}) => <em className="markdown-em" {...props} />,
          code: ({node, inline, ...props}) => 
            inline ? 
              <code className="markdown-inline-code" {...props} /> : 
              <code className="markdown-code-block" {...props} />,
          pre: ({node, ...props}) => <pre className="markdown-pre" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="markdown-blockquote" {...props} />,
          table: ({node, ...props}) => <div className="markdown-table-wrapper"><table className="markdown-table" {...props} /></div>,
          th: ({node, ...props}) => <th className="markdown-th" {...props} />,
          td: ({node, ...props}) => <td className="markdown-td" {...props} />,
        }}
      >
        {displayedText}
      </ReactMarkdown>
      {!isComplete && <span className="cursor">|</span>}
    </div>
  );
} 