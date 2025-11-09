import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import ErrorBoundary from './ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './App.css';

const { Content } = Layout;

function App() {
  useEffect(() => {
    if (window.handleRoutes) {
      window.handleRoutes(['/', '/register', '/login', '/profile']);
    }
  }, []);

  return (
    <ErrorBoundary>
      <ConfigProvider locale={ruRU}>
        <Router>
          <AuthProvider>
            <Layout data-easytag="id1-react/src/App.js" className="min-h-screen">
              <Header />
              <Content data-easytag="id2-react/src/App.js">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </Content>
            </Layout>
          </AuthProvider>
        </Router>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
