import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import ManageVehicles from './pages/ManageVehicles';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/manage-vehicles">Manage Vehicles</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-vehicles" element={<ManageVehicles />} />
      </Routes>
    </Router>
  );
}

export default App;