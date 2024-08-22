import {
  FormTabButton,
  PasswordForm,
  ProfileForm,
} from "@/components/features/User";
import { PageBanner } from "@/components/layout";
import { Space } from "@/components/ui";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import type React from "react";
import { memo, useCallback, useState } from "react";

const ProfilePage: React.FC = memo(() => {
  const [activeTab, setActiveTab] = useState(1);
  const showProfileForm = useCallback(() => setActiveTab(1), []);
  const showPasswordForm = useCallback(() => setActiveTab(2), []);

  return (
    <Space block vertical size={40} data-testid="profile-page">
      <PageBanner label="Profil" icon={<UserOutlined />} />
      <Space block centered size={20}>
        <FormTabButton
          dataTestId="profile-tab-button"
          icon={<UserOutlined className="text-7xl" />}
          title="Profil"
          isActive={activeTab === 1}
          onClick={showProfileForm}
        />
        <FormTabButton
          dataTestId="password-tab-button"
          icon={<LockOutlined className="text-7xl" />}
          title="Mot de passe"
          isActive={activeTab === 2}
          onClick={showPasswordForm}
        />
      </Space>
      {activeTab === 1 && <ProfileForm />}
      {activeTab === 2 && <PasswordForm />}
    </Space>
  );
});

export default ProfilePage;
