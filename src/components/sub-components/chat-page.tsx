import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, Mic, Bot, User } from "lucide-react";
import { ChatHeader } from "./chat-header";

export const ChatPage = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your AI assistant. How can I help you today?", 
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newUserMessage = { 
      id: Date.now(), 
      text: inputValue, 
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot response with more realistic responses
    setTimeout(() => {
      const botResponses = [
        "That's interesting! Tell me more about that.",
        "I understand what you're saying. How can I assist you further?",
        "Great question! Let me think about that for a moment.",
        "I see what you mean. What would you like to explore next?",
        "That's a good point. Would you like me to elaborate on any specific aspect?",
        "I'm here to help! What's your next question?",
        "Thanks for sharing that. How can I make this easier for you?",
        "I'm following along. What would you like to focus on?"
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const newBotMessage = { 
        id: Date.now() + 1, 
        text: randomResponse, 
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  return (
    <motion.div 
      className="flex h-[500px] w-96 flex-col overflow-hidden rounded-2xl bg-white/95 shadow-xl backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <ChatHeader />
      
      {/* Messages container */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4 bg-gray-50/30">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                delay: index * 0.1 
              }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-end gap-2 max-w-[85%]">
                {message.sender === 'bot' && (
                  <motion.div 
                    className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Bot size={16} className="text-white" />
                  </motion.div>
                )}
                
                <motion.div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-accent-purple text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <motion.span 
                    className={`text-xs mt-2 block ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {message.timestamp}
                  </motion.span>
                </motion.div>
                
                {message.sender === 'user' && (
                  <motion.div 
                    className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <User size={16} className="text-gray-600" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-end gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <motion.div 
                  className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="flex items-center gap-1">
                    <motion.div 
                      className="h-2 w-2 bg-gray-400 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="h-2 w-2 bg-gray-400 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="h-2 w-2 bg-gray-400 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <motion.form 
        onSubmit={handleSendMessage} 
        className="border-t border-gray-200 bg-white/80 p-4 backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="relative flex items-center">
          <motion.input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full rounded-full border-0 bg-gray-100 py-3 pl-10 pr-12 text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-0 focus:outline-none"
            whileFocus={{ 
              scale: 1.02,
              boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
          
          <div className="absolute right-2 flex items-center gap-1">
            <motion.button
              type="submit"
              disabled={!inputValue.trim()}
              className="rounded-full bg-accent-purple p-1.5 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ 
                scale: inputValue.trim() ? 1.1 : 1,
                boxShadow: inputValue.trim() ? "0 4px 12px rgba(139, 92, 246, 0.3)" : "none"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              title="Send message"
            >
              <Send size={20} className="-translate-x-[1px] translate-y-[1px]" />
            </motion.button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};
