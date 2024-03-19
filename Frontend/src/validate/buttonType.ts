import React from 'react';

export interface ButtonType {
  type?: 'button' | 'submit' | 'reset' | undefined;
  className: string;
  content: string;
  style?: React.CSSProperties;
}
