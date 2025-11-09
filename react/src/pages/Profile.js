import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Button, Form, Input, Typography, message, Spin } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile, getUserProfile } from '../api/auth';

const { Title } = Typography;

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getUserProfile();
      setProfileData(data);
      updateUser(data);
      form.setFieldsValue({
        first_name: data.first_name,
        last_name: data.last_name,
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      message.error('Ошибка при загрузке профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    form.setFieldsValue({
      first_name: profileData.first_name,
      last_name: profileData.last_name,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const updatedData = await updateUserProfile({
        first_name: values.first_name,
        last_name: values.last_name,
      });
      setProfileData(updatedData);
      updateUser(updatedData);
      setEditing(false);
      message.success('Профиль успешно обновлен!');
    } catch (error) {
      console.error('Update profile error:', error);
      message.error('Ошибка при обновлении профиля');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profileData) {
    return (
      <div data-easytag="id1-react/src/pages/Profile.js" className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div data-easytag="id2-react/src/pages/Profile.js" className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card data-easytag="id3-react/src/pages/Profile.js" className="max-w-2xl w-full shadow-lg">
        <div data-easytag="id4-react/src/pages/Profile.js" className="mb-6">
          <Title data-easytag="id5-react/src/pages/Profile.js" level={2} className="text-blue-600">
            Профиль пользователя
          </Title>
        </div>

        {!editing ? (
          <div data-easytag="id6-react/src/pages/Profile.js">
            <Descriptions data-easytag="id7-react/src/pages/Profile.js" bordered column={1} size="middle">
              <Descriptions.Item data-easytag="id8-react/src/pages/Profile.js" label="Email">
                {profileData?.email || user?.email}
              </Descriptions.Item>
              <Descriptions.Item data-easytag="id9-react/src/pages/Profile.js" label="Имя">
                {profileData?.first_name || user?.first_name}
              </Descriptions.Item>
              <Descriptions.Item data-easytag="id10-react/src/pages/Profile.js" label="Фамилия">
                {profileData?.last_name || user?.last_name}
              </Descriptions.Item>
            </Descriptions>
            <div data-easytag="id11-react/src/pages/Profile.js" className="mt-6">
              <Button
                data-easytag="id12-react/src/pages/Profile.js"
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
                size="large"
              >
                Редактировать профиль
              </Button>
            </div>
          </div>
        ) : (
          <Form
            data-easytag="id13-react/src/pages/Profile.js"
            form={form}
            name="profile"
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item data-easytag="id14-react/src/pages/Profile.js" label="Email">
              <Input
                data-easytag="id15-react/src/pages/Profile.js"
                value={profileData?.email || user?.email}
                disabled
                size="large"
              />
            </Form.Item>

            <Form.Item
              data-easytag="id16-react/src/pages/Profile.js"
              name="first_name"
              label="Имя"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите имя!',
                },
              ]}
            >
              <Input data-easytag="id17-react/src/pages/Profile.js" placeholder="Имя" size="large" />
            </Form.Item>

            <Form.Item
              data-easytag="id18-react/src/pages/Profile.js"
              name="last_name"
              label="Фамилия"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите фамилию!',
                },
              ]}
            >
              <Input data-easytag="id19-react/src/pages/Profile.js" placeholder="Фамилия" size="large" />
            </Form.Item>

            <Form.Item data-easytag="id20-react/src/pages/Profile.js">
              <div data-easytag="id21-react/src/pages/Profile.js" className="flex gap-4">
                <Button
                  data-easytag="id22-react/src/pages/Profile.js"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                  size="large"
                >
                  Сохранить
                </Button>
                <Button
                  data-easytag="id23-react/src/pages/Profile.js"
                  onClick={handleCancel}
                  icon={<CloseOutlined />}
                  size="large"
                >
                  Отмена
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default Profile;
