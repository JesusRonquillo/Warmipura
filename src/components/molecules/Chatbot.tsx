import React, { useState, useRef, useEffect } from 'react';
import { chatService } from '../../services/chatService';
import { cn } from '../../utils';
import DudaAsombro from '../../assets/icons/Personaje/Duda Asombro.svg';
import { AppIcon } from '../atoms/AppIcon';

// Definir la interfaz directamente aquí para evitar problemas de importación
interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: '¡Hola! Soy Puma Chaski, tu asistente virtual de Warmipura. ¿En qué puedo ayudarte hoy?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus en el input cuando se abre el chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(message);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hay un problema técnico. Por favor, intenta de nuevo.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (quickReply: string) => {
    handleSendMessage(quickReply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-2 sm:p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chat Window */}
      <div className="relative w-full max-w-md h-[85vh] sm:h-[600px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col chatbot-container">
        {/* Header del Chatbot */}
        <div className="bg-gradient-to-r from-digital-primary via-digital-primary to-digital-primary text-white p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <img src={DudaAsombro} alt="Puma Chaski Icon" className="w-12 h-12" />
            <div>
              <h3 className="font-bold text-lg">Puma Chaski</h3>
              <p className="text-xs opacity-90 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                En línea
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
          >
            <AppIcon icon="lucide:x" className="w-5 h-5" />
          </button>
        </div>

        {/* Messages - Área flexible que se expande */}
        <div className="flex-1 p-4 overflow-y-auto min-h-0 chatbot-messages">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-xs sm:max-w-sm px-4 py-3 rounded-2xl shadow-sm",
                    message.isUser
                      ? "bg-gradient-to-r from-digital-primary to-digital-primary text-white rounded-br-md"
                      : "bg-gray-50 text-gray-800 rounded-bl-md border border-gray-100"
                  )}
                >
                  <p className="text-sm leading-relaxed chatbot-message break-words">{message.text}</p>
                  <p className={cn(
                    "text-xs mt-2",
                    message.isUser ? "text-white/70" : "text-gray-400"
                  )}>
                    {message.timestamp.toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 text-gray-800 rounded-2xl rounded-bl-md px-4 py-3 border border-gray-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Replies - Solo se muestra en el primer mensaje */}
        {messages.length === 1 && (
          <div className="px-4 pb-3 flex-shrink-0">
            <div className="flex flex-wrap gap-2">
              {chatService.getQuickReplies().map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-2 bg-gradient-to-r from-digital-primary/20 to-digital-base hover:from-digital-primary/30 hover:to-digital-primary text-digital-primary text-xs sm:text-sm rounded-full transition-all duration-200 border border-digital-primary hover:border-digital-primary shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input - Área fija en la parte inferior */}
        <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-digital-primary/10 flex-shrink-0">
          <div className="flex space-x-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-digital-primary focus:border-transparent text-sm bg-white shadow-sm"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-3 bg-gradient-to-r from-digital-primary to-digital-primary hover:from-digital-primary/90 hover:to-digital-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg rounded-2xl text-white"
            >
              <AppIcon icon="lucide:send" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 