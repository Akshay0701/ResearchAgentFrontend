# Research Agent Frontend

A React-based frontend application that interfaces with an AI-powered research agent to provide detailed, well-sourced answers to research queries. The agent processes questions through a reasoning pipeline and returns comprehensive responses with relevant sources.

## Overview

This project implements a web-based research assistant that helps users get detailed answers to their research questions. The agent processes queries through a sophisticated reasoning pipeline, breaking down complex questions into manageable steps, and provides well-structured responses with proper citations and sources.

# Deployed on AWS
http://researchappweb.s3-website.us-east-2.amazonaws.com/ (did not get much time to add Certificate for HTTPS)


## Demo

🎥 [Watch Demo Video](demo.mp4)


### Key Features
- Interactive query interface for research questions
- Real-time processing status updates
- Detailed responses with source citations
- Thought process visualization
- Responsive design for various devices

## Technical Approach

### Frontend Architecture
- Built with React using Create React App
- Custom hooks for API interaction (`useAskAgent`)
- Axios for API communication
- State management using React Hooks
- Responsive UI with modern CSS

### Reasoning Pipeline
1. User submits a research query
2. Frontend sends query to backend API
3. Backend processes query through multiple steps:
   - Query analysis and decomposition
   - Information gathering
   - Source validation
   - Response synthesis
4. Frontend receives and displays:
   - Final answer
   - Source citations
   - Thought process (when available)

### Notable Technologies
- React 18
- Axios for API communication
- AWS S3 for Frontend deployment

## Security Measures

### Implemented Security Features
1. **Input Validation**
   - Client-side query sanitization
   - Length and content validation
   - Prevention of script injection

2. **API Security**
   - CORS configuration
   - Request timeout management
   - Error handling and sanitization

3. **Response Handling**
   - Safe rendering of API responses
   - Content sanitization
   - Error message filtering

### Limitations and Future Improvements
- Add rate limiting for API requests
- Implement user authentication
- Add input content filtering
- Enhance error message security

## Setup & Running Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Local Development Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ResearchAgentFrontend.git
   cd ResearchAgentFrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   REACT_APP_API_URL=http://localhost:3001/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
```

## Usage Guide

1. **Making a Query**
   - Enter your research question in the input field
   - Click "Ask" or press Enter
   - Wait for the agent to process your query (may take up to 2 minutes)

2. **Understanding the Response**
   - The answer will be displayed in the main content area
   - Sources will be listed below the answer
   - The thought process (when available) shows how the agent arrived at the answer

3. **Error Handling**
   - If the query takes too long, you'll see a processing message
   - Network errors will display appropriate messages
   - Invalid queries will prompt for clarification

## Example Scenarios

### Example 1: Historical Research
**Query:** "What were the main causes of the Industrial Revolution in Britain?"

**Response:**
```
The Industrial Revolution in Britain was primarily caused by several interconnected factors:

1. Agricultural Revolution (1700-1800)
   - Enclosure movement
   - New farming techniques
   - Increased food production

2. Technological Innovation
   - Steam engine development
   - Textile machinery
   - Iron production methods

[Sources]
- "The Industrial Revolution" by T.S. Ashton
- "The Making of the English Working Class" by E.P. Thompson
- British Museum Archives, 1780-1850
```

### Example 2: Scientific Research
**Query:** "How does quantum entanglement work and what are its practical applications?"

[Response would include detailed explanation with scientific sources]

### Future Improvements
- Add user authentication
- Implement query history
- Add support for file uploads
- Enhance source visualization
- Add export functionality for research results

## License

MIT License - See LICENSE file for details
