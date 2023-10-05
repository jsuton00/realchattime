import React from 'react';
import Room from './pages/Room';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrivateRoutes from './components/PrivateRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={RegisterPage} />
        <Route path="/login" element={LoginPage} />
        <Route element={PrivateRoutes}>
          <Route path="/myRoom" element={Room} />
        </Route>
      </Routes>
      <Room />
    </Router>
  );
};

export default App;
