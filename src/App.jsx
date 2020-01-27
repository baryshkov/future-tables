/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { Container, Button, Alert } from 'reactstrap';
import ApiService from './fetcher/apiService';
import './App.css';
import Table from './Table';
import FullInfo from './Info';
import Spinner from './Spinner';
import AddRow from './AddRow';

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
  const [dataAmout, setDataAmout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [tableData, setTableData] = useState(null);
  const [expandedInfo, setExpandedInfo] = useState(null);

  const apiService = new ApiService();

  const fetchData = async fetcher => {
    setIsError(false);
    setIsLoading(true);
    setExpandedInfo(null);
    try {
      const { data } = await fetcher();
      setTableData(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (dataAmout === 'BIG') {
      fetchData(apiService.fetchBigData);
    } else if (dataAmout === 'SMALL') {
      fetchData(apiService.fetchSmallData);
    }
  }, [dataAmout]);

  const addRow = data => {
    setTableData([data, ...tableData]);
  };

  const errorMessage = (
    <Alert className="error" color="danger">
      Something went wrong... Try fetching again.
    </Alert>
  );

  return (
    <Container fluid="lg">
      <Button
        color="warning"
        className="fetch-button"
        onClick={() => setDataAmout('BIG')}
        disabled={isLoading}
      >
        Fetch big
      </Button>
      <Button
        color="warning"
        className="fetch-button"
        onClick={() => setDataAmout('SMALL')}
        disabled={isLoading}
      >
        Fetch small
      </Button>
      {tableData && !isLoading && <AddRow addRow={data => addRow(data)} />}
      {(isLoading && <Spinner />) ||
        (isError && errorMessage) ||
        (tableData && (
          <Table data={tableData} columns={TABLE_SCHEMA} expandInfo={setExpandedInfo} />
        ))}
      <Container fluid="md">{expandedInfo && <FullInfo contact={expandedInfo} />}</Container>
    </Container>
  );
};

export default App;
