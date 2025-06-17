import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useChatBot } from '../hooks/useChatBot';
import { Message } from '../types';
import '../styles/ChatInterface.css';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pendingTranscript, setPendingTranscript] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { 
    transcript, 
    finalTranscript,
    isListening: voiceIsListening, 
    startListening, 
    stopListening,
    error: voiceError
  } = useVoiceRecognition();

  const { 
    speak, 
    stopSpeaking, 
    isSpeaking: ttsIsSpeaking 
  } = useTextToSpeech();

  const { 
    sendMessage, 
    isLoading 
  } = useChatBot();

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await sendMessage(text);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      speak(response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [sendMessage, speak]);

  useEffect(() => {
    setIsListening(voiceIsListening);
  }, [voiceIsListening]);

  useEffect(() => {
    setIsSpeaking(ttsIsSpeaking);
  }, [ttsIsSpeaking]);

  // Update pending transcript while listening
  useEffect(() => {
    if (isListening) {
      setPendingTranscript(transcript);
    }
  }, [transcript, isListening]);

  // Process final transcript when listening stops
  useEffect(() => {
    if (!isListening && finalTranscript.trim()) {
      handleSendMessage(finalTranscript);
      setPendingTranscript('');
    }
  }, [isListening, finalTranscript, handleSendMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleReset = () => {
    setMessages([]);
    stopSpeaking();
    setPendingTranscript('');
  };

  // Modern, minimal icons
  const MicIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  );

  const StopIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12"/>
    </svg>
  );

  const ResetIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
      <path d="M3 21v-5h5"/>
    </svg>
  );

  const BotIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/>
      <line x1="8" y1="16" x2="8" y2="16"/>
      <line x1="16" y1="16" x2="16" y2="16"/>
    </svg>
  );

  const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  return (
    <div className="chat-container fade-in">
      {/* Header */}
      <header className="chat-header glass">
        <div className="header-content">
          <h1 className="app-title">Voice Assistant</h1>
          <p className="app-subtitle">Ask me anything about my background, skills, or experiences</p>
          <div className="status-indicator">
            <div className={`status-dot ${isListening ? 'listening' : ''}`}></div>
            <span className="status-text">{isListening ? 'Listening...' : 'Ready to chat'}</span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="messages-container glass">
        {messages.length === 0 && !isListening ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3 className="empty-title">Start a conversation</h3>
            <p className="empty-description">
              Click the microphone button and ask me anything about my background, skills, or experiences.
            </p>
            <div className="suggestions">
              <span className="suggestion-label">Try asking:</span>
              <div className="suggestion-chips">
                <span className="chip">"Tell me about your background"</span>
                <span className="chip">"What are your interests?"</span>
                <span className="chip">"What are your achievements?"</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-avatar">
                  {message.sender === 'user' ? <UserIcon /> : <BotIcon />}
                </div>
                <div className="message-content">
                  <p className="message-text">{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Pending transcript */}
            {isListening && pendingTranscript && (
              <div className="message user-message pending">
                <div className="message-avatar">
                  <UserIcon />
                </div>
                <div className="message-content">
                  <p className="message-text pending-text">"{pendingTranscript}"</p>
                  <span className="message-time">Listening...</span>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Controls */}
      <div className="controls glass">
        <button
          className={`primary-button ${isListening ? 'listening' : ''}`}
          onClick={toggleListening}
          disabled={isLoading || isSpeaking}
        >
          <span className="button-icon">
            {isListening ? <StopIcon /> : <MicIcon />}
          </span>
          <span className="button-text">
            {isListening ? 'Stop' : 'Start Listening'}
          </span>
        </button>

        <button
          className="secondary-button"
          onClick={handleReset}
          disabled={isLoading || isSpeaking}
        >
          <span className="button-icon">
            <ResetIcon />
          </span>
          <span className="button-text">Reset</span>
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="loading-indicator glass">
          <div className="loading-content">
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <span className="loading-text">Thinking...</span>
          </div>
        </div>
      )}

      {/* Error message */}
      {voiceError && (
        <div className="error-message glass">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{voiceError}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface; 