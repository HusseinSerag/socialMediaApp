export default function ClickOnImagePreview({ src }) {
  return (
    <div className="z-50 h-full max-h-[600px] max-w-[600px] p-4">
      <img
        src={src}
        className="max-h-[500px] w-full cursor-pointer object-cover"
      />
    </div>
  );
}
