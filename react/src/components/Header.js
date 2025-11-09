import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, UserOutlined, LoginOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../api/auth';

const { Header: AntHeader } = Layout;

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await logoutUser(refreshToken);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
      navigate('/login');
    }
  };

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/" data-easytag="id1-react/src/components/Header.js">Главная</Link>,
    },
  ];

  if (!isAuthenticated) {
    menuItems.push(
      {
        key: '/login',
        icon: <LoginOutlined />,
        label: <Link to="/login" data-easytag="id2-react/src/components/Header.js">Вход</Link>,
      },
      {
        key: '/register',
        icon: <UserAddOutlined />,
        label: <Link to="/register" data-easytag="id3-react/src/components/Header.js">Регистрация</Link>,
      }
    );
  } else {
    menuItems.push(
      {
        key: '/profile',
        icon: <UserOutlined />,
        label: <Link to="/profile" data-easytag="id4-react/src/components/Header.js">Профиль</Link>,
      }
    );
  }

  return (
    <AntHeader data-easytag="id5-react/src/components/Header.js" className="flex items-center justify-between px-6 bg-white shadow-md">
      <div data-easytag="id6-react/src/components/Header.js" className="flex items-center">
        <div data-easytag="id7-react/src/components/Header.js" className="text-xl font-bold text-blue-600 mr-8">
          EasyApp
        </div>
        <Menu
          data-easytag="id8-react/src/components/Header.js"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="flex-1 border-0"
        />
      </div>
      {isAuthenticated && (
        <Button
          data-easytag="id9-react/src/components/Header.js"
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Выйти
        </Button>
      )}
    </AntHeader>
  );
};

export default Header;
