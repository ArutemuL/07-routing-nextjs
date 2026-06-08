"use client";

import css from "./error.module.css";

interface ErrorMessageProps {
  error: Error;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className={css.wrapperError}>
      <p className={css.errorMessage}>{error.message}</p>
    </div>
  );
}