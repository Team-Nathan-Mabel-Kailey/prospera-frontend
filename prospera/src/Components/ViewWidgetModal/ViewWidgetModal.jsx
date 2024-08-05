// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// // import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';

// const ViewWidgetModal = ({ isOpen, onClose, widget }) => {
//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   // Safely access widget properties
//   const renderWidgetViewOptions = (widgetType) => {
//     switch (widgetType) {
//         case 'Stock':
//           return (
//             // done
//             <div className='createOptions'>
//               <h2>See an overview of a stock's performance in the market.</h2>
//               <h3>Enter the symbol of a stock you're interested in and a period to view the stock's performance over time!</h3>
//               <p>A stock symbol is a unique series of letters assigned to a company's stock for trading on a specific market exchange. Click <a href='https://finance.yahoo.com/lookup/'>here</a> to search for stock symbols.</p>
//               <p>Selecting a time period for a stock's performance allows you to view how the stock's price has changed over a specific duration, such as a day, a month, or year.</p>
//               <div className='stockInputs'>
//                 {stockData.stocks.map((stock, index) => (
//                   <div key={index} className='stockGroup'>
//                     <h3>Stock {index + 1}</h3>
//                     <input
//                       type="text"
//                       value={stock.symbol}
//                       onChange={(e) => handleStockChange(index, 'symbol', e.target.value)}
//                       placeholder="Stock Symbol (required)"
//                     />
//                     <select
//                       name="period"
//                       value={stock.period}
//                       onChange={(e) => handleStockChange(index, 'period', e.target.value)}
//                     >
//                         <option value="">Select</option>
//                         <option value="1D">1 day</option>
//                         <option value="1m">1 month</option>
//                         <option value="3m">3 months</option>
//                         <option value="12m">1 year</option>
//                         <option value="60m">5 years</option>
//                         <option value="all">All</option>
//                     </select>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );

//         // current
//         case 'Financial Goals':
//           return (
//             <div className='createOptions'>
//               <h2>Enter your financial goals</h2>
//               <p>Setting specific financial goals is important because it provides a clear roadmap for managing money, saving for the future, and achieving financial stability.</p>
//               <p>Each widget can store up to 5 of your financial goals. Feel free to add another widget to keep track of more goals!</p>

//               <h3>Enter Name of Financial Goal List</h3>
//               <input
//                 type="text"
//                 value={goalData.listName}
//                 onChange={(e) => handleListNameChange(e.target.value)}
//                 placeholder="List Name (optional)"
//               />

//               <div className='financialGoalInputs'>
//                 {goalData.goals.map((goal, index) => (
//                   <div key={index} className='goalInputGroup'>
//                     <h3>Goal {index + 1}</h3>
//                     <input
//                       type="text"
//                       value={goal.name}
//                       onChange={(e) => handleGoalChange(index, 'name', e.target.value)}
//                       placeholder="Goal Name (required)"
//                     />
//                     <input
//                       type="number"
//                       value={goal.amountSaved}
//                       onChange={(e) => handleGoalChange(index, 'amountSaved', e.target.value)}
//                       placeholder="Amount Saved (optional)"
//                     />
//                     <input
//                       type="number"
//                       value={goal.goalAmount}
//                       onChange={(e) => handleGoalChange(index, 'goalAmount', e.target.value)}
//                       placeholder="Goal Amount (optional)"
//                     />
//                     <input
//                       type="date"
//                       value={goal.endDate}
//                       onChange={(e) => handleGoalChange(index, 'endDate', e.target.value)}
//                       placeholder="Goal End Date (required)"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
      
//         case 'Highlighted Goal':
//           if (financialGoals.length === 0) {
//             return <p>You need to create a Financial Goal Widget first.</p>;
//           }

//           return (
//             <div className='createOptions'>
//               <h2>Create a Highlighted Goal</h2>
//               <h3>Select a goal from your Financial Goal Widgets:</h3>
//               {financialGoals.map((widget) => {
//                 // Filter out empty goals
//                 const nonEmptyGoals = widget.configuration.goals.filter(goal => goal.name.trim() !== '');
                
