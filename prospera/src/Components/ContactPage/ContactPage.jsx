import React, { useState } from 'react';
import './ContactPage.css'

const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [formSubmissions, setFormSubmissions] = useState([]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update form's targeted data field
        setFormData(prevData => ({
            ...prevData,    // Copy existing fields
            [name]: value   // Override targeted data field
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page refresh
        // Store all submissions
        setFormSubmissions(prevSubmissions => [...prevSubmissions, formData]);
        // Reset formData for the next submission
        setFormData({firstName: '', lastName: '', email: '', message: ''});
    };

    console.log(formSubmissions);
    
    return (
        <>
            <div className='contactBody'>
                <div className='leftContactPageContent'>
                    <h1>Contact Us!</h1>
                    <div className='contactIcons'>
                        <p>Mail</p>
                        <p>Phone</p>
                        <p>Location</p>
                    </div>
                </div>

                <div className='rightContactPageContent'>
                    <form onSubmit={handleSubmit} className='contactForm'>
                        <div className='nameInputs'>
                            <div className='nameInputArea'>
                                <label htmlFor='firstName'>First Name</label>
                                <input
                                type='text'
                                id='firstName'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                />
                            </div>
                                
                            <div className='nameInputArea'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input
                                type='text'
                                id='lastName'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                />
                            </div>
                         </div>
                            
                        <label htmlFor='email'>Email</label>
                        <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    
                        <label htmlFor='message'>Message</label>
                        <textarea
                        id='message'
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        required
                        ></textarea>
                        
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ContactPage
