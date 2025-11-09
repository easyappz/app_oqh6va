import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const { Title, Paragraph } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await loginUser({
        email: values.email,
        password: values.password,
      });
      login(response.access, response.refresh, response.user);
      message.success('Вход выполнен успешно!');
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.error) {
        message.error(error.response.data.error);
      } else {
        message.error('Ошибка при входе. Пожалуйста, проверьте ваши данные.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/Login.js" className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card data-easytag="id2-react/src/pages/Login.js" className="max-w-md w-full shadow-lg">
        <div data-easytag="id3-react/src/pages/Login.js" className="text-center mb-6">
          <Title data-easytag="id4-react/src/pages/Login.js" level={2} className="text-blue-600">
            Вход
          </Title>
          <Paragraph data-easytag="id5-react/src/pages/Login.js" className="text-gray-600">
            Войдите в свой аккаунт
          </Paragraph>
        </div>

        <Form
          data-easytag="id6-react/src/pages/Login.js"
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            data-easytag="id7-react/src/pages/Login.js"
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите email!',
              },
              {
                type: 'email',
                message: 'Введите корректный email!',
              },
            ]}
          >
            <Input
              data-easytag="id8-react/src/pages/Login.js"
              prefix={<MailOutlined />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id9-react/src/pages/Login.js"
            name="password"
            label="Пароль"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пароль!',
              },
            ]}
          >
            <Input.Password
              data-easytag="id10-react/src/pages/Login.js"
              prefix={<LockOutlined />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item data-easytag="id11-react/src/pages/Login.js">
            <Button
              data-easytag="id12-react/src/pages/Login.js"
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>

        <div data-easytag="id13-react/src/pages/Login.js" className="text-center">
          <Paragraph data-easytag="id14-react/src/pages/Login.js">
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default Login;
