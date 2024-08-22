import { useSelf, useUpdateSelf } from "@/api/self";
import { NonFieldErrors } from "@/components/forms";
import { useFormSubmit } from "@/hooks";
import { required } from "@/utils/forms";
import { GlobalOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import type React from "react";
import { memo } from "react";
import { FormCard } from "../FormCard";

const labelCol = { flex: "150px" };

export const ProfileForm: React.FC = memo(() => {
  const { data: user } = useSelf();
  const [form] = Form.useForm();
  const updateSelf = useUpdateSelf(form);

  const [inProgress, submit] = useFormSubmit(updateSelf.mutate);

  return (
    <Form
      form={form}
      onFinish={submit}
      labelAlign="left"
      labelCol={labelCol}
      autoComplete="off"
      disabled={inProgress}
      initialValues={user}
      data-testid="profile-form"
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
              type: "email",
              message: "Veuillez saisir une adresse email valide",
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
});
