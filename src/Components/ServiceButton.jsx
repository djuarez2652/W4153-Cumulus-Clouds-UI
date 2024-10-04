import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ServiceButton = ({ children }) => {
    const [count, setCount] = useState(0);
    // const nav = useNavigate();

    // const handleClick = () => {
    //     nav('/newpage')
    // }

    return (
            <button>{children}</button>
    );


};

export default ServiceButton;