//                 // Only render the widget if it has non-empty goals
//                 if (nonEmptyGoals.length > 0) {
//                   return (
//                     <div key={widget.id}>
//                       <h4>{widget.configuration.listName}</h4>
//                       {nonEmptyGoals.map((goal) => (
//                         <button
//                           key={goal.id}
//                           onClick={() => handleGoalSelection(goal)}
//                         >
//                           {goal.name}
//                         </button>
//                       ))}
//                     </div>
//                   );
//                 }
//                 // If all goals in this widget are empty, don't render anything for this widget
//                 return null;
//               })}
//             </div>
//           );

//         // done (need to refine news sources)
//         case 'News':
//           return (
//             <div className='createOptions'>
//               <h2>We'll select a random financial news article for you on a topic you're interested in!</h2>
//               <p>Our selected articles cover diverse topics including stock market trends, personal finance tips, corporate news, and global economic developments.</p>
//               <select name='query' value={widgetData.query} onChange={handleInputChange} className="selectDropdown">
//                 <option value="">Select</option>
//                 <option value="Stocks">Stocks</option>
//                 <option value="Budgeting">Budgeting</option>
//                 <option value="Maintaining Good Credit">Maintaining Good Credit</option>
//                 <option value="Credit Card Tips">Credit Card Tips</option>
//                 <option value="Paying Bills">Paying Bills</option>
//                 <option value="Spending">Spending</option>
//               </select>
//             </div>
//           );

//       case 'Financial Accounts':
//         return (
//           <div className='createOptions'>
//             <h2>Enter information for up to 6 bank accounts.</h2>
//             <p className='accountExplanation'>This widget allows you to track multiple bank accounts, including both checking and savings accounts.</p>
//             {financialAcctData.accounts.map((account, index) => (
//               <div key={index} className='accountInput'>
//                 <h3>Account {index + 1}</h3>
//                 <select
//                   value={account.accountType}
//                   onChange={(e) => handleFinancialAcctChange(index, 'accountType', e.target.value)}
//                 >
//                   <option value="">Select Account Type</option>
//                   <option value="Checking">Checking</option>
//                   <option value="Savings">Savings</option>
//                 </select>
//                 <input
//                   type="text"
//                   value={account.accountName}
//                   onChange={(e) => handleFinancialAcctChange(index, 'accountName', e.target.value)}
//                   placeholder="Account Name"
//                 />
//                 <input
//                   type="text"
//                   value={account.bankName}
//                   onChange={(e) => handleFinancialAcctChange(index, 'bankName', e.target.value)}
//                   placeholder="Bank Name"
//                 />
//                 <input
//                   type="number"
//                   value={account.balance}
//                   onChange={(e) => handleFinancialAcctChange(index, 'balance', e.target.value)}
//                   placeholder="Balance"
//                 />
//               </div>
//             ))}
//           </div>
//         );

//       default:
//         return <div className='defaultSelect'>Please select a widget type.</div>;
//     }
//   };

//   return (
//     <div>
//         <Modal
//         open={isOpen}
//         onClose={onClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         >
//             <Box sx={style}>
//                 <h2>More Information about Your {widgetType} Widget</h2>
//                 {renderWidgetViewOptions(widgetType)}
//             </Box>
//         </Modal>
//     </div>
//   );
// };

// export default ViewWidgetModal;

