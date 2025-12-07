import React, { useState, useEffect } from 'react';
import CryptoTable from './components/CryptoTable';
import SearchBar from './components/SearchBar';
import SortButtons from './components/SortButtons';
import './App.css';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch data using .then()
  const fetchDataWithThen = () => {
    console.log('Fetching data with .then()');
    setLoading(true);
    setError('');
    
    fetch(API_URL)
      .then(response => {
        console.log('Received response with .then()');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received with .then():', data);
        setCryptoData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data with .then(): ' + error.message);
        setLoading(false);
      });
  };

  // Fetch data using async/await
  const fetchDataWithAsync = async () => {
    console.log('Fetching data with async/await');
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(API_URL);
      console.log('Received response with async/await');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data received with async/await:', data);
      setCryptoData(data);
      setFilteredData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data with async/await: ' + error.message);
      setLoading(false);
    }
  };

  // Search functionality
  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(cryptoData);
      return;
    }
    
    const filtered = cryptoData.filter(crypto => 
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredData(filtered);
  }, [searchQuery, cryptoData]);

  // Sort by market cap
  const sortByMarketCap = () => {
    const sortedData = [...filteredData].sort((a, b) => b.market_cap - a.market_cap);
    setFilteredData(sortedData);
  };

  // Sort by percentage change
  const sortByPercentageChange = () => {
    const sortedData = [...filteredData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    setFilteredData(sortedData);
  };

  // Initial load with .then method
  useEffect(() => {
    fetchDataWithThen();
  }, []);

  return (
    <div className="App">
      <h1>Cryptocurrency Tracker</h1>
      
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <SortButtons 
        sortByMarketCap={sortByMarketCap} 
        sortByPercentageChange={sortByPercentageChange} 
      />
      
      <div className="fetch-buttons">
        <button onClick={() => {
          console.log('Fetch with .then button clicked');
          fetchDataWithThen();
        }} className="fetch-button">
          Fetch Data with .then()
        </button>
        <button onClick={() => {
          console.log('Fetch with async/await button clicked');
          fetchDataWithAsync();
        }} className="fetch-button">
          Fetch Data with async/await
        </button>
      </div>
      
      <CryptoTable cryptoData={filteredData} />
    </div>
  );
}

export default App;