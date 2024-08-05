import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import './AddWidgetModal.css'
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const AddWidgetModal = ({ isOpen, onClose, onAdd, userId }) => {
  const [widgetType, setWidgetType] = useState('');
  const [widgetOptions, setWidgetOptions] = useState({});
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
  const [portfolioData, setPortfolioData] = useState({
    stocks: [{ ticker: '', position: '', quantity: '', price: '' }]
  });
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

  useEffect(() => {
    if (!isOpen) {
      setWidgetType('');
      setWidgetOptions({});
    }
  }, [isOpen]);

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

  const resetPortfolioData = () => {
    setPortfolioData({
      stocks: [{ ticker: '', position: '', quantity: '', price: '' }]
    });
  };

  const handleWidgetTypeChange = (e) => {
    setWidgetType(e.target.value);
    setWidgetOptions({});
    resetStockData();
    resetGoalData();
    resetHighlightedGoalData();
    resetPortfolioData();
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
      startingW = 2;
      startingH = 3;
    }

    else if (widgetType === 'Financial Goals') {
        minW = 2;
        maxW = 3;
        minH = 2;
        maxH = 3;
        startingW = 2;
        startingH = 2;
    }
    
    else if (widgetType === 'Highlighted Goal') {
        minW = 2;
        maxW = 3;
        minH = 1;
        maxH = 2;
        startingW = 2;
        startingH = 1;
    } 
    
    else if (widgetType === 'Checking Account' || widgetType === 'Savings Account') {
        minW = 3;
        maxW = 4;
        minH = 1;
        maxH = 1;
        startingW = 3;
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
    
    else if (widgetType === 'Portfolio Monitor') {
      minW = 3; 
      maxW = 6; 
      minH = 3; 
      maxH = 6; 
      startingW = 3; 
      startingH = 3;
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

      else if (widgetType === 'Portfolio Monitor') {
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
          configuration: {
            stocks: portfolioData.stocks  // Make sure this is correct
          },
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
        setPortfolioData({
          stocks: [{ ticker: '', position: '', quantity: '', price: '' }]
        });
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

  const handlePortfolioStockChange = (index, field, value) => {
    setPortfolioData(prevData => {
      const newStocks = [...prevData.stocks];
      newStocks[index] = { ...newStocks[index], [field]: value };
      console.log("Updated portfolio data:", { ...prevData, stocks: newStocks });
      return { ...prevData, stocks: newStocks };
    });
  };

  const addPortfolioStock = () => {
    setPortfolioData(prevData => ({
      ...prevData,
      stocks: [...prevData.stocks, { ticker: '', position: '', quantity: '', price: '' }]
    }));
  };

  const removePortfolioStock = (index) => {
    setPortfolioData(prevData => ({
      ...prevData,
      stocks: prevData.stocks.filter((_, i) => i !== index)
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

  const isConfigValid = () => {
    switch (widgetType) {
      case 'Portfolio Monitor':
        return portfolioData.stocks.every(stock => 
          stock.ticker && stock.position && stock.quantity && stock.price
        );
      // Add other cases as needed
      default:
        return true;
    }
  };

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

          case 'Portfolio Monitor':
            return (
              <div className='createOptions'>
                <h2>Add stocks to your portfolio</h2>
                <p>Enter the details of the stocks in your portfolio. You can add multiple stocks.</p>
                {portfolioData.stocks.map((stock, index) => (
                  <div key={index} className='stockGroup'>
                    <h3>Stock {index + 1}</h3>
                    <TextField
                      label="Ticker"
                      value={stock.ticker}
                      onChange={(e) => handlePortfolioStockChange(index, 'ticker', e.target.value)}
                      fullWidth
                      margin="dense"
                    />
                    <FormControl fullWidth margin="dense">
                      <InputLabel>Position</InputLabel>
                      <Select
                        value={stock.position}
                        onChange={(e) => handlePortfolioStockChange(index, 'position', e.target.value)}
                      >
                        <MenuItem value="BUY">Buy</MenuItem>
                        <MenuItem value="SELL">Sell</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Quantity"
                      type="number"
                      value={stock.quantity}
                      onChange={(e) => handlePortfolioStockChange(index, 'quantity', e.target.value)}
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label="Purchase Price"
                      type="number"
                      value={stock.price}
                      onChange={(e) => handlePortfolioStockChange(index, 'price', e.target.value)}
                      fullWidth
                      margin="dense"
                    />
                    {portfolioData.stocks.length > 1 && (
                      <Button 
                        onClick={() => removePortfolioStock(index)} 
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 1 }}
                      >
                        Remove Stock
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  startIcon={<AddIcon />} 
                  onClick={addPortfolioStock} 
                  fullWidth 
                  variant="outlined" 
                  sx={{ mt: 2 }}
                >
                  Add Another Stock
                </Button>
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

  return (
      <Modal 
      open={isOpen} 
      onClose={onClose} 
      aria-labelledby="modal-modal-title" 
      aria-describedby="modal-modal-description"
      >
        <Box className="modal-content">
          <h2 className='modal-title'>Select Widget Type</h2>
          <div className="modal-body">
            <div className="widget-type-buttons">
              {['Stock', 'Financial Goals', 'Highlighted Goal', 'News', 'Financial Accounts', 'Portfolio Monitor'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleWidgetTypeChange({ target: { value: type } })}
                  className={`widget-type-btn ${widgetType === type ? "active" : ""}`}
                >
                  {type}
                </button>
              ))}
            </div>
            {renderWidgetCreationOptions(widgetType)}
          </div>
          <div className="modal-footer">
            <button onClick={handleAddWidget} className='add-widget-btn'>Add Widget</button>
          </div>
        </Box>
    </Modal>
  );
};

export default AddWidgetModal;