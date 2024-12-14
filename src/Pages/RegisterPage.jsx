import React, { useState } from "react";
import axios from "axios";
import BackButton from "../Components/BackButton";
import LogoImg from "../Components/LogoImg";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/public/register", formData);
            setMessage(response.data.message);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
            setMessage("");
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
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="styled-select"
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="Musician">Musician</option>
                            <option value="Booker">Booking Agent</option>
                        </select>
                    </div>
                    <button className="login-button" type="submit">Register</button>
                </form>
            </div>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Register;
