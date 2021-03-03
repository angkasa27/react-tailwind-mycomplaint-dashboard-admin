import React from 'react';
import PropTypes from 'prop-types';

export default function InputText(props) {
  const { type, placeholder, className, name, value, onChange } = props;

  return (
    <>
      {name && <span className="input-span">{name}</span>}
      <input
        placeholder={placeholder}
        type={type}
        className={'input-text ' + className}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

InputText.defaultProps = {
  type: '',
  placeholder: '',
  className: '',
  name: '',
  value: '',
  onChange: () => {},
};

InputText.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
