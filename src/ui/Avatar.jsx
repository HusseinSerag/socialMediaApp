export default function Avatar({
  avatar,
  name,
  size,
  forwardedRef,
  otherClasses,
}) {
  const preview = {
    sm: "h-[40px] w-[40px] min-w-[40px] min-h-[40px]",
    lg: "h-[180px] w-[180px] min-w-[180px] min-h-[180px]",
  };
  return (
    <img
      src={avatar || "/defaultPrfPic.jpg"}
      alt={`${name}'s avatar`}
      className={`border-1  ${preview[size]} overflow-hidden rounded-full object-cover ${otherClasses}`}
      ref={forwardedRef}
    />
  );
}
