
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage } from './types';
import { sendMessageToAI } from './services/geminiService';
import Header from './components/Header';
import ChatBubble from './components/ChatBubble';
import InputArea from './components/InputArea';
import Loader from './components/Loader';
import BotIcon from './components/icons/BotIcon';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: "Hello! I am your CSE AI Tutor. Ask me any question about core computer science or engineering subjects, such as data structures, algorithms, operating systems, or computer architecture. I'll do my best to provide a detailed explanation.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const history = messages.map(msg => ({ role: msg.role, parts: [{ text: msg.content }] }));
      const aiResponse = await sendMessageToAI(inputText, history);
      
      const modelMessage: ChatMessage = { role: 'model', content: aiResponse };
      setMessages((prevMessages) => [...prevMessages, modelMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Sorry, something went wrong. ${errorMessage}`);
      const errorBubble: ChatMessage = { role: 'model', content: `Sorry, something went wrong. Please check your connection or API key and try again. Error: ${errorMessage}` };
      setMessages((prevMessages) => [...prevMessages, errorBubble]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 font-sans">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                  <BotIcon />
              </div>
              <div className="flex items-center space-x-2 bg-slate-800 p-4 rounded-lg rounded-tl-none">
                  <Loader />
                  <span className="text-slate-400 animate-pulse">Tutor is thinking...</span>
              </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>
      {error && <div className="p-4 text-center text-red-400 bg-red-900/50">{error}</div>}
      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
