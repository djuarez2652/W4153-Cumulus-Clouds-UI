import React, { useState } from 'react';
import { login } from './../api/userService';
import BackButton from '../Components/BackButton';
import LogoImg from '../Components/LogoImg';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            const { token } = response.data; // Assuming the API returns a token
            localStorage.setItem('jwtToken', token); // Store the token
            alert('Login successful!');
        } catch (err) {
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <div>
            <div className="topleft-corner">
                <BackButton to="/"/>
            </div>
            <div className="login-forms">
            <LogoImg to="/"></LogoImg>
            <h2>MuseLink</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="login-button" type="submit">Login</button>
                </form>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
