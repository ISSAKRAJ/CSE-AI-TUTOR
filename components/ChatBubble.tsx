
import React from 'react';
import { ChatMessage } from '../types';
import UserIcon from './icons/UserIcon';
import BotIcon from './icons/BotIcon';
import CodeBlock from './CodeBlock';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const parts = message.content.split(/(```[\s\S]*?```)/g).filter(part => part);

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
          <BotIcon />
        </div>
      )}
      <div 
        className={`max-w-2xl p-4 rounded-lg ${
          isUser 
            ? 'bg-blue-600 rounded-br-none' 
            : 'bg-slate-800 rounded-tl-none'
        }`}
      >
        <div className="prose prose-invert prose-sm max-w-none">
            {parts.map((part, index) => {
                if (part.startsWith('```')) {
                    const codeMatch = part.match(/^```(\w*)\n([\s\S]*?)```$/);
                    if (codeMatch) {
                        const language = codeMatch[1] || 'plaintext';
                        const code = codeMatch[2];
                        return <CodeBlock key={index} language={language} code={code} />;
                    }
                }
                return <p key={index} className="whitespace-pre-wrap">{part}</p>;
            })}
        </div>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
