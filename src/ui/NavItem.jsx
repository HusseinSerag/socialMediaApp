export default function NavItem({ children, onClick }) {
  function handleClick() {
    onClick?.();
  }
  return (
    <li
      className="
    flex cursor-pointer
    items-center
     gap-2 rounded-lg
     p-2
      hover:bg-gray-200 sm:grid 
     sm:w-full
     sm:grid-cols-[50px_1fr]
     dark:hover:bg-gray-800
     [&>svg]:h-[24px]
     [&>svg]:w-[24px]
     "
      onClick={handleClick}
    >
      {children}
    </li>
  );
}