import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const ViewWidgetModal = ({ isOpen, onClose, widget }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const widgetType = widget ? widget.type : 'No widget selected';

  const renderWidgetViewContent = () => {
    switch (widgetType) {
      case 'Stock':
        return (
          <div>
            <h2>Learning about stocks helps you understand how to grow your money through investing. When you look at how a stock has done over time, you're seeing if its price has gone up or down. This can help you decide if it's a good investment.</h2>
            <h3>Key vocabulary relating to stocks:</h3>
            <ul>
              <li><strong>Share</strong>: A small piece of ownership in a company.</li>
              <li><strong>Dividend</strong>: Money a company pays to its shareholders, usually from profits.</li>
              <li><strong>Bull market</strong>: When stock prices are rising and people are optimistic.</li>
              <li><strong>Bear marker</strong>: When stock prices are falling and people are pessimistic.</li>
              <li><strong>Portfolio</strong>: The collection of investments a person owns.</li>
              <li><strong>Stock exchange</strong>: A place where stocks are bought and sold, like the New York Stock Exchange.</li>
            </ul>
          </div>
        );
      case 'Financial Goals':
        return (
          <div>
            <h2>It's important to identify and set financial goals for yourself because it helps you focus on what you want to achieve with your money. By having clear goals, you can create a plan to save, spend, and invest wisely. This makes it easier to track your progress and stay motivated. Setting financial goals also helps you prepare for the future, reduce stress about money, and make better financial decisions.</h2>
            <h3>Key vocabulary relating to financial goals:</h3>
            <ul>
              <li><strong>Budget</strong>: A plan for how you will spend and save your money.</li>
              <li><strong>Emergency Fund</strong>: Money saved for unexpected expenses.</li>
              <li><strong>Short-term Goals</strong>: Financial targets you aim to achieve within a year.</li>
              <li><strong>Long-term Goals</strong>: The rate at which the general level of prices for goods and services is rising.</li>
              <li><strong>Debt</strong>: Money you owe to others.</li>
              <li><strong>Retirement</strong>: The period in life when you stop working and live off your savings and investments.</li>
            </ul>
          </div>
        );

      case 'Highlighted Goal':
        return (
          <div>
            <h2>Visualizing your financial goals, like using a countdown timer or a progress circle, is important because it helps you see how close you are to reaching your goals. This makes your goals feel more real and achievable. When you can see your progress, it keeps you motivated and focused. It also helps you track your efforts and adjust your plans if needed.</h2>
          </div>
        );

      case 'News':
        return (
          <div>
            <h2>Keeping up with the latest financial news is crucial because it helps you stay informed about the economy, market trends, and financial regulations. This knowledge can empower you to make smarter financial decisions, manage your money effectively, and understand the impact of global events on your personal finances.</h2>
            <h3>Key vocabulary commonly seen in financial news:</h3>
            <ul>
              <li><strong>Economy</strong>: The system of money, trade, and industry in a country or region.</li>
              <li><strong>Market trends</strong>: The general direction in which the stock market or other financial markets are moving.</li>
              <li><strong>Financial regulations</strong>: Rules and laws that govern financial institutions and markets to ensure stability and protect consumers.</li>
              <li><strong>Inflation</strong>: The rate at which the general level of prices for goods and services is rising.</li>
              <li><strong>Interest rates</strong>: The cost of borrowing money, usually expressed as a percentage.</li>
              <li><strong>Recession</strong>: A period of temporary economic decline during which trade and industrial activity are reduced.</li>
            </ul>
          </div>
        );
      case 'Financial Accounts':
        return (
          <div>
            <h2>Keeping track of money across your accounts helps you understand where your money is going and how much you have. This awareness lets you make better decisions about spending and saving, which builds good financial habits over time. Regular tracking can help you avoid overspending and reach your financial goals.</h2>
            <h3>Key vocabulary relating to financial accounts:</h3>
            <ul>
              <li><strong>Balance</strong>: The amount of money currently in your account.</li>
              <li><strong>Transaction</strong>: Any activity that changes your account balance, like a purchase or deposit.</li>
              <li><strong>Overdraft</strong>: When you spend more money than you have in your account.</li>
              <li><strong>Interest</strong>: Money you earn on your savings or pay on loans.</li>
              <li><strong>Direct deposit</strong>: When your paycheck is automatically put into your account.</li>
              <li><strong>Expense</strong>: Any cost or outgoing payment you make.</li>
            </ul>
          </div>
        );
      default:
        return <p>Unknown widget type</p>;
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>Learn More about Your {widgetType} Widget</h2>
        {widget ? renderWidgetViewContent(widget) : <p>No widget data available</p>}
      </Box>
    </Modal>
  );
};

export default ViewWidgetModal;