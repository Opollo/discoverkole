
import React, { useEffect, useRef } from 'react';
import { type Message } from '../types';
import ChatMessage from './ChatMessage';

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex items-center space-x-2 animate-pulse self-start">
      <div className="w-2 h-2 bg-slate-500 rounded-full" style={{ animationDelay: '0s' }}></div>
      <div className="w-2 h-2 bg-slate-500 rounded-full" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-slate-500 rounded-full" style={{ animationDelay: '0.4s' }}></div>
    </div>
);

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
      {isLoading && (
        <div className="flex justify-start items-end gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 border border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </div>
             <div className="bg-gray-200 text-black p-3 rounded-t-lg rounded-br-lg max-w-prose self-start flex items-center">
                <LoadingIndicator />
            </div>
        </div>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatHistory;
