// src/App.js
import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const socket = new WebSocket('ws://localhost:8080');

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.onmessage = (event) => {
      const msg = event.data;
      setMessages(prev => [...prev, msg]);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() !== '') {
      socket.send(input);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className="message">{msg}</div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="input-box">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
