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

const CountdownTimerWidget = ({ endDate }) => {
    const targetTime = moment(endDate);
    const [currentTime, setCurrentTime] = useState(moment());
    const timeBetween = moment.duration(targetTime.diff(currentTime));
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(moment());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <>
        <p>Deadline comes in</p>
        <p className="counter">
          <span>{timeBetween.years()}yr </span>
          <span>{timeBetween.months()}m </span>
          <span>{timeBetween.days()}d </span>
          <span>{timeBetween.hours()}h </span>
          <span>{timeBetween.minutes()}min </span>
          <span>{timeBetween.seconds()}s </span>
        </p>
      </>
    );
};

export default CountdownTimerWidget;