import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';

const { Title, Paragraph } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await registerUser({
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
        password_confirm: values.password_confirm,
      });
      message.success('Регистрация прошла успешно! Теперь вы можете войти.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data) {
        const errorData = error.response.data;
        Object.keys(errorData).forEach((key) => {
          const errorMessage = Array.isArray(errorData[key])
            ? errorData[key][0]
            : errorData[key];
          message.error(`${key}: ${errorMessage}`);
        });
      } else {
        message.error('Ошибка при регистрации. Пожалуйста, попробуйте снова.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/Register.js" className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card data-easytag="id2-react/src/pages/Register.js" className="max-w-md w-full shadow-lg">
        <div data-easytag="id3-react/src/pages/Register.js" className="text-center mb-6">
          <Title data-easytag="id4-react/src/pages/Register.js" level={2} className="text-blue-600">
            Регистрация
          </Title>
          <Paragraph data-easytag="id5-react/src/pages/Register.js" className="text-gray-600">
            Создайте новый аккаунт
          </Paragraph>
        </div>

        <Form
          data-easytag="id6-react/src/pages/Register.js"
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            data-easytag="id7-react/src/pages/Register.js"
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
              data-easytag="id8-react/src/pages/Register.js"
              prefix={<MailOutlined />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id9-react/src/pages/Register.js"
            name="first_name"
            label="Имя"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите имя!',
              },
            ]}
          >
            <Input
              data-easytag="id10-react/src/pages/Register.js"
              prefix={<UserOutlined />}
              placeholder="Имя"
              size="large"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id11-react/src/pages/Register.js"
            name="last_name"
            label="Фамилия"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите фамилию!',
              },
            ]}
          >
            <Input
              data-easytag="id12-react/src/pages/Register.js"
              prefix={<UserOutlined />}
              placeholder="Фамилия"
              size="large"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id13-react/src/pages/Register.js"
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
              data-easytag="id14-react/src/pages/Register.js"
              prefix={<LockOutlined />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id15-react/src/pages/Register.js"
            name="password_confirm"
            label="Подтверждение пароля"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Пожалуйста, подтвердите пароль!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password
              data-easytag="id16-react/src/pages/Register.js"
              prefix={<LockOutlined />}
              placeholder="Подтверждение пароля"
              size="large"
            />
          </Form.Item>

          <Form.Item data-easytag="id17-react/src/pages/Register.js">
            <Button
              data-easytag="id18-react/src/pages/Register.js"
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>

        <div data-easytag="id19-react/src/pages/Register.js" className="text-center">
          <Paragraph data-easytag="id20-react/src/pages/Register.js">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default Register;
