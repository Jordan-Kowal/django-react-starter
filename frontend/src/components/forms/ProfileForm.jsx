import React, { memo } from 'react';
import { GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { required } from '@/core/forms';
import { useSafeSubmit } from '@/hooks';
import { useAuthStore } from '@/stores';
import { FormCard, NonFieldErrors } from './components';

const labelCol = { flex: '150px' };

const ProfileForm = ({ onFinish }) => {
  const user = useAuthStore((state) => state.user);
  const [form] = Form.useForm();
  const [inProgress, safeSubmit] = useSafeSubmit(onFinish, form);

  return (
    <Form
      form={form}
      onFinish={safeSubmit}
      labelAlign="left"
      labelCol={labelCol}
      autoComplete="off"
      disabled={inProgress}
      initialValues={user}
    >
      <FormCard
        title="Modifier son profil utilisateur"
        submitText="Mettre à jour"
        isLoading={inProgress}
      >
        <NonFieldErrors />
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Veuillez saisir une adresse email valide',
            },
          ]}
        >
          <Input prefix={<GlobalOutlined />} />
        </Form.Item>
        <Form.Item label="Prénom" name="firstName" rules={[required]}>
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label="Nom" name="lastName" rules={[required]}>
          <Input prefix={<UserOutlined />} />
        </Form.Item>
      </FormCard>
    </Form>
  );
};

ProfileForm.propTypes = { onFinish: PropTypes.func.isRequired };

export default memo(ProfileForm);
