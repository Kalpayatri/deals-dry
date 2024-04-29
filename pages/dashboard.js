import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import EmployeeList from '../components/EmployeeList';

const Dashboard = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); 

  return (
    <div>
        <NavBar/>
      <h1>Welcome, {username}</h1>
      <EmployeeList />
    </div>
  );
};

export default Dashboard;

