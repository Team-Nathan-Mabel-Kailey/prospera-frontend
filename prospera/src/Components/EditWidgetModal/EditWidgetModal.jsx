import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import './EditWidgetModal.css';
import { FinancialGoalsContext } from '../FinancialGoalsContext/FinancialGoalsContext';

const EditWidgetModal = ({ isOpen, onClose, widget, userId }) => {
  const [widgetData, setWidgetData] = useState({});
  const { fetchGoals } = useContext(FinancialGoalsContext);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (widget) {
      setWidgetData(widget.configuration);
    }
  }, [widget]);

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

  const handleSave = async () => {
    try {
        let response = await axios.put(`${BASE_URL}/api/widgets/content/${widget.id}`, {
            configuration: widgetData,
            userId,
        });
        console.log('test edit response: ', response);
        
        // Refresh financial goals after editing
        if (widgetType === 'Financial Goals') {
            await fetchGoals();
        }
        
        onClose();
    } catch (error) {
        console.error('Error updating widget:', error);
    }
  };

  const renderEditFields = () => {
    switch (widgetType) {
      case 'Stock':
        return (
          <div className='editOptions'>
            <h2>Edit Stock Widget</h2>
            {widgetData.stocks && widgetData.stocks.map((stock, index) => (
              <div key={index} className='stockGroup'>
                <h3>Stock {index + 1}</h3>
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
            ))}
          </div>
        );

        case 'Financial Goals':
          return (
            <div className='editOptions'>
              <h2>Edit Financial Goals Widget</h2>
              <input
                type="text"
                name="listName"
                value={widgetData.listName || ''}
                onChange={(e) => handleInputChange(e)}
                placeholder="List Name"
              />
              {widgetData.goals && widgetData.goals.map((goal, index) => (
                <div key={index} className='goalInputGroup'>
                  <h3>
                    {goal.name ? (
                      goal.name
                    ) : (
                      <input
                        type="text"
                        value={goal.name}
                        onChange={(e) => handleInputChange(e, index, 'name')}
                        placeholder="Enter Goal Name"
                      />
                    )}
                  </h3>
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
                </div>
              ))}
            </div>
          );

      // case 'Financial Goals':
      //   return (
      //     <div className='editOptions'>
      //       <h2>Edit Financial Goals Widget</h2>
      //       <input
      //         type="text"
      //         name="listName"
      //         value={widgetData.listName || ''}
      //         onChange={(e) => handleInputChange(e)}
      //         placeholder="List Name"
      //       />
      //       {widgetData.goals && widgetData.goals.map((goal, index) => (
      //         <div key={index} className='goalInputGroup'>
      //           <h3>{goal.name}</h3>
      //           <input
      //             type="number"
      //             value={goal.amountSaved}
      //             onChange={(e) => handleInputChange(e, index, 'amountSaved')}
      //             placeholder="Amount Saved"
      //           />
      //           <input
      //             type="number"
      //             value={goal.goalAmount}
      //             onChange={(e) => handleInputChange(e, index, 'goalAmount')}
      //             placeholder="Goal Amount"
      //           />
      //           <input
      //             type="date"
      //             value={goal.endDate}
      //             onChange={(e) => handleInputChange(e, index, 'endDate')}
      //             placeholder="Goal End Date"
      //           />
      //         </div>
      //       ))}
      //     </div>
      //   );

      case 'News':
        return (
          <div className='editOptions'>
            <h2>Edit News Widget</h2>
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
        );

      case 'Financial Accounts':
        return (
          <div className='editOptions'>
            <h2>Edit Financial Accounts Widget</h2>
            {widgetData.accounts && widgetData.accounts.map((account, index) => (
              <div key={index} className='accountInput'>
                <h3>Account {index + 1}</h3>
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
            ))}
          </div>
        );

      default:
        return <div>Unknown widget type</div>;
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        {renderEditFields()}
        <button onClick={handleSave} className='saveWidgetBtn'>Save Changes</button>
      </Box>
    </Modal>
  );
};

export default EditWidgetModal;