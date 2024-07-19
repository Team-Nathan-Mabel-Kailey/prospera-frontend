import React, { useState, useEffect } from 'react';
import './ChatbotPage.css';

const ChatbotPage = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch conversations on component mount
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await fetch('/api/chat/conversations/2'); // Replace '2' with the actual user ID
            const data = await response.json();
            setConversations(data.conversations);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const fetchChatHistory = async (conversationId) => {
        try {
            const response = await fetch(`/api/chat/${conversationId}`);
            const data = await response.json();
            setMessages(data.messages);
            setSelectedConversationId(conversationId);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    const sendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: newMessage,
                    conversationId: selectedConversationId,
                }),
            });
            const data = await response.json();
            setMessages([...messages, { role: 'user', content: newMessage }, { role: 'assistant', content: data.response }]);
            setNewMessage('');
            if (!selectedConversationId) {
                setSelectedConversationId(data.conversationId);
                fetchConversations();
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chatbotContainer">
            <div className="sidebar">
                <h2>Conversations</h2>
                <ul>
                    {conversations.map((conv) => (
                        <li key={conv.conversationId} onClick={() => fetchChatHistory(conv.conversationId)}>
                            Conversation {conv.conversationId}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chatArea">
                <h2>Chat</h2>
                <div className="messageContainer">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.role}`}>
                            {msg.content}
                        </div>
                    ))}
                </div>
                <div className="inputContainer">
                    <input
                        type="text"
                        placeholder="Type your message here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;
