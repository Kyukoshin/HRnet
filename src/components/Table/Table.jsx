import './Table.css';

import { useState } from 'react';

import '../../../node_modules/tabulator-tables/dist/css/tabulator.min.css';
import { ReactTabulator } from 'react-tabulator'

function Table() {

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    const columns = [
        { title: "First Name", field: "firstName", width: 150 },
        { title: "Last Name", field: "lastName", width: 150 },
        { title: "Date of Birth", field: "dateOfBirth", hozAlign: "center" },
        { title: "Start Date", field: "startDate", hozAlign: "center" },
        { title: "Department", field: "department" },
        { title: "Street", field: "street" },
        { title: "City", field: "city" },
        { title: "State", field: "state" },
        { title: "Zip Code", field: "zipCode", hozAlign: "center" },
    ];

    var data = [
        { id: 1, firstName: "John", lastName: "Doe", dateOfBirth: "1990-05-12", startDate: "2020-01-01", department: "Marketing", street: "123 Main Street", city: "New York", state: "NY", zipCode: "10001" },
        { id: 2, firstName: "Jack", lastName: "Black", dateOfBirth: "1992-07-23", startDate: "2022-10-12", department: "Sales", street: "145 Second Street", city: "Chicago", state: "WN", zipCode: "25847" }
    ];

    const handlePageChange = (e, page) => {
        setPage(page);
    };

    const handleSizeChange = (e, size) => {
        setSize(size);
    };


    return (
        <div>
            <ReactTabulator
                key={Date.now()}
                data={data}
                columns={columns}
                options={{
                    layout: 'fitColumns',
                    responsiveLayout: 'collapse',
                    pagination: 'local',
                    paginationSize: 10,
                    paginationSizeSelector: [10, 25, 50, 100],
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
                total={data.length}
                onPageChange={handlePageChange}
                onSizeChange={handleSizeChange}


            />
        </div>
    );
}

export default Table;