import { createContext, useContext, useState } from "react";
import useClickOutsideModal from "../hooks/useClickOutsideModal";

const MenuContext = createContext();
export default function Menu({ children }) {
  const [active, setActive] = useState("");
  function toggle(clickedItem) {
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

function ToggleMenu({ name, render, children }) {
  const { toggle } = useContext(MenuContext);

  function openThis(e) {
    e.stopPropagation();
    toggle(name);
  }

  return render(openThis);
}

function MenuList({ name, children }) {
  const { active, close } = useContext(MenuContext);
  const { ref } = useClickOutsideModal(close, false);
  return (
    active === name && (
      <div ref={ref} className="absolute right-4 top-[30px] bg-white-A700 p-2">
        {children}
      </div>
    )
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
