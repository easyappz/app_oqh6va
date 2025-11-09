import React from 'react';
import { Card, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div data-easytag="id1-react/src/pages/Home.js" className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card data-easytag="id2-react/src/pages/Home.js" className="max-w-2xl w-full shadow-lg">
        <div data-easytag="id3-react/src/pages/Home.js" className="text-center">
          <Title data-easytag="id4-react/src/pages/Home.js" level={1} className="text-blue-600">
            Добро пожаловать в EasyApp
          </Title>
          
          {isAuthenticated ? (
            <div data-easytag="id5-react/src/pages/Home.js">
              <Paragraph data-easytag="id6-react/src/pages/Home.js" className="text-lg mb-6">
                Здравствуйте, {user?.first_name} {user?.last_name}!
              </Paragraph>
              <Link to="/profile">
                <Button
                  data-easytag="id7-react/src/pages/Home.js"
                  type="primary"
                  size="large"
                  icon={<UserOutlined />}
                >
                  Перейти в профиль
                </Button>
              </Link>
            </div>
          ) : (
            <div data-easytag="id8-react/src/pages/Home.js">
              <Paragraph data-easytag="id9-react/src/pages/Home.js" className="text-lg mb-6">
                Пожалуйста, войдите в систему или зарегистрируйтесь, чтобы продолжить.
              </Paragraph>
              <div data-easytag="id10-react/src/pages/Home.js" className="flex gap-4 justify-center flex-wrap">
                <Link to="/login">
                  <Button
                    data-easytag="id11-react/src/pages/Home.js"
                    type="primary"
                    size="large"
                    icon={<LoginOutlined />}
                  >
                    Вход
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    data-easytag="id12-react/src/pages/Home.js"
                    size="large"
                    icon={<UserAddOutlined />}
                  >
                    Регистрация
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Home;
