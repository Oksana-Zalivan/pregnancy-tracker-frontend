import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
};

export default function Button({
  children,
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        fullWidth && styles.fullWidth,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Завантаження..." : children}
    </button>
  );
}
