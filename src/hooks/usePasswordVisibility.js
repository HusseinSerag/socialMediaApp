import { useState } from "react";

export function usePasswordVisibility() {
  const [showPassword, setShowPassword] = useState(false);
  const passwordHidden = showPassword === false;
  function togglePasswordVisibility() {
    setShowPassword((v) => !v);
  }
  return [passwordHidden, togglePasswordVisibility];
}
