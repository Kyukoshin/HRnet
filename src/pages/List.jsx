import React from 'react';
import { useDispatch } from 'react-redux';
import Header from "../components/Header/Header";
import Table from "../components/Table/Table";
import { purgeUsers } from '../redux/userSlice';

function List() {

    const dispatch = useDispatch();

    //Purge persistor button
    const handlePurge = () => {
        dispatch(purgeUsers())
    };

    return (
        <div>
            <Header page='list' />
            <p>Employee list</p>
            <Table />

            <button onClick={handlePurge}>
                Purge Persistor
            </button>
        </div>
    );
}

export default List;