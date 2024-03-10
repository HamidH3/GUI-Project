import React from 'react';



const Battery = ({level}) => {
    return (
        <div className = "battery">
            <span>{level}%</span>
            <div className = "battery-level" style= {{width: '${level}%' }}></div>
            
        </div>
    );
};



export default Battery;
