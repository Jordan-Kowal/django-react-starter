import React, { memo } from 'react';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { required } from '@/core/forms';
import { useSafeSubmit } from '@/hooks';
import FormCard from '../FormCard';
import NonFieldErrors from '../NonFieldErrors';

const labelCol = { flex: '300px' };

const PasswordForm = ({ onFinish }) => {
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
    >
      <FormCard
        title="Modifier son mot de passe"
        submitText="Mettre à jour"
        isLoading={inProgress}
      >
        <NonFieldErrors />
        <Form.Item
          label="Mot de passe actuel"
          name="currentPassword"
          rules={[required]}
        >
          <Input.Password prefix={<UnlockOutlined />} />
        </Form.Item>
        <Form.Item
          label="Nouveau mot de passe"
          name="password"
          rules={[required]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item
          label="Confirmer le nouveau mot de passe"
          name="confirmPassword"
          rules={[required]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
      </FormCard>
    </Form>
  );
};

PasswordForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default memo(PasswordForm);
