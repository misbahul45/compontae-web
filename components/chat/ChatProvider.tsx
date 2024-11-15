// ChatContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Chat {
  id: number;
  message: string;
  replayMessage: string;
}

interface ChatContextType {
  chats: Chat[];
  addChat: (message: string, replayMessage: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addChat = (message: string, replayMessage: string) => {
    const newChat: Chat = {
      id: new Date().getTime(),
      message,
      replayMessage,
    };
    setChats((prevChats) => [...prevChats, newChat]);
  };

  return (
    <ChatContext.Provider value={{ chats, addChat, loading, setLoading }}>
      {children}
    </ChatContext.Provider>
  );
};
