import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, User } from "lucide-react";

import {
  ChatMessage,
  ChatStreamChunk,
  UpdateChatRequest,
} from "../../types/types";
import { ChatHeader } from "./chat-header";

interface ChatPageProps {
  chatId?: string;
  onChatSelect?: (chatId: string) => void;
  onNewChat?: () => void;
}

export const ChatPage = ({
  chatId,
  onChatSelect,
  onNewChat,
}: ChatPageProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Utility function to safely format timestamp
  const formatTimestamp = (timestamp: Date | string): string => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "--:--";
    }
  };

  // Load existing messages when chatId changes
  useEffect(() => {
    if (chatId) {
      console.log("ChatPage: Loading chat with ID:", chatId);
      setShowLoadingIndicator(false); // Reset loading indicator
      loadChatMessages(chatId);
    } else {
      // Clear messages when no chat is selected
      console.log("ChatPage: No chat ID, clearing messages");
      setMessages([]);
      setShowLoadingIndicator(false); // Reset loading indicator
    }
  }, [chatId]);

  // Load existing messages for a chat
  const loadChatMessages = async (chatId: string) => {
    try {
      console.log("Loading messages for chat:", chatId);

      // Show loading indicator after a small delay to avoid flickering
      const loadingTimeout = setTimeout(() => {
        setShowLoadingIndicator(true);
      }, 300);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/getbyid`,
        {
          method: "POST",
          body: JSON.stringify({ chatId: chatId }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Clear the timeout if we get a response quickly
      clearTimeout(loadingTimeout);
      setShowLoadingIndicator(false);

      if (response.ok) {
        const chatData = await response.json();
        console.log("Chat data received:", chatData);
        if (chatData.messages && chatData.messages.length > 0) {
          console.log("Setting messages:", chatData.messages);
          // Convert timestamp strings to Date objects
          const messagesWithDates = chatData.messages.map(
            (msg: ChatMessage) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })
          );
          setMessages(messagesWithDates);
        } else {
          console.log("No messages found, setting empty array");
          setMessages([]);
        }
      } else {
        console.log("Response not ok, setting empty messages");
        setMessages([]);
      }
    } catch (error) {
      console.error("Error loading chat messages:", error);
      setMessages([]);
    } finally {
      setShowLoadingIndicator(false);
    }
  };

  // Create new chat
  const handleCreateNewChat = async () => {
    try {
      const userId = "mock-user-id-123";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create chat");
      }

      const data = await response.json();
      console.log("New chat created:", data);

      // Select the new chat
      if (onChatSelect) {
        onChatSelect(data.chatId);
      }

      // Call the parent's new chat handler
      if (onNewChat) {
        onNewChat();
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle sending message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!inputValue.trim()) return;

    // Check if we have a valid chat ID
    if (!chatId) {
      console.error("No chat ID available");
      return;
    }

    const userMessage: ChatMessage = {
      _id: Date.now().toString(),
      content: inputValue.trim(),
      role: "user",
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Create bot message placeholder
      const botMessageId = (Date.now() + 1).toString();
      const botMessage: ChatMessage = {
        _id: botMessageId,
        content: "",
        role: "assistant",
        timestamp: new Date(),
      };

      // Add bot message to chat
      setMessages((prev) => [...prev, botMessage]);

      // Prepare messages for AI (including the new user message)
      const messagesForAI = [...messages, userMessage];

      // Call backend to get AI response
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: chatId,
            botMessageId: botMessageId,
            messages: messagesForAI,
          } as UpdateChatRequest),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data: ChatStreamChunk = JSON.parse(line.slice(6));

              if (data.type === "chunk" && data.content) {
                fullContent += data.content;
                // Update bot message with partial content
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg._id === botMessageId
                      ? { ...msg, content: fullContent }
                      : msg
                  )
                );
              } else if (data.type === "complete" && data.fullContent) {
                // Final update with complete content
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg._id === botMessageId
                      ? { ...msg, content: data.fullContent! }
                      : msg
                  )
                );
                setIsTyping(false);
                return;
              }
            } catch (error) {
              console.error("Error parsing chunk:", error);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);

      // Remove the bot message on error
      setMessages((prev) =>
        prev.filter((msg) => msg._id !== (Date.now() + 1).toString())
      );

      // Add error message
      const errorMessage: ChatMessage = {
        _id: Date.now().toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Don't show full loading screen - just show loading indicator in messages area

  // Show empty state when no chat is selected
  if (!chatId) {
    return (
      <motion.div
        className="flex h-[500px] w-96 flex-col overflow-hidden rounded-2xl bg-white/95 shadow-xl backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <ChatHeader onChatSelect={onChatSelect} selectedChatId={chatId} />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mb-2 text-gray-400">🤖</div>
            <div className="mb-4 text-sm text-gray-500">
              Click "Create New Chat" to start a conversation
            </div>
            <motion.button
              onClick={handleCreateNewChat}
              className="bg-accent-purple hover:bg-accent-purple/90 rounded-lg px-4 py-2 text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create New Chat
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Show empty chat when chat exists but has no messages
  if (messages.length === 0) {
    return (
      <motion.div
        className="flex h-[500px] w-96 flex-col overflow-hidden rounded-2xl bg-white/95 shadow-xl backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <ChatHeader onChatSelect={onChatSelect} selectedChatId={chatId} />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mb-2 text-gray-400">💬</div>
            <div className="text-sm text-gray-500">
              Start typing to begin the conversation
            </div>
          </div>
        </div>
        {/* Input area for empty chat */}
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
              className="focus:ring-accent-purple/50 w-full rounded-full border-0 bg-gray-100 py-3 pr-12 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-0 focus:outline-none"
              whileFocus={{
                scale: 1.02,
                boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />

            <div className="absolute right-2 flex items-center gap-1">
              <motion.button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-accent-purple rounded-full p-1.5 text-white disabled:cursor-not-allowed disabled:opacity-50"
                whileHover={{
                  scale: inputValue.trim() ? 1.1 : 1,
                  boxShadow: inputValue.trim()
                    ? "0 4px 12px rgba(139, 92, 246, 0.3)"
                    : "none",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                title="Send message"
              >
                <Send
                  size={20}
                  className="-translate-x-[1px] translate-y-[1px]"
                />
              </motion.button>
            </div>
          </div>
        </motion.form>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex h-[500px] w-96 flex-col overflow-hidden rounded-2xl bg-white/95 shadow-xl backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <ChatHeader onChatSelect={onChatSelect} selectedChatId={chatId} />

      {/* Messages container */}
      <motion.div
        className="flex-1 space-y-3 overflow-y-auto bg-gray-50/30 p-4"
        layout
      >
        {/* Loading indicator for chat switching - only show if we have a chatId */}
        {showLoadingIndicator && chatId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex justify-center py-2"
          >
            <motion.div
              className="flex items-center gap-2 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="border-t-accent-purple h-3 w-3 rounded-full border-2 border-gray-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Loading messages...
            </motion.div>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: index * 0.1,
              }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex max-w-[85%] items-end gap-2">
                {message.role === "assistant" && (
                  <motion.div
                    className="from-accent-purple to-accent-cyan flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                  >
                    <Bot size={16} className="text-white" />
                  </motion.div>
                )}

                <motion.div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-accent-purple rounded-br-md text-white"
                      : "rounded-bl-md border border-gray-100 bg-white text-gray-800 shadow-sm"
                  }`}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <motion.span
                    className={`mt-2 block text-xs ${
                      message.role === "user"
                        ? "text-white/70"
                        : "text-gray-400"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {formatTimestamp(message.timestamp)}
                  </motion.span>
                </motion.div>

                {message.role === "user" && (
                  <motion.div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
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
                <div className="from-accent-purple to-accent-cyan flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br">
                  <Bot size={16} className="text-white" />
                </div>
                <motion.div
                  className="rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3 shadow-sm"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="flex items-center gap-1">
                    <motion.div
                      className="h-2 w-2 rounded-full bg-gray-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="h-2 w-2 rounded-full bg-gray-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="h-2 w-2 rounded-full bg-gray-400"
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
      </motion.div>

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
            className="focus:ring-accent-purple/50 w-full rounded-full border-0 bg-gray-100 py-3 pr-12 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-0 focus:outline-none"
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />

          <div className="absolute right-2 flex items-center gap-1">
            <motion.button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-accent-purple rounded-full p-1.5 text-white disabled:cursor-not-allowed disabled:opacity-50"
              whileHover={{
                scale: inputValue.trim() ? 1.1 : 1,
                boxShadow: inputValue.trim()
                  ? "0 4px 12px rgba(139, 92, 246, 0.3)"
                  : "none",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              title="Send message"
            >
              <Send
                size={20}
                className="-translate-x-[1px] translate-y-[1px]"
              />
            </motion.button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};
