import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const ServiceButton = ({ to, children }) => {
    const [count, setCount] = useState(0);

    return (
        <Link to={to}>
            <button>{children}</button>
        </Link>        
    );

};

export default ServiceButton;