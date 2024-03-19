export default function Button({ children, type, onClick }) {
  function handleClick(e) {
    onClick?.(e);
  }
  const base =
    "rounded-full  px-3 py-1 text-[1rem]  font-semibold  sm:px-6 sm:py-2 flex gap-2 items-center";
  const className = {
    primary: base + " bg-blue-700 text-white dark:blue:950",
    secondary: base + " bg-gray-100 text-gray-600",
  };
  return (
    <button className={className[type]} onClick={handleClick}>
      {children}
    </button>
  );
}
