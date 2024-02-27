import React, { useMemo, useEffect, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../redux/userSlice';

import './Table.css';
import '../../../node_modules/tabulator-tables/dist/css/tabulator.min.css';

function Table() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "firstName", width: 150 },
      { Header: "Last Name", accessor: "lastName", width: 150 },
      {
        Header: "Date of Birth",
        accessor: "dateOfBirth",
        Cell: ({ value }) => {
          const date = value instanceof Date ? value.toLocaleDateString() : value;
          return <span>{date}</span>;
        },
        width: 150,
      },
      {
        Header: "Start Date",
        accessor: "startDate",
        Cell: ({ value }) => {
          const date = value instanceof Date ? value.toLocaleDateString() : value;
          return <span>{date}</span>;
        },
        width: 150,
      },
      { Header: "Department", accessor: "department" },
      { Header: "Street", accessor: "street" },
      { Header: "City", accessor: "city" },
      { Header: "State", accessor: "state" },
      { Header: "Zip Code", accessor: "zipCode", width: 100 },
    ],
    []
  );

  const [data, setData] = useState(users);

  useEffect(() => {
    setData(users);
  }, [users]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    // pagination and sorting variables and functions
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className='wrapTabulator'>
      <input
        type="text"
        placeholder="Search..."
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className='searchTable'
      />
      <table {...getTableProps()} className="react-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        </div>
        <span>
          <label>Show{' '}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>{' '}
            rows per page
          </label>
        </span>
      </div>
    </div>
  );
}

export default Table;
