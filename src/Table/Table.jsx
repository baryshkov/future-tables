import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Table as TableElement, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './Table.css';

import SearchField from '../SearchField';

const Table = ({ data, columns, expandInfo }) => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex },
  } = useTable(
    { data, columns, initialState: { pageSize: 50 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const buttons = [];

  for (let i = 0; i < pageCount; i += 1) {
    buttons.push(
      <PaginationItem key={i} active={i === pageIndex}>
        <PaginationLink key={i} onClick={() => gotoPage(i)}>
          {i + 1}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  return (
    <>
      <SearchField setGlobalFilter={setGlobalFilter} gotoPage={gotoPage} />
      <TableElement {...getTableProps()} bordered hover>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <button className="btn-header">
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}</span>
                  </button>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={selectedRowId === row.id ? 'tr-clicked' : null}
                onClick={() => {
                  expandInfo(row.original);
                  setSelectedRowId(row.id);
                  console.log(row);
                }}
              >
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </TableElement>
      {pageCount > 1 && (
        <Pagination>
          <PaginationItem disabled={!canPreviousPage}>
            <PaginationLink previous onClick={() => previousPage()} />
          </PaginationItem>
          <PaginationItem disabled={!canNextPage}>
            <PaginationLink next onClick={() => nextPage()} />
          </PaginationItem>
          {buttons}
        </Pagination>
      )}
    </>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  expandInfo: PropTypes.func.isRequired,
};

export default Table;
