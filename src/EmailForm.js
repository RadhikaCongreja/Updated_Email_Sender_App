import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmailForm.css";

const EmailForm = () => {
    const [formData, setFormData] = useState({
        to: "",
        subject: "",
        message: "",
        attachment: null,
    });

    const [emailHistory, setEmailHistory] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState('sent'); // 'sent' or 'received'
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            navigate('/login');
            return;
        }
        setUserEmail(email);
        fetchEmailHistory();
    }, [navigate]);

    const fetchEmailHistory = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/email-history", {
                headers: { Authorization: token }
            });
            setEmailHistory(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                alert("Failed to fetch email history");
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, attachment: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("to", formData.to);
        data.append("subject", formData.subject);
        data.append("message", formData.message);
        if (formData.attachment) {
            data.append("attachment", formData.attachment);
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post("/send-email", data, {
                headers: { 
                    "Content-Type": "multipart/form-data", 
                    Authorization: token 
                }
            });
            alert("Email sent successfully!");
            fetchEmailHistory();
            setFormData({
                to: "",
                subject: "",
                message: "",
                attachment: null
            });
        } catch (error) {
            alert(error.response?.data?.error || "Failed to send email");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    const toggleDropdown = (type) => {
        setActiveDropdown(activeDropdown === type ? null : type);
    };

    return (
        <div className="email-container">
            <div className="sidebar">
                <h3>Email History</h3>
                
                {/* Received Emails Dropdown */}
                <div className="dropdown">
                    <div 
                        className={`dropdown-header ${activeDropdown === 'received' ? 'active' : ''}`}
                        onClick={() => toggleDropdown('received')}
                    >
                        <span>📥 Received Emails</span>
                        <span className="dropdown-arrow">{activeDropdown === 'received' ? '▼' : '▶'}</span>
                    </div>
                    {activeDropdown === 'received' && (
                        <ul className="email-history">
                            {emailHistory
                                .filter(email => email.from)
                                .map((email, index) => (
                                    <li key={`received-${index}`}>
                                        <div><strong>From: {email.from}</strong></div>
                                        <div>{email.subject}</div>
                                        <div>{new Date(email.timestamp).toLocaleString()}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    )}
                </div>

                {/* Sent Emails Dropdown */}
                <div className="dropdown">
                    <div 
                        className={`dropdown-header ${activeDropdown === 'sent' ? 'active' : ''}`}
                        onClick={() => toggleDropdown('sent')}
                    >
                        <span>📤 Sent Emails</span>
                        <span className="dropdown-arrow">{activeDropdown === 'sent' ? '▼' : '▶'}</span>
                    </div>
                    {activeDropdown === 'sent' && (
                        <ul className="email-history">
                            {emailHistory
                                .filter(email => email.to)
                                .map((email, index) => (
                                    <li key={`sent-${index}`}>
                                        <div><strong>To: {email.to}</strong></div>
                                        <div>{email.subject}</div>
                                        <div>{new Date(email.timestamp).toLocaleString()}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    )}
                </div>
            </div>
            
            <div className="main-content">
                <div className="header">
                    <div className="header-left">
                        <div>
                            <h1>Email Sender</h1>
                            <h2>Compose your message</h2>
                        </div>
                    </div>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="to" 
                        placeholder="To" 
                        value={formData.to}
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="subject" 
                        placeholder="Subject" 
                        value={formData.subject}
                        onChange={handleChange} 
                        required 
                    />
                    <textarea 
                        name="message" 
                        placeholder="Compose email" 
                        value={formData.message}
                        onChange={handleChange} 
                        required
                    ></textarea>
                    
                    <div className="file-input-container">
                        <input 
                            type="file" 
                            name="attachment" 
                            onChange={handleFileChange} 
                        />
                    </div>
                    
                    <div className="button-container">
                        <button type="submit">Send Email</button>
                    </div>
                </form>
            </div>

            <div className="right-sidebar">
                <h3>About the App</h3>
                <div className="about-content">
                    <h4>Email Sender App</h4>
                    <p>A modern email client built with React and Node.js that allows you to send and track emails efficiently. Features include email composition, file attachments, and a comprehensive email history system.</p>
                    <p>The app uses a secure authentication system and maintains a clean, intuitive interface for the best user experience.</p>
                </div>
                <div className="developer-info">
                    <h4>Developer</h4>
                    <p>Developed by Radhika Congreja, a passionate full-stack developer focused on creating elegant and functional web applications.</p>
                </div>
            </div>
        </div>
    );
};

export default EmailForm;
