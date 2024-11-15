'use client';
import React from 'react';
import DOMPurify from 'dompurify';
import ReactMarkdown from 'react-markdown';
import { useChatContext } from './ChatProvider';

const ShowChat = () => {
  const { chats } = useChatContext();

  const sanitizeMarkdown = (markdown: string) => {
    return DOMPurify.sanitize(markdown);
  };

  return (
    <div className="w-full space-y-4 px-4 mb-8">
      {chats.map((chat) => (
        <div key={chat.id} className="space-y-4">
          <div
            dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(chat.message) }}
            className="px-4 py-2 bg-indigo-600 w-fit ml-auto text-white rounded shadow-lg"
          />
          <div className="px-4 py-2 bg-gray-100 rounded-xl shadow-xl">
            <ReactMarkdown>
              {sanitizeMarkdown(chat.replayMessage)}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowChat;
