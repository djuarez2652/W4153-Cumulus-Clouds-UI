import React, { useEffect, useState } from 'react';
import axiosInstance from './api/axiosInstance';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/users/me'); // Update endpoint as needed
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user:', err);
            }
        };
        fetchUser();
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
};

export default Profile;
