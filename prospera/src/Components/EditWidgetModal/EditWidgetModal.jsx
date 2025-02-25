import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './EditWidgetModal.css';
import { FinancialGoalsContext } from '../FinancialGoalsContext/FinancialGoalsContext';

const EditWidgetModal = ({ isOpen, onClose, widget, userId }) => {
  const [widgetData, setWidgetData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const { fetchGoals } = useContext(FinancialGoalsContext);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (widget) {
      setWidgetData(widget.configuration);
      setOriginalData(widget.configuration);
    }
  }, [widget]);

  useEffect(() => {
    validateInputs();
  }, [widgetData]);

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

  const widgetType = widget ? widget.type : 'No widget selected';

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;
    setWidgetData(prevData => {
      if (widgetType === 'Stock') {
        return {
          ...prevData,
          stocks: prevData.stocks.map((stock, i) => 
            i === index ? { ...stock, [field]: value } : stock
          )
        };
      } else if (widgetType === 'Financial Goals') {
        if (name === 'listName') {
          return { ...prevData, listName: value };
        }
        return {
          ...prevData,
          goals: prevData.goals.map((goal, i) => 
            i === index ? { ...goal, [field]: value } : goal
          )
        };
      } else if (widgetType === 'Financial Accounts') {
        return {
          ...prevData,
          accounts: prevData.accounts.map((account, i) => 
            i === index ? { ...account, [field]: value } : account
          )
        };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };

  const validateInputs = () => {
    switch (widgetType) {
      case 'Stock':
        const changedStock = widgetData.stocks.some((stock, index) => 
          stock.symbol !== originalData.stocks[index].symbol || 
          stock.period !== originalData.stocks[index].period
        );
        setIsValid(changedStock);
        setValidationMessage(changedStock ? '' : 'At least one stock must be updated.');
        break;

      case 'Financial Goals':
        const changedGoal = widgetData.goals.some((goal, index) => {
          const originalGoal = originalData.goals[index];
          return !goal.isCompleted && (
            (goal.name && !originalGoal.name) ||
            goal.endDate !== originalGoal.endDate ||
            goal.amountSaved !== originalGoal.amountSaved ||
            goal.goalAmount !== originalGoal.goalAmount
          );
        });
        setIsValid(changedGoal);
        setValidationMessage(changedGoal ? '' : 'At least one incomplete goal must be updated.');
        break;

      case 'News':
        const changedNews = widgetData.query !== originalData.query;
        setIsValid(changedNews);
        setValidationMessage(changedNews ? '' : 'Please select a different news topic.');
        break;

      case 'Financial Accounts':
        const changedAccount = widgetData.accounts.some((account, index) => {
          const originalAccount = originalData.accounts[index];
          return account.accountType !== originalAccount.accountType ||
                 account.accountName !== originalAccount.accountName ||
                 account.bankName !== originalAccount.bankName ||
                 account.balance !== originalAccount.balance;
        });
        setIsValid(changedAccount);
        setValidationMessage(changedAccount ? '' : 'At least one account must be updated.');
        break;

      default:
        setIsValid(true);
        setValidationMessage('');
    }
  };

  const handleSave = async () => {
    if (isValid) {
      try {
        let response = await axios.put(`${BASE_URL}/api/widgets/content/${widget.id}`, {
          configuration: widgetData,
          userId,
        });
        console.log('test edit response: ', response);
        
        if (widgetType === 'Financial Goals') {
          await fetchGoals();
        }
        
        onClose();
      } catch (error) {
        console.error('Error updating widget:', error);
        alert('Error updating widget:');
    }
  };
};

  const renderEditFields = () => {
    switch (widgetType) {
      case 'Stock':
        return (
          <div className='editOptions'>
            <div className='inputsGroupEdit'>
              {widgetData.stocks && widgetData.stocks.map((stock, index) => (
                <div key={index} className='editInputGroup'>
                  <h3 className='underlinedWord'>Stock {index + 1}</h3>
                  <div className='inputsAreaEdit'>
                    <input
                      type="text"
                      value={stock.symbol}
                      onChange={(e) => handleInputChange(e, index, 'symbol')}
                      placeholder="Stock Symbol"
                    />
                    <select
                      value={stock.period}
                      onChange={(e) => handleInputChange(e, index, 'period')}
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
            {validationMessage && <p className="validation-message">{validationMessage}</p>}
            <div className="edit-modal-footer">
              <button onClick={handleSave} className='save-widget-btn' disabled={!isValid}>SAVE</button>
            </div>
          </div>
        );

        case 'Financial Goals':
          return (
            <div className='editOptions'>
              <input
                type="text"
                name="listName"
                value={widgetData.listName || ''}
                onChange={(e) => handleInputChange(e)}
                placeholder="List Name"
              />
              <div className='inputsGroupEdit'>
              {widgetData.goals && widgetData.goals.map((goal, index) => (
                <div key={index} className='editInputGroup'>
                  <h3 className='underlinedWord'>Goal {index + 1}</h3>
                  <div className='inputsAreaEdit'>
                    {goal.isCompleted ? (
                      <h3>{goal.name}</h3>
                    ) : originalData.goals[index]?.name ? (
                      <h3>{goal.name}</h3>
                    ) : (
                      <input
                        type="text"
                        value={goal.name || ''}
                        onChange={(e) => handleInputChange(e, index, 'name')}
                        placeholder="Enter Goal Name"
                      />
                    )}
                    {!goal.isCompleted && (
                      <>
                        <input
                          type="number"
                          value={goal.amountSaved}
                          onChange={(e) => handleInputChange(e, index, 'amountSaved')}
                          placeholder="Amount Saved"
                        />
                        <input
                          type="number"
                          value={goal.goalAmount}
                          onChange={(e) => handleInputChange(e, index, 'goalAmount')}
                          placeholder="Goal Amount"
                        />
                        <input
                          type="date"
                          value={goal.endDate}
                          onChange={(e) => handleInputChange(e, index, 'endDate')}
                          placeholder="Goal End Date"
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
              </div>
              {validationMessage && <p className="validation-message">{validationMessage}</p>}
              <div className="edit-modal-footer">
                <button onClick={handleSave} className='save-widget-btn' disabled={!isValid}>SAVE</button>
              </div>
            </div>
          );

      case 'News':
        return (
          <div className='editOptions'>
            <div className='inputsGroupEdit'>
              <div className='editInputGroup'>
                <h3>News Topic</h3>
                <div className='inputsAreaEdit'>
                  <select 
                    name='query' 
                    value={widgetData.query} 
                    onChange={handleInputChange}
                    className="selectDropdown"
                  >
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
            </div>
            {validationMessage && <p className="validation-message">{validationMessage}</p>}
            <div className="edit-modal-footer">
              <button onClick={handleSave} className='save-widget-btn' disabled={!isValid}>SAVE</button>
            </div>
          </div>
        );

      case 'Financial Accounts':
        return (
          <div className='editOptions'>
            <div className='inputsGroupEdit'>
              {widgetData.accounts && widgetData.accounts.map((account, index) => (
                <div key={index} className='editInputGroup'>
                  <h3 className='underlinedWord'>Account {index + 1}</h3>
                  <div className='inputsAreaEdit'>
                    <select
                      value={account.accountType}
                      onChange={(e) => handleInputChange(e, index, 'accountType')}
                    >
                      <option value="">Select Account Type</option>
                      <option value="Checking">Checking</option>
                      <option value="Savings">Savings</option>
                    </select>
                    <input
                      type="text"
                      value={account.accountName}
                      onChange={(e) => handleInputChange(e, index, 'accountName')}
                      placeholder="Account Name"
                    />
                    <input
                      type="text"
                      value={account.bankName}
                      onChange={(e) => handleInputChange(e, index, 'bankName')}
                      placeholder="Bank Name"
                    />
                    <input
                      type="number"
                      value={account.balance}
                      onChange={(e) => handleInputChange(e, index, 'balance')}
                      placeholder="Balance"
                    />
                  </div>
                </div>
              ))}
            </div>
            {validationMessage && <p className="validation-message">{validationMessage}</p>}
            <div className="edit-modal-footer">
              <button onClick={handleSave} className='save-widget-btn' disabled={!isValid}>SAVE</button>
            </div>
          </div>
        );

      default:
        return <div className='editOptions'>Nothing to edit!</div>;
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Box className="edit-modal-content">
        <div className="edit-modal-header">
          <h2 className='edit-modal-title'>Edit Your {widgetType} Widget</h2>
          <button onClick={onClose} className="close-button">
            <CloseIcon />
          </button>
        </div>
        <div className="edit-modal-body">
          {renderEditFields()}
        </div>
      </Box>
    </Modal>
  );
};

export default EditWidgetModal;