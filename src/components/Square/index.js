/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './Square.scss';

export default function Square({ value, onClick, index, visible }) {
  const [state, setState] = React.useState({ value: null });
  return (
    <button
      className={`board-column board-column-${index} ${
        visible ? 'visible' : ''
      }`}
      type="button"
      onClick={onClick}
      key={index}
      style={!value ? { color: 'transparent' } : null}
      disabled={!visible}
    >
      {value || index}
    </button>
  );
}
