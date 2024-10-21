import React from 'react';
import './ProgressCircleWidget.css';
import Pie from '../Pie/Pie';

const ProgressCircleWidget = ({ amountSaved, goalAmount, isCompleted, endDate }) => {

    const progress = Math.min(amountSaved / goalAmount, 1);
    const percent = Math.round(progress * 100);
    const remainder = goalAmount - amountSaved;

  return (
    <div className='progressArea'>
      <div className="box">
        <Pie progress={percent} />
      </div>
      <div className="progressInfo">
        <p><strong>Amount Saved:</strong> ${amountSaved}</p>
        <p><strong>Goal Amount:</strong> ${goalAmount}</p>
        <p><strong>Remainder:</strong> ${remainder}</p>
        <p><strong>End Date:</strong> {endDate}</p>
        <p><strong>Status:</strong> {isCompleted ? 'Completed' : 'In Progress'}</p>
      </div>
    </div>
  );
};

export default ProgressCircleWidget;