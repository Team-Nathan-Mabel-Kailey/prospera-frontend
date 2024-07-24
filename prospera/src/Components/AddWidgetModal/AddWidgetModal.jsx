import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AddWidgetModal = ({ isOpen, onClose, onAdd, existingWidgets, userId }) => {
  const [widgetType, setWidgetType] = useState('');
  const [widgetNum, setWidgetNum] = useState(0);
  const [widgetData, setWidgetData] = useState({});

  const uniqueWidgets = ['financialGoals', 'savingsAccount', 'checkingsAccount'];

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

    const handleAddWidget = async () => {
        const newWidgetI = uuidv4();

        try {
        const response = await axios.post(`http://localhost:3000/users/${userId}/widget`, {
            i: newWidgetI,
            type: widgetType,
            x: 0,
            y: 0,
            w: 2,
            h: 2,
            color: '#FFD700',
            data: widgetData,
            userId,
        });

        onAdd(response);
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

  const isWidgetTypeAllowed = (type) => {
    if (uniqueWidgets.includes(type)) {
      return !existingWidgets.some(widget => widget.type === type);
    }
    return true;
  };

  useEffect(() => {
    if (!isWidgetTypeAllowed(widgetType)) {
      setWidgetType('');
    }
  }, [widgetType, existingWidgets]);

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <h2>Select Widget Type</h2>
        <select value={widgetType} onChange={(e) => setWidgetType(e.target.value)}>
          <option value="">Select</option>
          <option value="stock">Stock Widget</option>
          <option value="financialGoals" disabled={!isWidgetTypeAllowed('financialGoals')}>Financial Goals Widget</option>
          <option value="highlightedSavings">Highlighted Savings Goal Widget</option>
          <option value="news">News Widget</option>
          <option value="savingsAccount" disabled={!isWidgetTypeAllowed('savingsAccount')}>Savings Account Widget</option>
          <option value="checkingsAccount" disabled={!isWidgetTypeAllowed('checkingsAccount')}>Checkings Account Widget</option>
        </select>

        {widgetType === 'stock' && (
          <div>
            <h3>Select a stock you're interested in:</h3>
            <input type="text" name="stockName" value={widgetData.stockName || ''} onChange={handleInputChange} placeholder="Stock Name" />
          </div>
        )}

        {widgetType === 'financialGoals' && (
          <div>
            <h3>Enter your financial goals:</h3>
            <input type="text" name="goal1" value={widgetData.goal1 || ''} onChange={handleInputChange} placeholder="Goal 1" />
            <input type="text" name="goal2" value={widgetData.goal2 || ''} onChange={handleInputChange} placeholder="Goal 2" />
            <input type="text" name="goal3" value={widgetData.goal3 || ''} onChange={handleInputChange} placeholder="Goal 3" />
            <input type="text" name="goal4" value={widgetData.goal4 || ''} onChange={handleInputChange} placeholder="Goal 4" />
            <input type="text" name="goal5" value={widgetData.goal5 || ''} onChange={handleInputChange} placeholder="Goal 5" />
          </div>
        )}

        {widgetType === 'highlightedSavings' && (
          <div>
            <h3>Select a goal or create a new goal:</h3>
            <input type="text" name="goalId" value={widgetData.goalId || ''} onChange={handleInputChange} placeholder="Goal ID" />
          </div>
        )}

        {widgetType === 'news' && (
          <div>
            <h3>We'll select a random financial news article for you!</h3>
          </div>
        )}

        {widgetType === 'savingsAccount' && (
          <div>
            <h3>Enter your current savings account balance:</h3>
            <input type="number" name="balance" value={widgetData.balance || ''} onChange={handleInputChange} placeholder="Balance" />
            <input type="text" name="accountId" value={widgetData.accountId || ''} onChange={handleInputChange} placeholder="Account ID" />
          </div>
        )}

        {widgetType === 'checkingsAccount' && (
          <div>
            <h3>Enter your current checkings account balance:</h3>
            <input type="number" name="balance" value={widgetData.balance || ''} onChange={handleInputChange} placeholder="Balance" />
            <input type="text" name="accountId" value={widgetData.accountId || ''} onChange={handleInputChange} placeholder="Account ID" />
          </div>
        )}

        <Button onClick={handleAddWidget} variant='contained'>Add Widget</Button>
      </Box>
    </Modal>
  );
};

export default AddWidgetModal;
