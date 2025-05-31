import { useState } from 'react';

export default function ThoughtProcess({ thoughtProcess }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!thoughtProcess) return null;

  const { sub_questions, analysis_steps, content_summary } = thoughtProcess;

  return (
    <div className={`thought-process-box ${isExpanded ? 'expanded' : ''}`}>
      <div className="thought-process-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="thought-process-title">
          <span className="thinking-icon"></span>
          <span>Model's Thought Process</span>
        </div>
        <button className="expand-button" aria-label={isExpanded ? "Collapse" : "Expand"}>
          {isExpanded ? "−" : "+"}
        </button>
      </div>
      
      {isExpanded && (
        <div className="thought-process-content">
          {/* Sub Questions Section */}
          {sub_questions && sub_questions.length > 0 && (
            <div className="thought-section">
              <h4>Research Questions</h4>
              <ul className="thought-list">
                {sub_questions.map((question, index) => (
                  <li key={index} className="thought-item">
                    <span className="thought-bullet">•</span>
                    {question}
                    {content_summary && content_summary[question] && (
                      <div className="content-summary">
                        {content_summary[question]}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Analysis Steps Section */}
          {analysis_steps && analysis_steps.length > 0 && (
            <div className="thought-section">
              <h4>Analysis Process</h4>
              <div className="analysis-steps">
                {analysis_steps.map((step, index) => (
                  <div key={index} className="analysis-step">
                    {step.startsWith('  ') ? (
                      <div className="sub-step">{step}</div>
                    ) : (
                      <div className="main-step">{step}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 