import { useEffect } from "react";
import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(function () {
    return JSON.parse(localStorage.getItem(key)) || initialValue;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key],
  );
  return [value, setValue];
}
