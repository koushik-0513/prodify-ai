import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Plus, Trash2 } from "lucide-react";

export const ChatSidebar = () => {
  const [activeChat, setActiveChat] = useState('chat-1');
  
  // Mock chat history data
  const chatHistory = [
    { id: 'chat-1', title: 'Project Discussion', lastMessage: 'How is the progress going?', timestamp: '2 min ago' },
    { id: 'chat-2', title: 'Design Review', lastMessage: 'The new layout looks great!', timestamp: '1 hour ago' },
    { id: 'chat-3', title: 'Bug Report', lastMessage: 'Issue has been resolved', timestamp: '3 hours ago' },
    { id: 'chat-4', title: 'Team Meeting', lastMessage: 'Meeting scheduled for tomorrow', timestamp: '1 day ago' },
    { id: 'chat-5', title: 'Feature Request', lastMessage: 'New feature added to roadmap', timestamp: '2 days ago' },
  ];

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
        <motion.button
          className="flex items-center gap-2 rounded-lg bg-accent-purple px-3 py-2 text-sm font-medium text-white shadow-sm"
          whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Plus size={16} />
          New Chat
        </motion.button>
      </motion.div>
      
      {/* Chat History List */}
      <div className="space-y-2">
        {chatHistory.map((chat, index) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: 0.3 + index * 0.1, 
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className={`group cursor-pointer rounded-lg p-3 transition-all duration-200 ${
              activeChat === chat.id
                ? 'bg-accent-purple/10 border border-accent-purple/20'
                : 'hover:bg-gray-50 border border-transparent'
            }`}
            onClick={() => setActiveChat(chat.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <motion.h3 
                  className={`text-sm font-medium truncate ${
                    activeChat === chat.id ? 'text-accent-purple' : 'text-gray-900'
                  }`}
                >
                  {chat.title}
                </motion.h3>
                <motion.p 
                  className={`text-xs truncate mt-1 ${
                    activeChat === chat.id ? 'text-accent-purple/70' : 'text-gray-500'
                  }`}
                >
                  {chat.lastMessage}
                </motion.p>
                <motion.span 
                  className={`text-xs mt-1 block ${
                    activeChat === chat.id ? 'text-accent-purple/60' : 'text-gray-400'
                  }`}
                >
                  {chat.timestamp}
                </motion.span>
              </div>
              
              {/* Delete button */}
              <motion.button
                className={`opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 ${
                  activeChat === chat.id ? 'opacity-100' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
            className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <MessageSquare size={24} className="text-gray-400" />
          </motion.div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">No chats yet</h3>
          <p className="text-xs text-gray-500">Start a new conversation to get started</p>
        </motion.div>
      )}
    </motion.div>
  );
};
