import React, { useState } from 'react';
import { FiSend, FiPlus, FiX } from 'react-icons/fi';

const AIChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I assist you today?", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      setMessages([...messages, { text: inputValue, isUser: true }]);
      
      // Add AI response (simulated)
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Sure :)", isUser: false }]);
      }, 500);
      
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Ask Atom</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX size={20} />
        </button>
      </div>
      
      {/* Messages */}
      <div className="h-[calc(100%-120px)] overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type Here"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            <FiSend size={18} />
          </button>
          <button className="ml-2 bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
            <FiPlus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel;