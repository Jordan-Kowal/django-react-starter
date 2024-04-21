import React, { memo, useCallback, useMemo, useState } from 'react';
import { Select, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useDebounce } from 'react-use';
import styles from './Autocomplete.module.less';

const { Text } = Typography;

const SEARCH_DELAY_MS = 250;

const TagLabel = ({ label }) => (
  <Text className={styles.tagLabel}>{label}</Text>
);

TagLabel.propTypes = {
  label: PropTypes.string,
};

/**
 * Custom Autocomplete component which uses a Select as base.
 * Allow for autocomplete with additional features like:
 * - Free text input
 * - Multiple values
 *
 * /!\ Cannot use AntdAutocomplete for "Single select with free text" as it does not handle form initial values
 * /!\ We therefore rely on <Select mode='tag'> limited to a single tag
 */
const Autocomplete = ({
  onChange,
  value,
  allowFreeText,
  multiple,
  onSearch,
  maxTags,
  idKey = 'id',
  labelKey = 'name',
  placeholder = '',
}) => {
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);

  const isFreeSingle = useMemo(
    () => allowFreeText && !multiple,
    [allowFreeText, multiple]
  );

  const mode = useMemo(() => {
    if (allowFreeText) return 'tags';
    if (multiple) return 'multiple';
    return undefined;
  }, [allowFreeText, multiple]);

  const tagLimit = useMemo(
    () => (isFreeSingle ? 1 : maxTags),
    [isFreeSingle, maxTags]
  );

  const tagLimitReached = useMemo(
    () => tagLimit && value && value.length >= tagLimit,
    [value, tagLimit]
  );

  const extraProps = useMemo(() => {
    if (!isFreeSingle) return {};
    return {
      tagRender: TagLabel,
    };
  }, [isFreeSingle]);

  // Prevent search if max tags reached
  const updateSearch = useCallback(
    (text) => !tagLimitReached && setSearch(text),
    [tagLimitReached]
  );

  const resetOptions = useCallback(() => setOptions([]), []);

  const onUpdateValue = useCallback(
    (newValue) => {
      setSearch('');
      onChange(newValue);
    },
    [onChange]
  );

  useDebounce(
    async () => {
      if (!search) {
        resetOptions();
        return;
      }
      const items = await onSearch(search);
      const newOptions = items.map((tag) => ({
        value: allowFreeText ? `${tag[labelKey]}` : `${tag[idKey]}`,
        label: `${tag[labelKey]}`,
      }));
      setOptions(newOptions);
    },
    SEARCH_DELAY_MS,
    [search, mode]
  );

  return (
    <Select
      className={styles.autocomplete}
      onChange={onUpdateValue}
      value={value}
      mode={mode}
      placeholder={placeholder}
      options={options}
      searchValue={search}
      onSearch={updateSearch}
      showSearch
      onBlur={resetOptions}
      filterOption={false}
      notFoundContent={null}
      maxTagCount={tagLimit}
      {...extraProps}
    />
  );
};

Autocomplete.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  allowFreeText: PropTypes.bool,
  multiple: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  maxTags: PropTypes.number,
  idKey: PropTypes.string,
  labelKey: PropTypes.string,
  placeholder: PropTypes.string,
};

export default memo(Autocomplete);
