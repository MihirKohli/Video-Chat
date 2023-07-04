import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './authPages/LoginPage/LoginPage';
import RegisterPage from './authPages/RegisterPage/RegisterPage';
import Dashboard from './Dash/Dashboard';
import AlertNotification from './shared/components/AlertNotification';

function App() {
  return (
    <>
      <Router>
        <Routes>

        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </Router>

    <AlertNotification/>

    </>
  );
}

export default App;
