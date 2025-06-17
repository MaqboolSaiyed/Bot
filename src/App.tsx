import React from 'react';
import ChatInterface from './components/ChatInterface';
import './App.css';
import { Analytics } from "@vercel/analytics/react";

// Simple fallback component
const FallbackComponent: React.FC = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center'
  }}>
    <div>
      <h1 style={{ color: '#6366f1', marginBottom: '20px' }}>Voice Assistant</h1>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>
        Loading the chat interface...
      </p>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        border: '3px solid #e5e7eb', 
        borderTop: '3px solid #6366f1', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite',
        margin: '0 auto'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.error('Error boundary caught error:', error);
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackComponent />;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <ChatInterface />
        <Analytics />
      </div>
    </ErrorBoundary>
  );
}

export default App;
