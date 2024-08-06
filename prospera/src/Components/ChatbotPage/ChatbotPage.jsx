import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import './ChatbotPage.css';
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'ldrs/ring';
import { waveform } from 'ldrs'

waveform.register()

const ChatbotPage = () => {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageContainerRef = useRef(null);
    const logInRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    let BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        console.log("islogged", isLoggedIn);
        if (logInRef.current) {
            if (!isLoggedIn) {
                navigate('/login');
                return;
            }
            
            if(user && user.userID) {
                console.log("user is: ", user.userID)
    
                fetchConversations(user.userID);
            }
        } else {
            logInRef.current = true;
        }

    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (selectedConversationId && user && user.userID) {
            fetchChatHistory(selectedConversationId);
        }
    }, [selectedConversationId, user]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    const fetchConversations = async (userId) => {
        console.log("userId in fetchConversations is: ", userId)
        // console.log("user is: ", user)
        // if (!user || !user.userID) return;
        // if (!userId) return;
        try {
            const response = await axios.get(`${BASE_URL}/api/chat/conversations/${userId}`);
            console.log('conversations data:', response.data);
            setConversations(response.data.conversations);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const fetchChatHistory = async (conversationId) => {
        // if (!user || !user.userID) {
        //     console.error('Cannot fetch chat history: User not loaded or missing userID');
        //     return;
        // }
        try {
            console.log("FE user.userID: ", user.userID)
            console.log("FE conversationId: ", conversationId);
            
            const response = await axios.get(`${BASE_URL}/api/chat/chathistory/${user.userID}/conversations/${conversationId}`);
            console.log("Fetching chat history from URL:", response);
            const formattedMessages = response.data.messages.flatMap(msg => [
                { role: 'user', content: msg.prompt },
                { role: 'assistant', content: msg.response }
            ]);
            setMessages(formattedMessages);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    const sendMessage = async () => {
        if (newMessage.trim() === '' || !user || !user.userID) {
            console.error('Cannot send message: User not loaded or missing userID');
            return;
        }
    
        const tempId = Date.now(); // Temporary ID for the loading message
        setMessages(prev => [...prev, 
            { role: 'user', content: newMessage },
            { role: 'loading', id: tempId } // Add loading message
        ]);
        setNewMessage('');
        scrollToBottom();
    
        try {
            const response = await axios.post(`${BASE_URL}/api/chat`, {
                prompt: newMessage,
                conversationId: selectedConversationId,
                userId: user.userID,
            });
    
            setMessages(prev => [
                ...prev.filter(msg => msg.id !== tempId), // Remove loading message
                { role: 'assistant', content: response.data.response }
            ]);
    
            if (!selectedConversationId) {
                setSelectedConversationId(response.data.conversationId);
                fetchConversations(user.userID);
            }
        } catch (error) {
            console.error('Error sending message:', error.response?.data || error.message);
            alert(error.response.data.error);
            setMessages(prev => prev.filter(msg => msg.id !== tempId)); // Remove loading message on error
        }
    };

    const handleNewConversation = async () => {
        if (!user) {
            console.error('User is not authenticated');
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/chat/new`, {
                userId: user.userID,
            });
            setSelectedConversationId(response.data.conversationId);  // Set new conversationId
            setMessages([]);
            fetchConversations(user.userID);  // Fetch updated list of conversations
        } catch (error) {
            console.error('Error starting new conversation:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <>
            <div className='headerSpace' id='tempHeader'></div>

            <div className="chatbotContainer">
                <button id="sidebarToggleButton" onClick={toggleSidebar}>
                    {sidebarOpen ? '✖' : '☰'}
                </button>
                <div className={`chatArea ${sidebarOpen ? 'withSidebar' : ''}`}>
                <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                    <h2>Conversations</h2>
                    <ul>
                        {(conversations || []).map((conv) => (
                            <li key={conv.conversationId} onClick={() => setSelectedConversationId(conv.conversationId)}>
                                Conversation {conv.conversationId}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleNewConversation}>New Conversation</button>
                </div>
                <div className='conversationArea'>

                    <h2>Chat</h2>
                    <div className="messageContainer" ref={messageContainerRef}>
                        {messages.map((msg, index) => (
                            <div key={msg.id || index} className={`message ${msg.role}`}>
                                {msg.role === 'loading' ? (
                                    <div className="loading-container">
                                        <l-waveform
                                            size="35"
                                            stroke="3.5"
                                            speed="1" 
                                            color="#6303FF" 
                                        ></l-waveform>
                                    </div>
                                ) : (
                                    msg.content
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="inputContainer">
                        <input
                            type="text"
                            placeholder="Type your message here..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
};

export default ChatbotPage;
