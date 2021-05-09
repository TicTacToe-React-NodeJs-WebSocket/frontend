/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './Square.scss';

export default function Square({ value, onClick, index }) {
  const [state, setState] = React.useState({ value: null });
  return (
    <button
      className={`board-column board-column-${index}`}
      type="button"
      onClick={onClick}
      key={index}
      style={!value ? { color: 'transparent' } : null}
    >
      {value || index}
    </button>
  );
}
