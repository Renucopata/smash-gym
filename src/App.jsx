// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import AddEmployeesPage from './pages/AddEmployeesPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/addEmployees' element={<AddEmployeesPage />} />
      </Routes>
    </Router>
  );
};

export default App;

