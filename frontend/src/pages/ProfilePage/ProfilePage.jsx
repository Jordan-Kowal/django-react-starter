import React, { memo, useCallback, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import {
  IconCard,
  PageBanner,
  PasswordForm,
  ProfileForm,
  Space,
} from '@/components';
import { apiCall } from '@/services/api';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const onProfileUpdate = useCallback(async (values) => {
    try {
      await apiCall('currentUser', 'updateCurrentUser', values);
      message.success('Votre profil a été mis à jour');
    } catch {
      message.error(
        'Une erreur est survenue lors de la mise à jour de votre profil'
      );
    }
  }, []);

  const onPasswordUpdate = useCallback(async (values) => {
    try {
      await apiCall('currentUser', 'updatePassword', values);
      message.success('Votre mot de passe a été mis à jour');
    } catch {
      message.error(
        'Une erreur est survenue lors de la mise à jour de votre mot de passe'
      );
    }
  }, []);

  const showProfileForm = useCallback(() => setActiveTab(1), []);
  const showPasswordForm = useCallback(() => setActiveTab(2), []);

  return (
    <Space block vertical size={40}>
      <PageBanner
        label="Profil"
        description="Mettez à jour vos informations personnelles"
      />
      <Space block centered size={20}>
        <IconCard
          icon={<UserOutlined />}
          text="Profil"
          isActive={activeTab === 1}
          onClick={showProfileForm}
        />
        <IconCard
          icon={<LockOutlined />}
          text="Mot de passe"
          isActive={activeTab === 2}
          onClick={showPasswordForm}
        />
      </Space>

      {activeTab === 1 && <ProfileForm onFinish={onProfileUpdate} />}
      {activeTab === 2 && <PasswordForm onFinish={onPasswordUpdate} />}
    </Space>
  );
};

ProfilePage.propTypes = {};

export default memo(ProfilePage);
