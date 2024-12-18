import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createMusicianProfile, uploadProfilePicture } from "../../api/userService";
import axios from 'axios';

const MusicianProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { token } = location.state || {}; // Retrieve token from navigation state
    console.log("Token in MusicianProfile:", token); // Debug token

    if (!token) {
        console.error("Token is missing. Please register again.");
        navigate("/register"); // Redirect back to register if token is missing
        return null;
    }

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

    const [accountObject, setAccountObject] = useState(null);
    const userId =  "b4ba86a7-6de5-4aab-ae37-b5a639feac5b"; // Replace with actual user ID

    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                const response = await axios.get(`/api/accounts/${userId}`);
                setAccountObject(response.data);
            } catch (error) {
                console.error("Error fetching account details:", error);
            }
        };

        fetchAccountDetails();
    }, [userId]);

    // Ensure accountObject is available before using it
    if (!accountObject) {
        return <div>Loading...</div>;
    }

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
                account: accountObject,
            };

            console.log("Token in MusicianProfile:", token);
            const musicianResponse = await createMusicianProfile(payload, token);
            const userId = musicianResponse.data.account.userId; // Extract user_id from response

            // Step 2: Upload Profile Picture
            if (file) {
                await uploadProfilePicture(userId, file, token);
            }

            setMessage("Musician profile created successfully with picture uploaded!");
            setError("");
            
            // Navigate to musician_dashboard with token
            navigate("/musician_dashboard", { state: { token } });
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
                {/* <div>
                    <label>Profile Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div> */}
                <button type="submit">Create Musician Profile</button>
            </form>
        </div>
    );
};

export default MusicianProfile;
