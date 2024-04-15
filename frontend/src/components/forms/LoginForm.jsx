import React, { memo } from 'react';
import { GlobalOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { required } from '@/core/forms';
import { useSafeSubmit } from '@/hooks';
import { FormCard, NonFieldErrors } from './components';

const labelCol = { flex: '150px' };

const LoginForm = ({ onFinish }) => {
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
        title="Formulaire de connexion"
        submitText="Me connecter"
        isLoading={inProgress}
      >
        <NonFieldErrors />
        <Form.Item label="Adresse email" name="email" rules={[required]}>
          <Input type="email" prefix={<GlobalOutlined />} />
        </Form.Item>
        <Form.Item label="Mot de passe" name="password" rules={[required]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
      </FormCard>
    </Form>
  );
};

LoginForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default memo(LoginForm);
