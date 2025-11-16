
import React, { useState, useEffect, useCallback } from 'react';
import { type Message } from './types';
import { createChatSession } from './services/geminiService';
import { type Chat } from '@google/genai';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Initialize the chat session when the component mounts
    const session = createChatSession();
    setChatSession(session);
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!chatSession || !text.trim()) return;

    const userMessage: Message = { role: 'user', text };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage(text);
      const modelResponse = result.text;
      const modelMessage: Message = { role: 'model', text: modelResponse };
      setMessages(prevMessages => [...prevMessages, modelMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [chatSession]);
  
  const startNewChat = () => {
    const session = createChatSession();
    setChatSession(session);
    setMessages([]);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Header onNewChat={startNewChat} />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto h-full">
          {messages.length === 0 && !isLoading ? (
            <WelcomeScreen onSendMessage={handleSendMessage} />
          ) : (
            <ChatHistory messages={messages} isLoading={isLoading} />
          )}
        </div>
      </main>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
