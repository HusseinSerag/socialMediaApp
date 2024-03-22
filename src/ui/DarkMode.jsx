import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";

export default function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    "dm",
    window.matchMedia(`(prefers-color-scheme:dark)`).matches,
  );

  function toggle() {
    setIsDarkMode((d) => !d);
  }

  useEffect(
    function () {
      const doc = document.documentElement;
      doc.className = !isDarkMode ? "" : "dark";
    },
    [isDarkMode],
  );
  return (
    <div
      onClick={toggle}
      className="absolute right-2 top-2 z-50 [&>svg]:h-[2rem] [&>svg]:w-[2rem]"
    >
      {!isDarkMode ? <MdOutlineWbSunny /> : <FaRegMoon />}
    </div>
  );
}
