import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { CreateChatRequest, CreateChatResponse } from "../../types/types";
import { ChatSidebar } from "./chat-sidebar";

interface ChatHeaderProps {
  onChatSelect?: (chatId: string) => void;
  selectedChatId?: string;
}

export const ChatHeader = ({
  onChatSelect,
  selectedChatId,
}: ChatHeaderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNewChat = async () => {
    try {
      // For now, using a mock userId - in a real app this would come from auth context
      const userId = uuidv4();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId } as CreateChatRequest),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create chat");
      }

      const data: CreateChatResponse = await response.json();
      console.log("New chat created:", data);

      // Select the new chat
      if (onChatSelect) {
        onChatSelect(data.chatId);
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 z-40 h-screen w-64"
            >
              <ChatSidebar
                onChatSelect={onChatSelect}
                selectedChatId={selectedChatId}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      <motion.div
        className="flex w-full items-center justify-between rounded-lg bg-white/80 p-3 backdrop-blur-md"
        whileHover={{
          scale: 1.01,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="group relative rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <motion.div
              animate={{ rotate: isSidebarOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </motion.div>
          </motion.button>
          <motion.h1
            className="text-lg font-semibold text-gray-800"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            chat
          </motion.h1>
        </div>

        <motion.button
          className="bg-accent-purple flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white shadow-sm"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={handleNewChat}
        >
          <Plus size={16} />
          new chat
        </motion.button>
      </motion.div>
    </div>
  );
};
