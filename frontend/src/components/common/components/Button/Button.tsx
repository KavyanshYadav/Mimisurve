import React from 'react';

import './Button.css';

export interface ButtonProps {
  prop?: string;
}
export default function Button({prop = 'default value',active=false}: ButtonProps) {
  return <button className="Button">Button {prop}</button>;
}
