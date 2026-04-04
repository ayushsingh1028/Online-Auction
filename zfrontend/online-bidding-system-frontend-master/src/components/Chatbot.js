import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css'; // We'll create this CSS file next

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Determines context based on URL, primitive but works for MVP
      const currentPage = window.location.pathname.includes("product") ? "product page" 
                        : window.location.pathname.includes("dashboard") ? "dashboard" 
                        : "homepage";
      
      // Role is harder without auth context, defaulting to guest
      // In a real app, you'd pull this from LocalStorage or Redux
      const userRole = localStorage.getItem("userRole") || "guest";

      const response = await axios.post("http://localhost:9090/api/chatbot/ask", {
        user_query: userMessage.text,
        user_role: userRole,
        current_page: currentPage
      });

      const botReply = response.data.reply;
      const actions = response.data.suggested_actions;

      const botMessage = { text: botReply, sender: "bot", actions: actions };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [...prev, { text: "Sorry, I'm having trouble connecting right now.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleActionClick = (action) => {
      // Simple handling of actions
      if (action.includes("Register")) window.location.href = "/register";
      else if (action.includes("Login")) window.location.href = "/login";
      else if (action.includes("Live Auctions")) window.location.href = "/products"; // Assuming this route
      else if (action.includes("Dashboard")) window.location.href = "/user/dashboard"; // Assuming this route
      else {
          setInput(action); // Just put action text in input if no direct link
      }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={toggleChat}>
          💬 Chat with AI
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Assistant</span>
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-text">{msg.text}</div>
                {msg.actions && (
                    <div className="message-actions">
                        {msg.actions.map((action, idx) => (
                            <button key={idx} className="action-chip" onClick={() => handleActionClick(action)}>
                                {action}
                            </button>
                        ))}
                    </div>
                )}
              </div>
            ))}
            {loading && <div className="message bot"><div className="typing-indicator">...</div></div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSend} disabled={loading}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
