import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import parseCSV from '../utils/parseCSV';
import '../styles/Table.css';

const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await parseCSV('src/data/data.csv');
      setData(result);
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSearch = e => {
    setSearch(e.target.value);
    const filteredData = data.filter(item =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <div className="table-container">
      <SearchBar handleSearch={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Anugerah</th>
            <th>Singkatan</th>
            <th>Tahun</th>
            <th>Peringkat</th>
            <th>Gelaran</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.no}</td>
              <td>{item.nama}</td>
              <td>{item.anugerah}</td>
              <td>{item.singkatan}</td>
              <td>{item.tahun}</td>
              <td>{item.peringkat}</td>
              <td>{item.gelaran}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Table;