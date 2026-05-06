"use client";

import styles from "./Loader.module.css";
import clsx from "clsx";

type LoaderProps = {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
};

export const Loader = ({ size = "md", fullScreen = false }: LoaderProps) => {
  return (
    <div
      className={clsx(styles.loaderWrapper, fullScreen && styles.fullScreen)}
      role="status"
      aria-live="polite"
    >
      <div className={clsx(styles.spinner, styles[size])} />

      <span className={styles.visuallyHidden}>Завантаження</span>
    </div>
  );
};
