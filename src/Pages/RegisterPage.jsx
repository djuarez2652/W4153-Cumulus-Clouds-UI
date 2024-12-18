import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../Components/BackButton";
import LogoImg from "../Components/LogoImg";
import { register } from "../api/userService";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
            const response = await register(formData);
            const token = response.data.token;

            setMessage(response.data.message);
            setError("");
            
            if (formData.role === "Musician") {
                navigate("/musician-profile", { state: { token } });
            } else if (formData.role === "Booker") {
                navigate("/booker-profile", { state: { token } });
            }
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
