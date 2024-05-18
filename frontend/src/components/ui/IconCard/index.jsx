import { Card, Typography } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { memo } from "react";
import Space from "../Space";
import styles from "./styles.module.less";

const { Text } = Typography;

const IconCard = ({ className, isActive, icon, onClick, text }) => (
  <Card
    className={classNames(styles.iconCard, className, {
      [styles.active]: isActive,
    })}
    hoverable
    onClick={onClick}
    size="small"
  >
    <Space block vertical>
      {icon}
      <Text className={styles.text}>{text}</Text>
    </Space>
  </Card>
);

IconCard.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default memo(IconCard);
