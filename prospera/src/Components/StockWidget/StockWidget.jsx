// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

// Add widget.configuration data to get names of stocks entered + default periods
function StockWidget({ data }) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
  
    // Filter out empty stock entries and map to the required format
    const stockSymbols = data.stocks
      .filter(stock => stock.symbol && stock.period)
      .map(stock => [stock.symbol, `${stock.symbol}|${stock.period}`]);
  
    const widgetConfig = {
      symbols: stockSymbols,
      chartOnly: false,
      width: "100%",
      height: "100%",
      locale: "en",
      colorTheme: "dark",
      autosize: true,
      showVolume: false,
      showMA: false,
      headerFontSize: "medium",
      lineWidth: 2,
      lineType: 0,
      dateRanges: [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ]
    };
  
    script.innerHTML = JSON.stringify(widgetConfig);
    container.current.appendChild(script);
    
  }, []); // Add data as a dependency
  
  // useEffect(
  //   () => {
  //     const script = document.createElement("script");
  //     script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
  //     script.type = "text/javascript";
  //     script.async = true;

  //     // Filter out empty stock entries and map to the required format
  //     const stockSymbols = data.stocks
  //     .filter(stock => stock.symbol && stock.period)
  //     .map(stock => [stock.symbol, `${stock.symbol}|${stock.period}`]);

  //     script.innerHTML = `
  //       {
  //         "symbols": [
  //           [
  //             "Apple",
  //             "AAPL|1D"
  //           ],
  //           [
  //             "Google",
  //             "GOOGL|1D"
  //           ],
  //           [
  //             "Microsoft",
  //             "MSFT|1D"
  //           ],
  //           [
  //             "BINANCE:BTCUSDT|1D"
  //           ],
  //           [
  //             "NASDAQ:AMD|1M"
  //           ]
  //         ],
  //         "chartOnly": false,
  //         "width": "100%",
  //         "height": "100%",
  //         "locale": "en",
  //         "colorTheme": "dark",
  //         "autosize": true,
  //         "showVolume": false,
  //         "showMA": false,
  //         "headerFontSize": "medium",
  //         "lineWidth": 2,
  //         "lineType": 0,
  //         "dateRanges": [
  //           "1d|1",
  //           "1m|30",
  //           "3m|60",
  //           "12m|1D",
  //           "60m|1W",
  //           "all|1M"
  //         ]
  //       }`;
  //     container.current.appendChild(script);
  //   },
  //   []
  // );
  
  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
  );
}

export default memo(StockWidget);