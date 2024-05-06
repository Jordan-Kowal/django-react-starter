import React, { memo, useCallback, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { PasswordForm, ProfileForm } from '@/components/features/User';
import { IconCard, PageBanner, Space } from '@/components/ui';
import { apiCall } from '@/services/api';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const onProfileUpdate = useCallback(
    async (values) =>
      apiCall(
        'currentUser',
        'updateCurrentUser',
        values,
        'Votre profil a été mis à jour',
        'Une erreur est survenue lors de la mise à jour de votre profil'
      ),
    []
  );

  const onPasswordUpdate = useCallback(
    async (values) =>
      apiCall(
        'currentUser',
        'updatePassword',
        values,
        'Votre mot de passe a été mis à jour',
        'Une erreur est survenue lors de la mise à jour de votre mot de passe'
      ),
    []
  );

  const showProfileForm = useCallback(() => setActiveTab(1), []);
  const showPasswordForm = useCallback(() => setActiveTab(2), []);

  return (
    <Space block vertical size={40}>
      <PageBanner label="Profil" icon={<UserOutlined />} />
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
