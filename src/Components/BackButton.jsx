import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// const StyledImage = styled.img`
//   width: 200px;
//   height: auto;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

const BackButton = ({ to, children }) => {
    const [count, setCount] = useState(0);

    return (
        <Link to={to}>
            <img src="src/assets/back.png"
            className="back-button"/>
        </Link>        
    );

};

export default BackButton;