import Space from "@/components/ui/Space";
import { Switch as AntSwitch, Typography } from "antd";
import PropTypes from "prop-types";
import React, { memo } from "react";

const { Text } = Typography;

const Switch = ({ onChange, text, ...rest }) => (
  <Space block>
    <AntSwitch onChange={onChange} {...rest} />
    <Text>{text}</Text>
  </Space>
);

Switch.propTypes = {
  onChange: PropTypes.func,
  text: PropTypes.string,
};

export default memo(Switch);
