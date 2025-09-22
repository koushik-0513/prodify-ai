import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { MessageSquare, Trash2 } from "lucide-react";

import { Chat } from "../../types/types";

interface ChatSidebarProps {
  onChatSelect?: (chatId: string) => void;
  selectedChatId?: string;
}

export const ChatSidebar = ({
  onChatSelect,
  selectedChatId,
}: ChatSidebarProps) => {
  const [activeChat, setActiveChat] = useState(selectedChatId || "");
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  // Utility function to safely format date
  const formatDate = (date: Date | string): string => {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      return dateObj.toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return "--/--/----";
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/chat/get`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setChatHistory(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setChatHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  // Update active chat when prop changes
  useEffect(() => {
    if (selectedChatId) {
      setActiveChat(selectedChatId);
    }
  }, [selectedChatId]);

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    if (onChatSelect) {
      onChatSelect(chatId);
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/chat/delete`,
        {
          method: "DELETE",
          body: JSON.stringify({ chatId: chatId }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Remove the deleted chat from the local state
        setChatHistory((prevChats) =>
          prevChats.filter((chat) => chat._id !== chatId)
        );

        // If the deleted chat was active, clear the selection
        if (activeChat === chatId) {
          setActiveChat("");
        }
      } else {
        console.error("Failed to delete chat");
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white/90 p-4 shadow-lg backdrop-blur-md">
        <div className="text-gray-500">Loading chats...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="h-full w-full bg-white/90 p-4 shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Header with New Chat button */}
      <motion.div
        className="mb-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <motion.h2
          className="text-lg font-semibold text-gray-800"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Chat History
        </motion.h2>
      </motion.div>

      {/* Chat History List */}
      <div className="space-y-2">
        {chatHistory.map((chat: Chat, index: number) => (
          <motion.div
            key={chat._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3 + index * 0.1,
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className={`group cursor-pointer rounded-lg p-3 transition-all duration-200 ${
              activeChat === chat._id
                ? "bg-accent-purple/10 border-accent-purple/20 border"
                : "border border-transparent hover:bg-gray-50"
            }`}
            onClick={() => handleChatSelect(chat._id)}
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <motion.h3
                  className={`truncate text-sm font-medium ${
                    activeChat === chat._id
                      ? "text-accent-purple"
                      : "text-gray-900"
                  }`}
                >
                  {chat.title || `Chat ${index + 1}`}
                </motion.h3>
                <motion.p
                  className={`mt-1 truncate text-xs ${
                    activeChat === chat._id
                      ? "text-accent-purple/70"
                      : "text-gray-500"
                  }`}
                >
                  {chat.lastMessage || "No messages yet"}
                </motion.p>
                <motion.span
                  className={`mt-1 block text-xs ${
                    activeChat === chat._id
                      ? "text-accent-purple/60"
                      : "text-gray-400"
                  }`}
                >
                  {chat.timestamp || formatDate(chat.createdAt)}
                </motion.span>
              </div>

              {/* Delete button */}
              <motion.button
                className={`rounded p-1 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 ${
                  activeChat === chat._id ? "opacity-100" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent chat selection when clicking delete
                  handleDeleteChat(chat._id);
                }}
              >
                <Trash2 size={14} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state when no chats */}
      {chatHistory.length === 0 && (
        <motion.div
          className="flex flex-col items-center justify-center py-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <motion.div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <MessageSquare size={24} className="text-gray-400" />
          </motion.div>
          <h3 className="mb-2 text-sm font-medium text-gray-900">
            No chats yet
          </h3>
          <p className="text-xs text-gray-500">
            Start a new conversation to get started
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
