import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import HomePage from './pages/HomePage';
import TracerPage from './pages/TracerPage';
import AnalysisPage from './pages/AnalysisPage';
import ConfigurationPage from './pages/ConfigurationPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tracer" element={<TracerPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/config" element={<ConfigurationPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
