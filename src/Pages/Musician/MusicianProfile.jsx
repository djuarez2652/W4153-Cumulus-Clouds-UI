import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MusicianProfile = ({ token }) => {
    const navigate = useNavigate();

    // Form data for musician
    const [formData, setFormData] = useState({
        genre: "",
        instrumentsPlayed: "",
        yearsOfExperience: "",
        sampleWorks: "",
        availability: "",
    });

    // File for profile picture upload
    const [file, setFile] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Create Musician Profile
            const payload = {
                genre: formData.genre,
                instrumentsPlayed: formData.instrumentsPlayed.split(",").map((i) => i.trim()),
                yearsOfExperience: parseInt(formData.yearsOfExperience, 10),
                sampleWorks: formData.sampleWorks.split(",").map((i) => i.trim()),
                availability: formData.availability,
            };

            const musicianResponse = await axios.post("/api/accounts/musicians", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const userId = musicianResponse.data.account.userId; // Extract user_id from response

            // Step 2: Upload Profile Picture
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                await axios.post(`/api/accounts/${userId}/profile-picture`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            setMessage("Musician profile created successfully with picture uploaded!");
            setError("");
            navigate("/musician-dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create musician profile or upload picture.");
            setMessage("");
        }
    };

    return (
        <div>
            <h2>Create Your Musician Profile</h2>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Genre</label>
                    <input
                        type="text"
                        name="genre"
                        placeholder="Enter genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Instruments Played</label>
                    <input
                        type="text"
                        name="instrumentsPlayed"
                        placeholder="Comma-separated (e.g., Guitar, Piano)"
                        value={formData.instrumentsPlayed}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Years of Experience</label>
                    <input
                        type="number"
                        name="yearsOfExperience"
                        placeholder="Years of Experience"
                        value={formData.yearsOfExperience}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Sample Works</label>
                    <input
                        type="text"
                        name="sampleWorks"
                        placeholder="Comma-separated URLs (e.g., https://link1.com)"
                        value={formData.sampleWorks}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Availability</label>
                    <textarea
                        name="availability"
                        placeholder="Describe availability"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Profile Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Create Musician Profile</button>
            </form>
        </div>
    );
};

export default MusicianProfile;
