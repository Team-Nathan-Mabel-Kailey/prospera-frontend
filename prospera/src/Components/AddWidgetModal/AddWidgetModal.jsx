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
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Tooltip } from 'react-tooltip'

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
      alert(error.response.data.error);
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
        minW = 3;
        maxW = 3;
        minH = 2;
        maxH = 2;
        startingW = 3;
        startingH = 2;
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
        alert(error.response.data.error);
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
              <h2>See an Overview of a Stock's Performance in the Market.</h2>
              <h3>Enter the <a className='definedWord'data-tooltip-id="symbolTooltip" data-tooltip-content="A stock symbol is a unique series of letters assigned to a company's stock for trading on a specific market exchange." data-tooltip-place="top">symbol</a> of a stock you're interested in and a <a className='definedWord' data-tooltip-id="periodTooltip" data-tooltip-content="Selecting a time period for a stock's performance allows you to view how the stock's price has changed over a specific duration, such as a day, a month, or year." data-tooltip-place="top">period</a> to view the stock's performance over time!</h3>
              <Tooltip id="symbolTooltip" style={{ fontSize: '18px', backgroundColor: '#4a0e4e'}}/>
              <Tooltip id="periodTooltip" style={{ fontSize: '18px', backgroundColor: '#4a0e4e'}}/>
              {/* <p>A stock symbol is a unique series of letters assigned to a company's stock for trading on a specific market exchange. Click <a href='https://finance.yahoo.com/lookup/'>here</a> to search for stock symbols.</p>
              <p>Selecting a time period for a stock's performance allows you to view how the stock's price has changed over a specific duration, such as a day, a month, or year.</p> */}
              <div className='inputsGroup'>
                {stockData.stocks.map((stock, index) => (
                  <div key={index} className='stockGroup'>
                    <h3 className='underlinedWord'>Stock {index + 1}</h3>
                    <div className='inputsAreaCreate'>
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
                        styles={{fontSize: 2}}
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
                  </div>
                ))}
              </div>
            </div>
          );
        
        // current
        case 'Financial Goals':
          return (
            <div className='createOptions'>
              <h2>Enter your Financial Goals.</h2>
              <h3>Setting specific financial goals is important because it provides a clear roadmap for managing money, saving for the future, and achieving <a className='definedWord'data-tooltip-id="stabilityTooltip" data-tooltip-content="Financial stability means having enough money to cover expenses and handle emergencies without financial stress." data-tooltip-place="top">financial stability</a>.</h3>
              <Tooltip id="stabilityTooltip" style={{ fontSize: '18px', backgroundColor: '#4a0e4e'}}/>
              <h3>Each widget can store up to 5 of your financial goals; <strong>leave goal information empty, if not needed.</strong> Feel free to add another widget to keep track of more goals!</h3>
              <div className='goalsListInputArea'>
                <h3 className='goalListName'>Enter Name of Financial Goal List</h3>
                <input
                  type="text"
                  value={goalData.listName}
                  onChange={(e) => handleListNameChange(e.target.value)}
                  placeholder="List Name"
                />
              </div>

              <div className='inputsGroupFinancial'>
                {goalData.goals.map((goal, index) => (
                  <div key={index} className='goalInputGroup'>
                    <h3 className='underlinedWord'>Goal {index + 1}</h3>
                    <div className='inputsAreaFinancial'>
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
                <h2>Highlight a Financial Goal.</h2>
                <h3>Select an active goal from your Financial Goals widget(s).</h3>
                {financialGoals.map((widget) => {
                  // Filter out empty goals and completed goals
                  const activeGoals = widget.configuration.goals.filter(goal => 
                    goal.name.trim() !== '' && !goal.isCompleted
                  );
                  
                  // Only render the widget if it has active goals
                  if (activeGoals.length > 0) {
                    return (
                      <div key={widget.id}>
                        <h4 style={{fontSize: 20}}>{widget.configuration.listName}</h4>
                        {activeGoals.map((goal) => (
                          <button
                            key={goal.id}
                            onClick={() => handleGoalSelection(goal)}
                            className="goal-select-btn"
                            style={{fontSize: 16}}
                          >
                            {goal.name}
                          </button>
                        ))}
                      </div>
                    );
                  }
                  // If all goals in this widget are empty or completed, don't render anything for this widget
                  return null;
                })}
              </div>
            );

        // done (need to refine news sources)
        case 'News':
          return (
            <div className='createOptions'>
              <h2>Generate a Random News Article.</h2>
              <h3>Our selected articles cover diverse topics including stock market trends, personal finance tips, corporate news, and global economic developments.</h3>
              <div className='inputsGroup'>
                <select className='newsSelect' name='query' value={widgetData.query} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="Stocks">Stocks</option>
                  <option value="Budgeting">Budgeting</option>
                  <option value="Maintaining Good Credit">Maintaining Good Credit</option>
                  <option value="Credit Card Tips">Credit Card Tips</option>
                  <option value="Paying Bills">Paying Bills</option>
                  <option value="Spending">Spending</option>
                </select>
              </div>
            </div>
          );

          case 'Portfolio Monitor':
            return (
              <div className='portfolioOptions'>
                <h2>Add Stocks to your Portfolio.</h2>
                <h3>Enter the details of the stocks in your portfolio. You can add multiple stocks.</h3>
                {portfolioData.stocks.map((stock, index) => (
                  <div key={index} className='portfolioInputsGroup'>
                    <h3 className='underlinedWord'>Stock {index + 1}</h3>
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
                  sx={{ 
                    mt: 2, 
                    color: '#6200ea', 
                    borderColor: '#6200ea',
                    '&:hover': {
                      backgroundColor: 'rgba(98, 0, 234, 0.04)',
                      borderColor: '#6200ea',
                    }
                  }}
                >
                  Add Another Stock
                </Button>
         </div>
      );

      case 'Financial Accounts':
        return (
          <div className='createOptions'>
            <h2>Enter Information about your Bank Accounts.</h2>
            <h3 className='accountExplanation'>This widget allows you to track multiple bank accounts, including both checking and savings accounts.</h3>
            <h3>Each widget can store up to 5 of your financial accounts; <strong>leave account information blank, if not needed.</strong> Feel free to add another widget to keep track of more accounts!</h3>
            <div className='inputsGroupAccts'>
              {financialAcctData.accounts.map((account, index) => (
                <div key={index} className='acctInputGroup'>
                  <h3 className='underlinedWord'>Account {index + 1}</h3>
                  <div className='inputsAreaAccts'>
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
                </div>
              ))}
            </div>
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
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <Box className="modal-content">
        <div className="modal-header">
          <h2 className='modal-title'>Select Widget Type</h2>
          <button onClick={onClose} className="close-button">
            <CloseIcon />
          </button>
        </div>
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
            <button onClick={handleAddWidget} className='add-widget-btn'>ADD</button>
          </div>
        </Box>
    </Modal>
  );
};

export default AddWidgetModal;