import { CheckOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { memo } from "react";
import styles from "./styles.module.less";

const FormCard = ({ children, className, isLoading, title, submitText }) => (
  <Card
    actions={[
      <Button
        key={"submit"}
        type="primary"
        htmlType="submit"
        loading={isLoading}
        icon={<CheckOutlined />}
      >
        {submitText}
      </Button>,
    ]}
    className={classNames(styles.formCard, className)}
    title={title}
  >
    {children}
  </Card>
);

FormCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  submitText: PropTypes.string,
};

export default memo(FormCard);
