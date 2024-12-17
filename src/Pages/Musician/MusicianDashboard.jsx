import React from 'react';
import './MusicianDashboard.css';

function MusicianDashboard({ musician }) {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Musician Dashboard</h1>
            <div className="musician-info">
                <h2>{musician.name}</h2>
                <p><strong>Genre:</strong> {musician.genre}</p>
                <p><strong>Instruments:</strong> {musician.instruments.join(', ')}</p>
                <p><strong>Albums:</strong> {musician.albums.join(', ')}</p>
                <p><strong>Years Active:</strong> {musician.yearsActive}</p>
            </div>
        </div>
    );
}

export default MusicianDashboard;
