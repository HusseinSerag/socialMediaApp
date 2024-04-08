export default function Card({ children }) {
  return (
    <div className="mb-4 max-w-[900px] rounded-lg bg-white-A700 p-4 shadow-md shadow-gray-300">
      {children}
    </div>
  );
}
