import { createContext, useContext, useState } from "react";
import useClickOutsideModal from "../hooks/useClickOutsideModal";
import { CiMenuKebab } from "react-icons/ci";

const MenuContext = createContext();
export default function Menu({ children }) {
  const [active, setActive] = useState("");
  function toggle(e, clickedItem) {
    e.stopPropagation();
    setActive((active) => (active === clickedItem ? "" : clickedItem));
  }
  function close() {
    setActive("");
  }
  return (
    <MenuContext.Provider value={{ active, toggle, close }}>
      {children}
    </MenuContext.Provider>
  );
}

function ToggleMenu({ name, render, children, customRender = false }) {
  const { toggle } = useContext(MenuContext);

  if (customRender) {
    return render((e) => toggle(e, name));
  }
  return (
    <CiMenuKebab
      className="h-6 w-6 cursor-pointer"
      onClick={(e) => toggle(e, name)}
    />
  );
}

function MenuList({ name, children }) {
  const { active, close } = useContext(MenuContext);
  const { ref } = useClickOutsideModal(close, false);
  if (active !== name) return null;
  return (
    <div
      ref={ref}
      className="absolute right-4 top-[30px] z-20 bg-white-A700 p-2"
    >
      {children}
    </div>
  );
}
function MenuItems({ children, onClick }) {
  const { close } = useContext(MenuContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return <div onClick={handleClick}>{children}</div>;
}
Menu.Toggle = ToggleMenu;
Menu.MenuList = MenuList;
Menu.Action = MenuItems;
