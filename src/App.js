import { Routes, Route, Router } from 'react-router-dom';
import "./styles.css";
import Create from './pages/Create'
import List from './pages/List'
import Error from './pages/Error'

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/*" element={<Error />} />
      </Routes>
  );
}
