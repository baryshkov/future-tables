import React, { useEffect, useState } from 'react';
import ApiService from './fetcher/apiService';
import './App.css';
import Table from './Table';

const TABLE_SCHEMA = [
  {
    Header: 'id',
    accessor: 'id',
  },
  {
    Header: 'firstName',
    accessor: 'firstName',
  },
  {
    Header: 'lastName',
    accessor: 'lastName',
  },
  {
    Header: 'email',
    accessor: 'email',
  },
  {
    Header: 'phone',
    accessor: 'phone',
  },
];

const App = () => {
  const apiService = new ApiService();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiService.fetchBigData();
        setTableData(data);
      } catch (error) {
        // TODO: here should be good error handling
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const addRow = data => {
    setTableData([data, ...tableData]);
  };

  return (
    <div className="App">
      <header>Tabel Data Table</header>
      <Table data={tableData} columns={TABLE_SCHEMA} />
    </div>
  );
};

export default App;
