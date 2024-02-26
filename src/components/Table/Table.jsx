import './Table.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../redux/userSlice';
import { React, useState, useEffect } from 'react';
import '../../../node_modules/tabulator-tables/dist/css/tabulator.min.css';
import { ReactTabulator } from 'react-tabulator';

function Table() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { title: "First Name", field: "firstName", width: 150 },
    { title: "Last Name", field: "lastName", width: 150},
    { title: "Date of Birth", field: "dateOfBirth", hozAlign: "center"},
    { title: "Start Date", field: "startDate", hozAlign: "center"},
    { title: "Department", field: "department"},
    { title: "Street", field: "street"},
    { title: "City", field: "city"},
    { title: "State", field: "state"},
    { title: "Zip Code", field: "zipCode", hozAlign: "center"},
  ];

  const handlePageChange = (e, page) => {
    setPage(page);
  };

  const handleSizeChange = (e, size) => {
    setSize(size);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [data, setData] = useState(users);

  useEffect(() => {
    console.log(users);
    const newData = JSON.parse(JSON.stringify(users));
    setData(newData);
  }, [users]);
  
  const filteredData = data.filter(item => {
    return Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className='wrapTabulator'>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className='searchTable'
      />
      <ReactTabulator
        key={Date.now()}
        data={filteredData}
        columns={columns}
        options={{
          layout: 'fitColumns',
          responsiveLayout: 'collapse',
          pagination: 'local',
          paginationSize: 10,
          paginationSizeSelector: [5, 10, 25, 50, 100],
          paginationCounter: 'rows',
          langs: {
            default: {
              pagination: {
                counter: {
                  showing: 'Showing',
                  of: 'of',
                  rows: 'entries',
                  pages: 'pages',
                },
              },
            },
          },
        }}
        page={page}
        size={size}
        total={filteredData.length}
        onPageChange={handlePageChange}
        onSizeChange={handleSizeChange}
      />
    </div>
  );
}

export default Table;
