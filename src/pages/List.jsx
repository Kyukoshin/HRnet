import React from 'react';
import { useDispatch } from 'react-redux';
import Header from "../components/Header/Header";
import Table from "../components/Table/Table";
import { purgeUsers } from '../redux/userSlice';
import { Helmet } from "react-helmet";

function List() {

    const dispatch = useDispatch();

    //Purge persistor button
    const handlePurge = () => {
        dispatch(purgeUsers())
    };

    return (
        <div className='wrapList'>

            <Helmet>
                <meta
                    name="description"
                    content="Display of a table of all available employees"/>
            </Helmet>

            <Header page='list' />
            <h1>Employee list</h1>
            <Table />

            <button onClick={handlePurge} className='purgeButton'>
                Purge Persistor
            </button>
        </div>
    );
}

export default List;