import React, { useEffect, useState } from 'react'
import './FinancialAccountsWidget.css'

const FinancialAccountsWidget = ({ data }) => {
    const [accounts, setAccounts] = useState([]);
    const [totals, setTotals] = useState({
        checkings: 0,
        savings: 0,
        overall: 0
    });

    useEffect(() => {
        console.log("Data received:", data); // Debugging line

        if (data && data.accounts) {
            const filledAccounts = data.accounts.filter(account => 
                account.accountName && account.accountType && account.bankName && account.balance !== undefined
            );
            setAccounts(filledAccounts);

            // Calculate totals
            const checkingsTotal = filledAccounts
                .filter(account => account.accountType.toLowerCase() === 'checking')
                .reduce((sum, account) => sum + parseFloat(account.balance), 0);

            const savingsTotal = filledAccounts
                .filter(account => account.accountType.toLowerCase() === 'savings')
                .reduce((sum, account) => sum + parseFloat(account.balance), 0);

            const overallTotal = filledAccounts.reduce((sum, account) => sum + parseFloat(account.balance), 0);

            setTotals({
                checkings: checkingsTotal,
                savings: savingsTotal,
                overall: overallTotal
            });
        } else {
            console.warn("No valid data available");
        }
    }, [data]);

    return (
        <div className="financialAccountsWidget">
            <div className="accountsList">
                {accounts.length > 0 ? accounts.map((account, index) => (
                    <div key={index} className="accountItem">
                        <div className="acctLeft">
                            {account.accountType || 'N/A'}<br/>
                            <strong className='acctTitle'>{account.accountName || `Account ${index + 1}`}<br/></strong>
                            {account.bankName || 'N/A'}
                        </div>
                        <div className="acctRight">
                            ${parseFloat(account.balance || 0).toFixed(2)}
                        </div>
                    </div>
                )) : (
                    <p>No accounts to display.</p>
                )}

            </div>
                <div className="acctTotals">
                    <div className="totals">
                        <p><span>${totals.checkings.toFixed(2)}</span> Checkings</p>
                        <p><span>${totals.savings.toFixed(2)}</span> Savings</p>
                        <p><span>${totals.overall.toFixed(2)}</span> Overall</p>
                    </div>
                </div>
        </div>
    )
}

export default FinancialAccountsWidget