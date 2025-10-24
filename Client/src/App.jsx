import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TemplateSelector from './pages/TemplateSelector';
import Editor from './pages/Editor';
import Preview from './pages/Preview';
import Header from './components/Header';
import Footer from './components/Footer';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      {/* Header outside Routes */}
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/templates" element={<PrivateRoute><TemplateSelector /></PrivateRoute>} />
        <Route path="/editor" element={<PrivateRoute><Editor /></PrivateRoute>} />
        <Route path="/preview/:userId" element={<Preview />} />
      </Routes>

      {/* Footer outside Routes */}
      <Footer />
    </BrowserRouter>
  );
}
