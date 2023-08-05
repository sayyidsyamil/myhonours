import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Table from './components/Table';
import SearchBar from './components/SearchBar';
import parseCSV from './utils/parseCSV';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      const parsedData = await parseCSV('./data/data.csv');
      setData(parsedData);
    }
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (s) => s?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      <Table data={filteredData} />
    </div>
  );
}

export default App;