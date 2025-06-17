import { useState, useCallback } from 'react';

interface TextToSpeechState {
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  error: string | null;
}

export const useTextToSpeech = (): TextToSpeechState => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
      setError('Text-to-speech is not supported in your browser.');
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice settings for better quality
      utterance.rate = 0.85;        // Slower for clearer speech
      utterance.pitch = 0.9;        // Slightly lower pitch
      utterance.volume = 0.9;       // Good volume level

      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find the best available voice
      let selectedVoice = null;
      
      // Priority list of preferred voices (Alexa and other high-quality voices)
      const voicePreferences = [
        'Alexa',
        'Amazon Polly',
        'Amazon Polly Joanna',
        'Amazon Polly Matthew',
        'Amazon Polly Salli',
        'Amazon Polly Kimberly',
        'Amazon Polly Kendra',
        'Amazon Polly Justin',
        'Google UK English Female',
        'Google UK English Male', 
        'Google US English Female',
        'Google US English Male',
        'Microsoft Zira',
        'Microsoft David',
        'Samantha',
        'Alex',
        'Victoria',
        'Daniel',
        'Karen',
        'Tom'
      ];

      // Try to find a preferred voice
      for (const preference of voicePreferences) {
        const voice = voices.find(v => 
          v.name.includes(preference) || 
          v.name.toLowerCase().includes(preference.toLowerCase())
        );
        if (voice) {
          selectedVoice = voice;
          break;
        }
      }

      // If no preferred voice found, try to find any Amazon or high-quality voice
      if (!selectedVoice) {
        // Look for voices with "Amazon", "Alexa", "Google" or "Microsoft" in the name
        selectedVoice = voices.find(voice => 
          voice.name.includes('Amazon') ||
          voice.name.includes('Alexa') ||
          voice.name.includes('Google') || 
          voice.name.includes('Microsoft') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Alex')
        );
      }

      // If still no voice found, use the first available voice
      if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices[0];
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log('Using voice:', selectedVoice.name);
        
        // Log all available voices for debugging
        console.log('Available voices:', voices.map(v => v.name));
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setError(null);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        setError(`Error occurred in speech synthesis: ${event.error}`);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      setError('Failed to speak text.');
      setIsSpeaking(false);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (!window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } catch (err) {
      setError('Failed to stop speaking.');
    }
  }, []);

  return {
    speak,
    stopSpeaking,
    isSpeaking,
    error
  };
}; 