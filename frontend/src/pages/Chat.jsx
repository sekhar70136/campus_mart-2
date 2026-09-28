import { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';

const Chat = () => {
  const { sellerId } = useParams(); const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]); const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);
  const receiverId = Number(sellerId);

  useEffect(() => {
    if (!user || !receiverId) return undefined;

    const socket = io('https://campus-mart-2-3bbb.onrender.com/', { auth: { userId: user.id } });
    socketRef.current = socket;
    socket.on('new-message', (message) => {
      if ((message.senderId === user.id && message.receiverId === receiverId) ||
          (message.senderId === receiverId && message.receiverId === user.id)) {
        setMessages((currentMessages) => [...currentMessages, message]);
      }
    });

    api.get(`/messages/${receiverId}`).then(res => setMessages(res.data)).catch(console.error);
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [receiverId, user]);

  const sendMessage = async (e) => {
    e.preventDefault(); if (!newMessage.trim()) return;
    if (!receiverId) return alert('Open chat from a product page first');
    try {
      if (!socketRef.current?.connected) return alert('Chat connection is not ready');
      socketRef.current.emit('send-message', { receiverId, text: newMessage });
      setNewMessage('');
    } catch (err) { alert('Failed to send'); }
  };

  if (!user) return <div className="text-center py-20">Please login to chat</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24 pt-4 flex flex-col h-screen animate-fade-in">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      {!receiverId && <p className="text-gray-500 mb-4">Open chat from a product page to message the seller.</p>}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-white rounded-2xl shadow-sm mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.senderId === user.id ? 'self-end bg-primary text-gray-800' : 'self-start bg-gray-100 text-gray-800'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input type="text" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} disabled={!receiverId} className="flex-1 p-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100" />
        <button type="submit" disabled={!receiverId} className="bg-primary text-gray-800 px-6 rounded-xl font-semibold hover:bg-primary-dark transition disabled:opacity-50">Send</button>
      </form>
    </div>
  );
};

export default Chat;