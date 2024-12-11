// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import AddEmployeesPage from './pages/AddEmployeesPage';
import ClientsListPage from './pages/ClientsListPage';
import EmployeesPage from './pages/EmployeesPage';
import MachinesPage from './pages/MachinesPage';
import ChartsPage from './pages/ChartsPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/addEmployees' element={<AddEmployeesPage />} />
        <Route path='/clients' element={<ClientsListPage />} />
        <Route path='/employees' element={<EmployeesPage />} />
        <Route path='/machines' element={<MachinesPage />} />
        <Route path='/charts' element={<ChartsPage />} />

        
      </Routes>
    </Router>
  );
};

export default App;

