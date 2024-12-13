import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const LogoImg = ({ to, children }) => {
    const [count, setCount] = useState(0);

    return (
        <Link to={to}>
            <img src="src/assets/greenmuselink.svg"
            className="back-button"/>
        </Link>        
    );

};

export default LogoImg;