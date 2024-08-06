// import React, { useState, useEffect } from 'react';

// const CountdownTimerWidget = ({ endDate }) => {
//   const [timeLeft, setTimeLeft] = useState('');

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();
//       const end = new Date(endDate);
//       const difference = end - now;

//       if (difference > 0) {
//         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//         setTimeLeft(`${days} days left`);
//       } else {
//         setTimeLeft('Goal date passed');
//         clearInterval(timer);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [endDate]);

//   return <div className="countdown-timer">{timeLeft}</div>;
// };

// export default CountdownTimerWidget;

import React, { useState, useEffect } from 'react';
import moment from "moment";
import './CountdownTimerWidget.css'

const CountdownTimerWidget = ({ endDate, isCompleted }) => {
    const targetTime = moment(endDate);
    const [currentTime, setCurrentTime] = useState(moment());
    const timeBetween = moment.duration(targetTime.diff(currentTime));
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(moment());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);

    if (isCompleted) {
      return (
          <div className="countdown-timer-widget completed">
              <h2 className="title">Goal Completed!</h2>
              <p>Congratulations on achieving your goal!</p>
          </div>
      );
  }
  
    return (
        <div className="countdown-timer-widget">
        <p className="title">Deadline comes in</p>
        <div className="counter">
          <div className="time-unit">
            <span className="time-value">{timeBetween.years()}</span>
            <span className="time-label">yr</span>
          </div>
          <div className="time-unit">
            <span className="time-value">{timeBetween.months()}</span>
            <span className="time-label">m</span>
          </div>
          <div className="time-unit">
            <span className="time-value">{timeBetween.days()}</span>
            <span className="time-label">d</span>
          </div>
          <div className="time-unit">
            <span className="time-value">{timeBetween.hours()}</span>
            <span className="time-label">h</span>
          </div>
          <div className="time-unit">
            <span className="time-value">{timeBetween.minutes()}</span>
            <span className="time-label">min</span>
          </div>
          <div className="time-unit">
            <span className="time-value">{timeBetween.seconds()}</span>
            <span className="time-label">s</span>
          </div>
        </div>
      </div>
    );
};

export default CountdownTimerWidget;