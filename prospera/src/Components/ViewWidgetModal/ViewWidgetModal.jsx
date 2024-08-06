import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './ViewWidgetModal.css'

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
          <div className="stock-info-container">
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
          <div className="stock-info-container">
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
          <div className="stock-info-container">
            <h2>Visualizing your financial goals, like using a countdown timer or a progress circle, is important because it helps you see how close you are to reaching your goals. This makes your goals feel more real and achievable. When you can see your progress, it keeps you motivated and focused. It also helps you track your efforts and adjust your plans if needed.</h2>
          </div>
        );

      case 'News':
        return (
          <div className="stock-info-container">
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
          <div className="stock-info-container">
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
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box className='view-modal-content'>
        <div className="view-modal-header" style={{paddingBottom: 0}}>
          <h1 className='view-modal-title'>Learn More about Your {widgetType} Widget</h1>
          <button onClick={onClose} className="close-button">
            <CloseIcon />
          </button>
        </div>
        <div className='modal-body'>
          {widget ? renderWidgetViewContent(widget) : <p>No widget data available</p>}
        </div>
      </Box>
    </Modal>
  );
};

export default ViewWidgetModal;