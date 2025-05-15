import React, { useState, useRef } from 'react';
import { HiOutlinePaperClip } from 'react-icons/hi2';
import { FiPlus, FiSend } from "react-icons/fi";
import { HiX, HiOutlineDotsVertical } from "react-icons/hi";

const AIChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I assist you today?", isUser: false },
    { text: "Help me by summarizing a document", isUser: true },
    { text: "Sure :)", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  const [showOptions, setShowOptions] = useState(false);

  const handlePlusClick = () => {
    setShowOptions(!showOptions);
  };


  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You can display filename or upload it
      setMessages([...messages, { text: `📎 Attached: ${file.name}`, isUser: true }]);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isUser: true }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Sure :)", isUser: false }]);
      }, 500);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 border-l border-gray-200 
      transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

      {/* Header */}

      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <span className="w-4 h-4 bg-[#F53E47] rounded-full" />
          Ask Atom
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-700">
            <HiOutlineDotsVertical size={18} />
          </button>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <HiX size={20} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col h-[calc(100%-110px)] overflow-y-auto px-4 py-3 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative max-w-xs px-4 py-2 rounded-xl text-sm 
              ${message.isUser ? 'bg-[#2c3e50] text-white rounded-br-none' : 'bg-[#f44336] text-white rounded-bl-none'}`}>
              {message.text}
              <span className="absolute bottom-0 w-2 h-2 rounded-full 
                ${message.isUser ? 'right-[-10px] bg-[#2c3e50]' : 'left-[-10px] bg-[#f44336]'}" />
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t px-4 py-3 bg-[#f8f4f4] relative">

        <div className="flex items-center gap-3">
          <button onClick={handleFileClick} className="text-gray-500 hover:text-gray-700">
            <HiOutlinePaperClip size={20} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button onClick={handlePlusClick} className="text-gray-500 hover:text-gray-700">
            <FiPlus size={20} />
          </button>
          {showOptions && (
            <div className="absolute bottom-16 left-4 bg-white shadow-md rounded-md border text-sm z-10">
              <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left" onClick={() => setInputValue("What can you do?")}>
                Ask for Help
              </button>
              <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left" onClick={() => setInputValue("Summarize this document")}>
                Summarize Doc
              </button>
            </div>
          )}

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type Here"
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-5 bottom-3 bg-[#2c3e50] text-white p-2 rounded-full hover:bg-[#1b2836] transition"
          >
            <FiSend size={16} />
          </button>
        </div>


      </div>
    </div>
  );

};

export default AIChatPanel;
