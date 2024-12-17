import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../Components/BackButton';
import LogoImg from '../Components/LogoImg';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);

            const { token, role, message } = JSON.parse(response.data);

            console.log(message);

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            if (role === "MUSICIAN") {
                navigate("/musician-dashboard");
            } else if (role === "BOOKER") {
                navigate("/booker-dashboard");
            } else {
                console.error("Unknown role");
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
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
