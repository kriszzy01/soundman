import { useState, useEffect } from "react";

export const useDarkMode = (initialValue: boolean) => {
  const [value, setValue] = useState(() => {
    let darkMode = window.localStorage.getItem("darkMode");

    if (darkMode !== null) {
      return Boolean(JSON.parse(darkMode));
    }

    return initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem("darkMode", JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
};
