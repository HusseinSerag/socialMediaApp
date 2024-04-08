export default function NavItem({ children, onClick, className }) {
  function handleClick() {
    onClick?.();
  }
  return (
    <li
      className={`
    flex 
    cursor-pointer
     items-center 
     gap-4
       rounded-lg 
     hover:bg-gray-200
     dark:hover:bg-gray-800
     [&>svg]:h-[24px]
     [&>svg]:w-[24px]
     ${className}
     `}
      onClick={handleClick}
    >
      {children}
    </li>
  );
}
