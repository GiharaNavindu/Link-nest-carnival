import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        {/* Add more routes here as needed */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
