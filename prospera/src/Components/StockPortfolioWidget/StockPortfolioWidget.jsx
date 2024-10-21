import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StockPortfolioWidget.css';

const PortfolioMonitorWidget = ({ data, onUpdate }) => {
    const [stocks, setStocks] = useState(data.configuration?.stocks || []);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newStock, setNewStock] = useState({ ticker: '', position: 'BUY', quantity: '', price: '' });

    const finnhubApiKey = import.meta.env.VITE_FINNHUB_API_KEY;
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (data.configuration && data.configuration.stocks) {
            setStocks(data.configuration.stocks);
            fetchCurrentPrices(data.configuration.stocks);
        } else {
            setIsLoading(false);
        }
    }, [data]);

    const fetchCurrentPrices = async (stocksData) => {
        setIsLoading(true);
        setError(null);
        try {
            const updatedStocks = await Promise.all(stocksData.map(async (stock) => {
                const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
                    params: {
                        symbol: stock.ticker,
                        token: finnhubApiKey
                    }
                });
                const currentPrice = response.data.c;
                const profitLoss = calculateProfitLoss(stock, currentPrice);
                const totalPL = profitLoss * stock.quantity;
                return { ...stock, currentPrice, profitLoss, totalPL };
            }));
            setStocks(updatedStocks);
        } catch (error) {
            console.error('Error fetching stock prices:', error);
            setError('Failed to fetch current stock prices. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const calculateProfitLoss = (stock, currentPrice) => {
        const diff = currentPrice - parseFloat(stock.price);
        return stock.position === 'BUY' ? diff : -diff;
    };

    const calculateTotalProfitLoss = () => {
        return stocks.reduce((total, stock) => total + (stock.totalPL || 0), 0).toFixed(2);
    };

    const handleNewStockChange = (e) => {
        const { name, value } = e.target;
        setNewStock(prev => ({ ...prev, [name]: value }));
    };

    const addNewStock = async () => {
        if (newStock.ticker && newStock.quantity && newStock.price) {
            const updatedStocks = [...stocks, newStock];
            
            try {
                // Update the widget configuration in the database
                const updatedConfiguration = {
                    ...data.configuration,
                    stocks: updatedStocks
                };
                
                await axios.put(`${BASE_URL}/api/widgets/content/${data.id}`, {
                    configuration: updatedConfiguration
                });

                // Update local state
                setStocks(updatedStocks);

                // Fetch current prices for the updated stocks list
                await fetchCurrentPrices(updatedStocks);
                
                // Reset the new stock form
                setNewStock({ ticker: '', position: 'BUY', quantity: '', price: '' });
                
                // If onUpdate is provided, call it with the updated data
                if (onUpdate) {
                    onUpdate({
                        ...data,
                        configuration: updatedConfiguration
                    });
                }
            } catch (error) {
                console.error('Error saving new stock:', error);
                setError('Failed to save new stock. Please try again.');
            }
        }
    };

    const deleteStock = async (index) => {
        try {
            const updatedStocks = [...stocks];
            updatedStocks.splice(index, 1);

            // Update the widget configuration in the database
            const updatedConfiguration = {
                ...data.configuration,
                stocks: updatedStocks
            };

            await axios.put(`${BASE_URL}/api/widgets/content/${data.id}`, {
                configuration: updatedConfiguration
            });

            // Update local state
            setStocks(updatedStocks);

            // Fetch current prices for the updated stocks list
            await fetchCurrentPrices(updatedStocks);

            // If onUpdate is provided, call it with the updated data
            if (onUpdate) {
                onUpdate({
                    ...data,
                    configuration: updatedConfiguration
                });
            }
        } catch (error) {
            console.error('Error deleting stock:', error);
            setError('Failed to delete stock. Please try again.');
        }
    };

    if (isLoading) return <div className="loading">Loading portfolio data...</div>;
    if (error) return <div className="error">{error}</div>;

    const stopPropagation = (evt) => {
        evt.stopPropagation();
    };

    return (
        <div className='portfolio-monitor-widget'>
            <h3>Portfolio Monitor</h3>
            <div className='stocks-list'>
                {stocks.map((stock, index) => (
                    <div key={index} className='stock-item'>
                        <span className="stock-symbol">{stock.ticker}</span>
                        <span className="stock-position">{stock.position}</span>
                        <span className="stock-quantity">{stock.quantity}</span>
                        <span className="stock-price">${stock.price}</span>
                        <span className="stock-current-price">${stock.currentPrice?.toFixed(2) || 'N/A'}</span>
                        <span className={`stock-profit-loss ${stock.profitLoss > 0 ? 'profit' : 'loss'}`}>
                            ${stock.profitLoss?.toFixed(2) || 'N/A'}
                        </span>
                        <span className={`stock-total-pl ${stock.totalPL > 0 ? 'profit' : 'loss'}`}>
                            Total P/L: ${stock.totalPL?.toFixed(2) || 'N/A'}
                        </span>
                        <button onMouseDown={stopPropagation}
                        onTouchStart={stopPropagation}
                        onClick={() => deleteStock(index)} className="delete-stock-btn">Delete</button>
                    </div>
                ))}
            </div>
            <div className='total-profit-loss'>
                Total Portfolio P/L: <span className={calculateTotalProfitLoss() > 0 ? 'profit' : 'loss'}>
                    ${calculateTotalProfitLoss()}
                </span>
            </div>
            <div className='add-new-stock'>
                <input
                    type="text"
                    name="ticker"
                    value={newStock.ticker}
                    onChange={handleNewStockChange}
                    placeholder="Ticker"
                />
                <select
                    name="position"
                    value={newStock.position}
                    onChange={handleNewStockChange}
                >
                    <option value="BUY">Buy</option>
                    <option value="SELL">Sell</option>
                </select>
                <input
                    type="number"
                    name="quantity"
                    value={newStock.quantity}
                    onChange={handleNewStockChange}
                    placeholder="Quantity"
                />
                <input
                    type="number"
                    name="price"
                    value={newStock.price}
                    onChange={handleNewStockChange}
                    placeholder="Purchase Price"
                />
                <button onClick={addNewStock}>Add Stock</button>
            </div>
            <button onClick={() => fetchCurrentPrices(stocks)} className="update-prices-btn">Update Prices</button>
        </div>
    );
};

export default PortfolioMonitorWidget;