import { useUpdatePassword } from "@/api/self";
import { NonFieldErrors } from "@/components/forms";
import { useFormSubmit } from "@/hooks";
import { required } from "@/utils/forms";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import type React from "react";
import { memo } from "react";
import { FormCard } from "../FormCard";

const labelCol = { flex: "300px" };

export const PasswordForm: React.FC = memo(() => {
  const [form] = Form.useForm();
  const updatePassword = useUpdatePassword(form);
  const [inProgress, submit] = useFormSubmit(updatePassword.mutate);

  return (
    <Form
      form={form}
      onFinish={submit}
      labelAlign="left"
      labelCol={labelCol}
      autoComplete="off"
      disabled={inProgress}
      data-testid="password-form"
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
});
