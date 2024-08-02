// ProgressCircleWidget.jsx

import React from 'react';
import './ProgressCircleWidget.css';
import Pie from '../Pie/Pie';

const ProgressCircleWidget = ({ amountSaved, goalAmount, isCompleted, endDate }) => {
    // const [progress, setProgress] = useState(0);

    // useEffect(() => {
    //   // Calculate percentage
    //   const percentage = (amountSaved / goalAmount) * 100;
      
    //   // Round up if .5 or higher, otherwise round down
    //   const roundedPercentage = Math.round(percentage);
      
    //   // Update state
    //   setProgress(roundedPercentage);
    // }, [amountSaved, goalAmount]);

    const progress = Math.min(amountSaved / goalAmount, 1);
    const percent = Math.round(progress * 100);
    const remainder = goalAmount - amountSaved;

  return (
    <div className='progressArea'>
      <div className="box">
        <Pie progress={percent} />
      </div>
      <div>
        <p>Amount Saved: ${amountSaved}</p>
        <p>Goal Amount: ${goalAmount}</p>
        <p>Remainder: ${remainder}</p>
        <p>End Date: {endDate}</p>
        <p>Status: {isCompleted ? 'Completed' : 'In Progress'}</p>
      </div>
    </div>
  );
};

export default ProgressCircleWidget;