import Header from "../components/Header/Header";
import Table from "../components/Table/Table";

function List() {

    return (
        <div>
            <Header page='list' />
            <p>Employee list</p>
            <Table />
        </div>
    );
}

export default List;