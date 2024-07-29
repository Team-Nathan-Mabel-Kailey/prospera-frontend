import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import './AddWidgetModal.css'
import { v4 as uuidv4 } from 'uuid';

const AddWidgetModal = ({ isOpen, onClose, onAdd, existingWidgets, userId }) => {
  const [widgetType, setWidgetType] = useState('');
  const [widgetNum, setWidgetNum] = useState(0);
  const [widgetData, setWidgetData] = useState({});

  // const uniqueWidgets = 'financialGoals';

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 10,
    boxShadow: 24,
    p: 4,
  };

    const handleAddWidget = async () => {
        const newWidgetI = uuidv4();

        try {
        const response = await axios.post(`https://prospera-api.onrender.com/api/widgets/create`, {
            i: newWidgetI,
            type: widgetType,
            x: 0,
            y: 0,
            w: 2,
            h: 2,
            configuration: widgetData,
            userId,
        });
      
        onAdd(response.data);
        setWidgetNum(widgetNum + 1);
        setWidgetType('');
        setWidgetData({});
        onClose();
        } catch (error) {
        console.error('Error adding widget:', error);
        }
    };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWidgetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const isWidgetTypeAllowed = (type) => {
  //   if (uniqueWidgets.includes(type)) {
  //     return !existingWidgets.some(widget => widget.type === type);
  //   }
  //   return true;
  // };

  const renderWidgetCreationOptions = (widgetType) => {
    switch (widgetType) {
        case 'stock':
          return (
            // done
            <div className='createOptions'>
              <h2>See an overview of a stock's performance in the market.</h2>
              <h3>Enter the symbol of a stock you're interested in!</h3>
              <p>A stock symbol is a unique series of letters assigned to a company's stock for trading on a specific market exchange. Click <a href='https://finance.yahoo.com/lookup/'>here</a> to search for stock symbols.</p>
              <input type="text" name="symbol" value={widgetData.symbol || ''} onChange={handleInputChange} placeholder="Stock Name" />
              <h3>Now, enter a period to view a stock's performance over time.</h3>
              <p>Selecting a time period for a stock's performance allows you to view how the stock's price has changed over a specific duration, such as a day, a month, or year.</p>
              <select name='period' value={widgetData.period} onChange={handleInputChange} class="selectDropdown">
                <option value="">Select</option>
                <option value="1D">1 day</option>
                <option value="5D">5 days</option>
                <option value="1M">1 month</option>
                <option value="6M">6 months</option>
                <option value="1YR">1 year</option>
              </select>
            </div>
          );

        // current
        case 'financialGoals':
          return (
            <div className='createOptions'>
              <h2>Enter some of your financial goals.</h2>
              <p>Setting general financial goals is important because it provides a clear roadmap for managing money, saving for the future, and achieving financial stability.</p>
              <p>Each widget can store 5 of your financial goals. Feel free to add another widget to keep track of more goals!</p>
              <div className='financialGoalInputs'>
                <input type="text" name="goal1" value={widgetData.goal1 || ''} onChange={handleInputChange} placeholder="Goal 1" />
                <input type="text" name="goal2" value={widgetData.goal2 || ''} onChange={handleInputChange} placeholder="Goal 2" />
                <input type="text" name="goal3" value={widgetData.goal3 || ''} onChange={handleInputChange} placeholder="Goal 3" />
                <input type="text" name="goal4" value={widgetData.goal4 || ''} onChange={handleInputChange} placeholder="Goal 4" />
                <input type="text" name="goal5" value={widgetData.goal5 || ''} onChange={handleInputChange} placeholder="Goal 5" />
              </div>
            </div>
          );
      
        case 'highlightedSavings':
          return (
            <div className='createOptions'>
              <h2>Create a savings goal!</h2>
              <p>Making savings goals is crucial because it provides a clear plan and motivation for managing finances, helping individuals prioritize their spending, avoid unnecessary debt, and work towards financial security and specific future objectives.</p>
              <h3 className='savingsQuestions'>What do you want to name this savings goal?</h3>
              <input type="text" name="goalName" value={widgetData.goalName || ''} onChange={handleInputChange} placeholder="Goal Name" />
            </div>
          );

        // done (need to refine news sources)
        case 'news':
          return (
            <div className='createOptions'>
              <h2>We'll select a random financial news article for you on a topic you're interested in!</h2>
              <p>Our selected articles cover diverse topics including stock market trends, personal finance tips, corporate news, and global economic developments.</p>
              <select name='query' value={widgetData.query} onChange={handleInputChange} class="selectDropdown">
                <option value="">Select</option>
                <option value="Stocks">Stocks</option>
                <option value="Budgeting">Budgeting</option>
                <option value="Maintaining Good Credit">Maintaining Good Credit</option>
                <option value="Credit Card Tips">Credit Card Tips</option>
                <option value="Paying Bills">Paying Bills</option>
                <option value="Spending">Spending</option>
              </select>
            </div>
          );

        // done
        case 'savingsAccount':
          return (
            <div className='createOptions'>
              <h2>Enter some information about your savings account.</h2>
              <p className='accountExplanation'>A savings account is a bank account where you can safely store money and earn interest, designed to help you save for future goals or emergencies.</p>
              <h3 className='accountQuestion'>What do you want to name your savings account?</h3>
              <input type="text" name="savingsName" value={widgetData.savingsName || ''} onChange={handleInputChange} placeholder="Account Name" />
              <h3 className='accountQuestion'>What bank is this savings account located in?</h3>
              <input type="text" name="bankName" value={widgetData.bankName || ''} onChange={handleInputChange} placeholder="Bank Name" />
              <h3 className='accountQuestion2'>Finally, what is the current balance in this savings account?</h3>
              <p>Notifications will be sent periodically reminding you to update this balance.</p>
              <input type="number" name="balance" value={widgetData.balance || ''} onChange={handleInputChange} placeholder="Balance" />
            </div>
          );

        // done
        case 'checkingsAccount':
          return (
            <div className='createOptions'>
              <h2>Enter some information about your checking account.</h2>
              <p className='accountExplanation'>A checking account is a bank account for everyday transactions, allowing you to easily deposit money, withdraw cash, and pay bills or make purchases using checks or a debit card.</p>
              <h3 className='accountQuestion'>What do you want to name your checking account?</h3>
              <input type="text" name="checkingName" value={widgetData.checkingName || ''} onChange={handleInputChange} placeholder="Account Name" />
              <h3 className='accountQuestion'>What bank is this checking account located in?</h3>
              <input type="text" name="bankName" value={widgetData.bankName || ''} onChange={handleInputChange} placeholder="Bank Name" />
              <h3 className='accountQuestion2'>Finally, what is the current balance in this checking account?</h3>
              <p>Notifications will be sent periodically reminding you to update this balance.</p>
              <input type="number" name="balance" value={widgetData.balance || ''} onChange={handleInputChange} placeholder="Balance" />
            </div>
          );

      default:
        return <div className='defaultSelect'>Please select a widget type.</div>;
    }
  };

  // useEffect(() => {
  //   if (!isWidgetTypeAllowed(widgetType)) {
  //     setWidgetType('');
  //   }
  // }, [widgetType, existingWidgets]);

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <h2 className='selectTitle'>Select Widget Type</h2>
        <select value={widgetType} onChange={(e) => setWidgetType(e.target.value)} class="selectDropdown">
          <option value="">Select</option>
          <option value="stock">Stock Widget</option>
          <option value="financialGoals">Financial Goals Widget</option>
          <option value="highlightedSavings">Highlighted Savings Goal Widget</option>
          <option value="news">News Widget</option>
          <option value="savingsAccount">Savings Account Widget</option>
          <option value="checkingsAccount">Checkings Account Widget</option>
        </select>

        {renderWidgetCreationOptions(widgetType)}

        <button onClick={handleAddWidget} className='addWidgetBtnModal'>Add Widget</button>
      </Box>
    </Modal>
  );
};

export default AddWidgetModal;

// disabled={!isWidgetTypeAllowed('financialGoals')}