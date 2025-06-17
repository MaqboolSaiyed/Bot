import { useState, useEffect, useCallback, useMemo } from 'react';

interface VoiceRecognitionState {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
  finalTranscript: string;
}

export const useVoiceRecognition = (): VoiceRecognitionState => {
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if browser supports speech recognition
  const recognition = useMemo(() => {
    if (typeof window === 'undefined') return null;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return SpeechRecognition ? new SpeechRecognition() : null;
  }, []);

  useEffect(() => {
    if (!recognition) {
      setError('Speech recognition is not supported in your browser.');
      return;
    }

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Update the interim transcript for real-time display
      setTranscript(interimTranscript);
      
      // Store the final transcript (will be used when listening stops)
      if (finalTranscript) {
        setFinalTranscript(prev => prev + finalTranscript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(`Error occurred in recognition: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (isListening) {
        recognition.stop();
      }
    };
  }, [recognition, isListening]);

  const startListening = useCallback(() => {
    if (!recognition) {
      setError('Speech recognition is not supported in your browser.');
      return;
    }

    try {
      // Clear previous transcripts
      setTranscript('');
      setFinalTranscript('');
      setError(null);
      
      recognition.start();
      setIsListening(true);
    } catch (err) {
      setError('Failed to start listening.');
      setIsListening(false);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (!recognition) return;

    try {
      recognition.stop();
      setIsListening(false);
    } catch (err) {
      setError('Failed to stop listening.');
    }
  }, [recognition]);

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    error,
    finalTranscript
  };
}; 