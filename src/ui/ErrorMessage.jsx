export default function ErrorMessage({ message, children }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="text-sm sm:text-lg">{message}</div>
      {children}
    </div>
  );
}
