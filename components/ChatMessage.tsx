
import React from 'react';
import { type Message } from '../types';

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const BotIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const wrapperClasses = isUser ? 'flex justify-end' : 'flex justify-start';
  const bubbleClasses = isUser 
    ? 'bg-sky-600 text-white rounded-t-lg rounded-bl-lg' 
    : 'bg-gray-200 text-slate-800 rounded-t-lg rounded-br-lg';
  const iconWrapperClasses = isUser ? 'bg-sky-600' : 'bg-gray-200 border border-gray-300';
  const iconContainerOrder = isUser ? 'order-last' : 'order-first';

  return (
    <div className={`${wrapperClasses} items-end gap-3`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconWrapperClasses} ${iconContainerOrder}`}>
            {isUser ? <UserIcon /> : <BotIcon />}
        </div>
        <div 
            className={`p-3 max-w-xl md:max-w-2xl whitespace-pre-wrap ${bubbleClasses}`}
        >
            {message.text}
        </div>
    </div>
  );
};

export default ChatMessage;
