// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ChatbotPage.css';

// const ChatbotPage = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');
//     const [conversationId, setConversationId] = useState(null);
//     const [conversations, setConversations] = useState([]);
//     const [currentConversationLabel, setCurrentConversationLabel] = useState('');
//     const [currentConversationIndex, setCurrentConversationIndex] = useState(null);

//     useEffect(() => {
//         // Fetch existing conversations when component mounts
//         fetchConversations();
//     }, []);

//     const fetchConversations = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/api/chat/conversations/2'); // Replace 2 with actual userId
//             setConversations(response.data.conversations);
//         } catch (error) {
//             console.error('Error fetching conversations:', error);
//         }
//     };

//     const fetchMessages = async (conversationId, index) => {
//         try {
//             const response = await axios.get(`http://localhost:3000/api/chat/${conversationId}`);
//             const formattedMessages = response.data.messages.flatMap(msg => [
//                 { role: 'user', content: msg.prompt },
//                 { role: 'assistant', content: msg.response }
//             ]);
//             setMessages(formattedMessages);
//             setConversationId(conversationId);
//             setCurrentConversationIndex(index);
//             setCurrentConversationLabel(`Conversation ${index + 1}`);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };

//     const handleSendMessage = async () => {
//         if (input.trim() === '') return;

//         const newMessage = { role: 'user', content: input };
//         setMessages([...messages, newMessage]);

//         try {
//             const response = await axios.post('https://prospera-api.onrender.com/api/chat', {
//                 prompt: input,
//                 conversationId: conversationId,
//             });

//             const botMessage = { role: 'assistant', content: response.data.response };
//             setMessages(prevMessages => [...prevMessages, botMessage]);
//             setConversationId(response.data.conversationId);

//             // If it's a new conversation, fetch the updated list of conversations
//             if (!conversationId) {
//                 fetchConversations();
//                 setCurrentConversationIndex(conversations.length); // Set the new conversation index
//                 setCurrentConversationLabel(`Conversation ${conversations.length + 1}`);
//             }
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }

//         setInput('');
//     };

//     const handleNewConversation = async () => {
//         setConversationId(null);
//         setMessages([]);
//         try {
//             const response = await axios.post('postgresql://prospera_database_kfkv_user:SNIgT3Mh4PMNqacEvF2YwfE3tLNJjBZK@dpg-cqh7euqj1k6c739ikhi0-a.oregon-postgres.render.com/prospera_database_kfkv/api/chat/new', { userId: 2 }); // Replace 2 with actual userId
//             const newConversationId = response.data.conversationId;
//             setConversationId(newConversationId);
//             setCurrentConversationIndex(conversations.length); // Set the new conversation index
//             setCurrentConversationLabel(`Conversation ${conversations.length + 1}`);
//             fetchConversations();
//         } catch (error) {
//             console.error('Error starting new conversation:', error);
//         }
//     };

//     return (
//         <>
//         <div className='headerSpace' id='tempHeader'></div>
        
//         <div className="chatbotContainer">
//             <div className="sidebar">
//                 <h2>Chatbot</h2>
//                 <ul>
//                     {conversations.map((conv, index) => (
//                         <li key={conv.conversationId} onClick={() => fetchMessages(conv.conversationId, index)}>
//                             Conversation {index + 1}
//                         </li>
//                     ))}
//                 </ul>
//                 <button onClick={handleNewConversation}>Start New Conversation</button>
//             </div>
//             <div className="chatArea">
//                 <h2>{currentConversationLabel}</h2>
//                 <div className="messageContainer">
//                     {messages.map((message, index) => (
//                         <div key={index} className={`message ${message.role}`}>
//                             {message.content}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="inputContainer">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyPress={(e) => {
//                             if (e.key === 'Enter') handleSendMessage();
//                         }}
//                     />
//                     <button onClick={handleSendMessage}>Send</button>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// };

// export default// ChatbotPage;

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

    useEffect(() => {
        console.log("user is: ", user.userID)
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        fetchConversations(user.userID);
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
            const response = await axios.get(`https://prospera-api.onrender.com/api/chat/conversations/${userId}`);
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
            
            const response = await axios.get(`https://prospera-api.onrender.com/api/chat/chathistory/${user.userID}/conversations/${conversationId}`);
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
            const response = await axios.post('https://prospera-api.onrender.com/api/chat', {
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
            setMessages(prev => prev.filter(msg => msg.id !== tempId)); // Remove loading message on error
        }
    };

    const handleNewConversation = async () => {
        if (!user) {
            console.error('User is not authenticated');
            return;
        }
        try {
            const response = await axios.post('https://prospera-api.onrender.com/api/chat/new', {
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

    return (
        <>
            <div className='headerSpace' id='tempHeader'></div>
        
            <div className="chatbotContainer">
                <div className="sidebar">
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
                <div className="chatArea">
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
        </>
    );
};

export default ChatbotPage;
