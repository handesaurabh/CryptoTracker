import React from 'react';
import './CryptoTable.css';

const CryptoTable = ({ cryptoData }) => {
  // Format numbers with commas
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return num.toFixed(2);
  };

  if (!cryptoData || cryptoData.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  return (
    <table className="crypto-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price (USD)</th>
          <th>Market Cap</th>
          <th>Total Volume</th>
          <th>% Change</th>
        </tr>
      </thead>
      <tbody>
        {cryptoData.map((crypto) => (
          <tr key={crypto.id}>
            <td><img src={crypto.image} alt={crypto.name} className="crypto-image" /></td>
            <td>{crypto.name}</td>
            <td>{crypto.symbol.toUpperCase()}</td>
            <td>${formatNumber(crypto.current_price)}</td>
            <td>${formatNumber(crypto.market_cap)}</td>
            <td>${formatNumber(crypto.total_volume)}</td>
            <td className={crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTable;