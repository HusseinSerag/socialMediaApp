export default function Card({ className = "bg-white-A700", children }) {
  return (
    <div
      className={`mb-4 max-w-[900px] rounded-lg p-4 shadow-md shadow-gray-300 ${className}`}
    >
      {children}
    </div>
  );
}
