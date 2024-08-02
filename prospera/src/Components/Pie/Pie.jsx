import React from 'react';
import './Pie.css'

const Pie = ({ progress }) => {
//   const pi = 3.14159265359;
//   const r = 400 / 2;
//   const c = 2 * pi * r;
//   const realProgress = c * progress;

// Ensure progress is between 0 and 100
const safeProgress = Math.min(100, Math.max(0, progress));

// Calculate the stroke-dashoffset
const circumference = 2 * Math.PI * 70; // 2πr where r = 70
const strokeDashoffset = circumference - (circumference * safeProgress) / 100;

const progressStyle = {
  strokeDashoffset: strokeDashoffset,
  stroke: 'rgb(186, 61, 249)' // You can make this dynamic too if needed
};

  return (
    <div className='boxPie'>
        <div className='percent'>
            <svg>
                <circle cx='70'cy='70' r='70' fill="red"></circle>
                <circle cx='70'cy='70' r='70' fill="red" style={progressStyle}></circle>
            </svg>
            <div className='number'>
                <h2>{safeProgress}<span>%</span></h2>
            </div>
        </div>
    </div>
  );
};

export default Pie;