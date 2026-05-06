import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: ButtonVariant;
};

export default function Button({
  children,
  isLoading = false,
  fullWidth = false,
  variant = 'primary',
  className,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Завантаження...' : children}
    </button>
  );
}
