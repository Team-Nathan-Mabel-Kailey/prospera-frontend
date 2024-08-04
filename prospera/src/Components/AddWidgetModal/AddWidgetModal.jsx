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
  const [goalData, setGoalData] = useState({
    listName: '',
    goals: [
      { id: Math.floor(Math.random() * 100), name: '', amountSaved: '', goalAmount: '', endDate: '', isCompleted: false },
      { id: Math.floor(Math.random() * 100), name: '', amountSaved: '', goalAmount: '', endDate: '', isCompleted: false },
      { id: Math.floor(Math.random() * 100), name: '', amountSaved: '', goalAmount: '', endDate: '', isCompleted: false },
      { id: Math.floor(Math.random() * 100), name: '', amountSaved: '', goalAmount: '', endDate: '', isCompleted: false },
      { id: Math.floor(Math.random() * 100), name: '', amountSaved: '', goalAmount: '', endDate: '', isCompleted: false }
    ]
  });
  const [stockData, setStockData] = useState({
    stocks: [
      { symbol: '', period: '' },
      { symbol: '', period: '' },
      { symbol: '', period: '' },
      { symbol: '', period: '' },
      { symbol: '', period: '' },
    ]
  });
  const [financialAcctData, setFinancialAcctData] = useState({
    accounts: [
      { accountType: '', accountName: '', balance: '', bankName: ''},
      { accountType: '', accountName: '', balance: '', bankName: ''},
      { accountType: '', accountName: '', balance: '', bankName: ''},
      { accountType: '', accountName: '', balance: '', bankName: ''},
      { accountType: '', accountName: '', balance: '', bankName: ''},
      { accountType: '', accountName: '', balance: '', bankName: ''}
      
    ]
  });
  const [highlightedGoalData, setHighlightedGoalData] = useState({});
  const [minW, setMinW] = useState(0);
  const [maxW, setMaxW] = useState(0);
  const [minH, setMinH] = useState(0);
  const [maxH, setMaxH] = useState(0);
  const [startingW, setStartingW] = useState(0);
  const [startingH, setStartingH] = useState(0);

  const [financialGoals, setFinancialGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  let BASE_URL = import.meta.env.VITE_BASE_URL;

  // const uniqueWidgets = 'financialGoals';

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 18,
    boxShadow: 50,
    p: 4,
  };

  const resetStockData = () => {
    setStockData({
      stocks: Array(5).fill({ symbol: '', period: '' })
    });
  };

  const resetGoalData = () => {
    setGoalData({
      listName: '',
      goals: Array(5).fill({ name: '', amountSaved: '', goalAmount: '', endDate: '', isCompleted: false })
    });
  };

  const resetFinancialAcctData = () => {
    setFinancialAcctData({
      accounts: Array(5).fill({ accountType: '', accountName: '', balance: '', bankName: ''})
    });
  };

  const resetHighlightedGoalData = () => {
    setHighlightedGoalData({});
  };

  const handleWidgetTypeChange = (e) => {
    setWidgetType(e.target.value);
    resetStockData();
    resetGoalData();
    resetHighlightedGoalData();
    resetFinancialAcctData();
  };

  /////
  useEffect(() => {
    if (widgetType === 'Highlighted Goal') {
      fetchFinancialGoals();
    }
  }, [widgetType]);

  const fetchFinancialGoals = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/widgets/user/financial-goals/${userId}`);
      setFinancialGoals(response.data);
    } catch (error) {
      console.error('Error fetching financial goals:', error);
    }
  };

  const handleGoalSelection = (goal) => {
    setSelectedGoal(goal);
    setHighlightedGoalData(goal);
  };
  /////

  const handleAddWidget = async () => {
    const newWidgetI = uuidv4();
    console.log('widget type: ', widgetType);
    
    let minW, maxW, minH, maxH, startingW, startingH;

    if (widgetType === 'Stock') {
        minW = 2;
        maxW = 4;
        minH = 3;
        maxH = 3;
        startingW = 3;
        startingH = 3;
    } 

    else if (widgetType === 'News') {
      minW = 2;
      maxW = 3;
      minH = 3;
      maxH = 3;
      startingW = 3;
      startingH = 3;
    }

    else if (widgetType === 'Financial Goals') {
        minW = 2;
        maxW = 3;
        minH = 2;
        maxH = 3;
        startingW = 3;
        startingH = 3;
    }
    
    else if (widgetType === 'Highlighted Goal') {
        minW = 2;
        maxW = 3;
        minH = 1;
        maxH = 2;
        startingW = 3;
        startingH = 2;
    } 
    
    else if (widgetType === 'Checking Account' || widgetType === 'Savings Account') {
        minW = 3;
        maxW = 4;
        minH = 1;
        maxH = 1;
        startingW = 4;
        startingH = 1;
    }

    else if (widgetType === 'Financial Accounts') {
        minW = 4;
        maxW = 6;
        minH = 2;
        maxH = 3;
        startingW = 4;
        startingH = 2;
    }

    try {
      let response;

      if (widgetType === 'Financial Goals') {
        response = await axios.post(`${BASE_URL}/api/widgets/create`, {
          i: newWidgetI,
          type: widgetType,
          x: 0,
          y: 0,
          w: startingW,
          h: startingH,
          minW: minW,
          maxW: maxW,
          minH: minH,
          maxH: maxH,
          configuration: goalData,
          userId,

        });
        // try {
        // const response = await axios.post(`https://prospera-api.onrender.com/api/widgets/create`, {
        //     i: newWidgetI,
        //     type: widgetType,
        //     x: 0,
        //     y: 0,
        //     w: startingW,
        //     h: startingH,
        //     minW: minW,
        //     maxW: maxW,
        //     minH: minH,
        //     maxH: maxH,
        //     configuration: widgetData,
        //     userId,
        // });
      }

      else if (widgetType === 'Stock') {
        response = await axios.post(`${BASE_URL}/api/widgets/create`, {
          i: newWidgetI,
          type: widgetType,
          x: 0,
          y: 0,
          w: startingW,
          h: startingH,
          minW: minW,
          maxW: maxW,
          minH: minH,
          maxH: maxH,
          configuration: stockData,
          userId,
        });
      } 
      
      else if (widgetType === 'Financial Accounts') {
        response = await axios.post(`${BASE_URL}/api/widgets/create`, {
          i: newWidgetI,
          type: widgetType,
          x: 0,
          y: 0,
          w: startingW,
          h: startingH,
          minW: minW,
          maxW: maxW,
          minH: minH,
          maxH: maxH,
          configuration: financialAcctData,
          userId,
        });
      }

      else if (widgetType === 'Highlighted Goal') {
        response = await axios.post(`${BASE_URL}/api/widgets/create`, {
          i: newWidgetI,
          type: widgetType,
          x: 0,
          y: 0,
          w: startingW,
          h: startingH,
          minW: minW,
          maxW: maxW,
          minH: minH,
          maxH: maxH,
          configuration: highlightedGoalData,
          userId,
        });
      }
        
        
      else {
        response = await axios.post(`${BASE_URL}/api/widgets/create`, {
          i: newWidgetI,
          type: widgetType,
          x: 0,
          y: 0,
          w: startingW,
          h: startingH,
          minW: minW,
          maxW: maxW,
          minH: minH,
          maxH: maxH,
          configuration: widgetData,
          userId,
        });
      }
      
        console.log(response.data);
        onAdd(response.data);
        setWidgetNum(widgetNum + 1);
        setWidgetType('');
        setWidgetData({});
        setFinancialAcctData({});
        setGoalData({});
        setStockData({});
        onClose();

        // Update state after the API call
        setMinW(minW);
        setMaxW(maxW);
        setMinH(minH);
        setMaxH(maxH);
        setStartingW(startingW);
        setStartingH(startingH);
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

  const handleFinancialAcctChange = (index, field, value) => {
    setFinancialAcctData(prevData => ({
      ...prevData,
      accounts: prevData.accounts.map((account, i) => 
        i === index ? { ...account, [field]: value } : account
      )
    }));
  };
  
  const handleGoalChange = (index, field, value) => {
    setGoalData(prevData => ({
      ...prevData,
      goals: prevData.goals.map((goal, i) => 
        i === index ? { ...goal, [field]: value } : goal
      )
    }));
  };

  const handleStockChange = (index, field, value) => {
    setStockData(prevData => ({
      ...prevData,
      stocks: prevData.stocks.map((stock, i) => 
        i === index ? { ...stock, [field]: value } : stock
      )
    }));
  };

  const handleListNameChange = (value) => {
    setGoalData(prevData => ({
      ...prevData,
      listName: value
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
        case 'Stock':
          return (
            // done
            <div className='createOptions'>
              <h2>See an overview of a stock's performance in the market.</h2>
              <h3>Enter the symbol of a stock you're interested in and a period to view the stock's performance over time!</h3>
              <p>A stock symbol is a unique series of letters assigned to a company's stock for trading on a specific market exchange. Click <a href='https://finance.yahoo.com/lookup/'>here</a> to search for stock symbols.</p>
              <p>Selecting a time period for a stock's performance allows you to view how the stock's price has changed over a specific duration, such as a day, a month, or year.</p>
              <div className='stockInputs'>
                {stockData.stocks.map((stock, index) => (
                  <div key={index} className='stockGroup'>
                    <h3>Stock {index + 1}</h3>
                    <input
                      type="text"
                      value={stock.symbol}
                      onChange={(e) => handleStockChange(index, 'symbol', e.target.value)}
                      placeholder="Stock Symbol (required)"
                    />
                    <select
                      name="period"
                      value={stock.period}
                      onChange={(e) => handleStockChange(index, 'period', e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="1D">1 day</option>
                        <option value="1m">1 month</option>
                        <option value="3m">3 months</option>
                        <option value="12m">1 year</option>
                        <option value="60m">5 years</option>
                        <option value="all">All</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          );

        // current
        case 'Financial Goals':
          return (
            <div className='createOptions'>
              <h2>Enter your financial goals</h2>
              <p>Setting specific financial goals is important because it provides a clear roadmap for managing money, saving for the future, and achieving financial stability.</p>
              <p>Each widget can store up to 5 of your financial goals. Feel free to add another widget to keep track of more goals!</p>

              <h3>Enter Name of Financial Goal List</h3>
              <input
                type="text"
                value={goalData.listName}
                onChange={(e) => handleListNameChange(e.target.value)}
                placeholder="List Name (optional)"
              />

              <div className='financialGoalInputs'>
                {goalData.goals.map((goal, index) => (
                  <div key={index} className='goalInputGroup'>
                    <h3>Goal {index + 1}</h3>
                    <input
                      type="text"
                      value={goal.name}
                      onChange={(e) => handleGoalChange(index, 'name', e.target.value)}
                      placeholder="Goal Name (required)"
                    />
                    <input
                      type="number"
                      value={goal.amountSaved}
                      onChange={(e) => handleGoalChange(index, 'amountSaved', e.target.value)}
                      placeholder="Amount Saved (optional)"
                    />
                    <input
                      type="number"
                      value={goal.goalAmount}
                      onChange={(e) => handleGoalChange(index, 'goalAmount', e.target.value)}
                      placeholder="Goal Amount (optional)"
                    />
                    <input
                      type="date"
                      value={goal.endDate}
                      onChange={(e) => handleGoalChange(index, 'endDate', e.target.value)}
                      placeholder="Goal End Date (required)"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
      
        case 'Highlighted Goal':
          if (financialGoals.length === 0) {
            return <p>You need to create a Financial Goal Widget first.</p>;
          }

          return (
            <div className='createOptions'>
              <h2>Create a Highlighted Goal</h2>
              <h3>Select a goal from your Financial Goal Widgets:</h3>
              {financialGoals.map((widget) => {
                // Filter out empty goals
                const nonEmptyGoals = widget.configuration.goals.filter(goal => goal.name.trim() !== '');
                
                // Only render the widget if it has non-empty goals
                if (nonEmptyGoals.length > 0) {
                  return (
                    <div key={widget.id}>
                      <h4>{widget.configuration.listName}</h4>
                      {nonEmptyGoals.map((goal) => (
                        <button
                          key={goal.id}
                          onClick={() => handleGoalSelection(goal)}
                        >
                          {goal.name}
                        </button>
                      ))}
                    </div>
                  );
                }
                // If all goals in this widget are empty, don't render anything for this widget
                return null;
              })}
            </div>
          );

        // done (need to refine news sources)
        case 'News':
          return (
            <div className='createOptions'>
              <h2>We'll select a random financial news article for you on a topic you're interested in!</h2>
              <p>Our selected articles cover diverse topics including stock market trends, personal finance tips, corporate news, and global economic developments.</p>
              <select name='query' value={widgetData.query} onChange={handleInputChange} className="selectDropdown">
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
        case 'Savings Account':
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
        case 'Checking Account':
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

      case 'Financial Accounts':
        return (
          <div className='createOptions'>
            <h2>Enter information for up to 6 bank accounts.</h2>
            <p className='accountExplanation'>This widget allows you to track multiple bank accounts, including both checking and savings accounts.</p>
            {financialAcctData.accounts.map((account, index) => (
              <div key={index} className='accountInput'>
                <h3>Account {index + 1}</h3>
                <select
                  value={account.accountType}
                  onChange={(e) => handleFinancialAcctChange(index, 'accountType', e.target.value)}
                >
                  <option value="">Select Account Type</option>
                  <option value="Checking">Checking</option>
                  <option value="Savings">Savings</option>
                </select>
                <input
                  type="text"
                  value={account.accountName}
                  onChange={(e) => handleFinancialAcctChange(index, 'accountName', e.target.value)}
                  placeholder="Account Name"
                />
                <input
                  type="text"
                  value={account.bankName}
                  onChange={(e) => handleFinancialAcctChange(index, 'bankName', e.target.value)}
                  placeholder="Bank Name"
                />
                <input
                  type="number"
                  value={account.balance}
                  onChange={(e) => handleFinancialAcctChange(index, 'balance', e.target.value)}
                  placeholder="Balance"
                />
              </div>
            ))}
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
        <select value={widgetType} onChange={handleWidgetTypeChange} className="selectDropdown">
          <option value="">Select</option>
          <option value="Stock">Stock Widget</option>
          <option value="Financial Goals">Financial Goals Widget</option>
          <option value="Highlighted Goal">Highlighted Goal Widget</option>
          <option value="News">News Widget</option>
          {/* <option value="Savings Account">Savings Account Widget</option>
          <option value="Checking Account">Checkings Account Widget</option> */}
          <option value="Financial Accounts">Financial Accounts Widget</option>
        </select>

        {renderWidgetCreationOptions(widgetType)}

        <button onClick={handleAddWidget} className='addWidgetBtnModal'>Add Widget</button>
      </Box>
    </Modal>
  );
};

export default AddWidgetModal;

// disabled={!isWidgetTypeAllowed('financialGoals')}