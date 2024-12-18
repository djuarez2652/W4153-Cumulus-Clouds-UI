import React, { useState, useEffect } from 'react';
import './MusicianDashboard.css';
import { getMusicianProfile } from '../../api/userService.jsx';

const MusicianDashboard = () => {
    const [musicianProfile, setMusicianProfile] = useState(null);
    const [error, setError] = useState(null);
    const [gigSignedUp, setGigSignedUp] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const musicianId = 'ef03b9d6-f101-4df1-bc5c-96dacbaa8098';
    const token = 'your_valid_token_here'; // Replace with your actual token

    useEffect(() => {
        const fetchMusicianProfile = async () => {
            try {
                const response = await getMusicianProfile(musicianId, token);
                setMusicianProfile(response.data);
            } catch (error) {
                setError('Error fetching musician profile');
                console.error('Error fetching musician profile:', error);
            }
        };

        fetchMusicianProfile();
    }, [musicianId, token]);

    const handleGigSignup = async () => {
        try {
            console.log(`Email sent to ${musicianProfile.account.email} confirming gig signup.`);
            setGigSignedUp(true);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, newMessage]);
            setNewMessage('');
        }
    };

    const handleSendMessageToDavid = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            console.log(`Message to David: ${newMessage}`);
            setMessages([...messages, `To David: ${newMessage}`]);
            setNewMessage('');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!musicianProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Musician Profile</h1>
            <p><strong>Username:</strong> {musicianProfile.account.username}</p>
            <p><strong>Email:</strong> {musicianProfile.account.email}</p>
            <p><strong>Role:</strong> {musicianProfile.account.role}</p>
            <p><strong>Genre:</strong> {musicianProfile.genre}</p>
            <p><strong>Instruments Played:</strong> {musicianProfile.instrumentsPlayed.join(', ')}</p>
            <p><strong>Years of Experience:</strong> {musicianProfile.yearsOfExperience}</p>
            <p><strong>Availability:</strong> {musicianProfile.availability}</p>
            <p><strong>Sample Works:</strong></p>
            <ul>
                {musicianProfile.sampleWorks.map((work, index) => (
                    <li key={index}><a href={work} target="_blank" rel="noopener noreferrer">{work}</a></li>
                ))}
            </ul>

            <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '20px' }}>
                <h2>Sign Up for a Gig</h2>
                <p>Join us for an exciting gig opportunity hosted by David Juarez!</p>
                <p><strong>Venue:</strong> Rock Venue</p>
                <p><strong>Looking for:</strong> Bassist</p>
                <button onClick={handleGigSignup} disabled={gigSignedUp}>
                    {gigSignedUp ? 'Signed Up' : 'Sign Up for Gig'}
                </button>
                {gigSignedUp && <p>Confirmation email sent to {musicianProfile.account.email}</p>}

                <form onSubmit={handleSendMessageToDavid} style={{ marginTop: '10px' }}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Message David about the venue"
                    />
                    <button type="submit">Send to David</button>
                </form>

                <div style={{ marginTop: '20px', maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                    <h3>Chat with David</h3>
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))
                    ) : (
                        <p>No messages yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MusicianDashboard;
