import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatbotPage.css';

const ChatbotPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [conversationId, setConversationId] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [currentConversationLabel, setCurrentConversationLabel] = useState('');
    const [currentConversationIndex, setCurrentConversationIndex] = useState(null);

    useEffect(() => {
        // Fetch existing conversations when component mounts
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/chat/conversations/2'); // Replace 2 with actual userId
            setConversations(response.data.conversations);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const fetchMessages = async (conversationId, index) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/chat/${conversationId}`);
            const formattedMessages = response.data.messages.flatMap(msg => [
                { role: 'user', content: msg.prompt },
                { role: 'assistant', content: msg.response }
            ]);
            setMessages(formattedMessages);
            setConversationId(conversationId);
            setCurrentConversationIndex(index);
            setCurrentConversationLabel(`Conversation ${index + 1}`);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        const newMessage = { role: 'user', content: input };
        setMessages([...messages, newMessage]);

        try {
            const response = await axios.post('http://localhost:3000/api/chat', {
                prompt: input,
                conversationId: conversationId,
            });

            const botMessage = { role: 'assistant', content: response.data.response };
            setMessages(prevMessages => [...prevMessages, botMessage]);
            setConversationId(response.data.conversationId);

            // If it's a new conversation, fetch the updated list of conversations
            if (!conversationId) {
                fetchConversations();
                setCurrentConversationIndex(conversations.length); // Set the new conversation index
                setCurrentConversationLabel(`Conversation ${conversations.length + 1}`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput('');
    };

    const handleNewConversation = async () => {
        setConversationId(null);
        setMessages([]);
        try {
            const response = await axios.post('http://localhost:3000/api/chat/new', { userId: 2 }); // Replace 2 with actual userId
            const newConversationId = response.data.conversationId;
            setConversationId(newConversationId);
            setCurrentConversationIndex(conversations.length); // Set the new conversation index
            setCurrentConversationLabel(`Conversation ${conversations.length + 1}`);
            fetchConversations();
        } catch (error) {
            console.error('Error starting new conversation:', error);
        }
    };

    return (
        <>
        <div className='headerSpace' id='tempHeader'></div>
        <div className='chatTile'>
            <h1>Welcome back!</h1></div>
        <div className="chatbotContainer">
            <div className="sidebar">
                <h2>Chatbot</h2>
                <ul>
                    {conversations.map((conv, index) => (
                        <li key={conv.conversationId} onClick={() => fetchMessages(conv.conversationId, index)}>
                            Conversation {index + 1}
                        </li>
                    ))}
                </ul>
                <button onClick={handleNewConversation}>Start New Conversation</button>
            </div>
            <div className="chatArea">
                <h2>{currentConversationLabel}</h2>
                <div className="messageContainer">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.role}`}>
                            {message.content}
                        </div>
                    ))}
                </div>
                <div className="inputContainer">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSendMessage();
                        }}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
        </>
    );
};

export default ChatbotPage;
