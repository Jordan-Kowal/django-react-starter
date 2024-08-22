import { useLogin } from "@/api/auth";
import { NonFieldErrors } from "@/components/forms";
import { useFormSubmit } from "@/hooks";
import { required } from "@/utils/forms";
import { GlobalOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import type React from "react";
import { memo } from "react";
import { FormCard } from "../FormCard";

const labelCol = { flex: "150px" };

export const LoginForm: React.FC = memo(() => {
  const [form] = Form.useForm();
  const login = useLogin(form);

  const [inProgress, submit] = useFormSubmit(login.mutate);

  return (
    <Form
      form={form}
      onFinish={submit}
      labelAlign="left"
      labelCol={labelCol}
      autoComplete="off"
      disabled={inProgress}
      data-testid="login-form"
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
});
