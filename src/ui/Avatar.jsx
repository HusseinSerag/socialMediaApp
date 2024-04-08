export default function Avatar({ avatar, name, size, forwardedRef }) {
  const preview = {
    sm: "h-[40px] w-[40px]",
    lg: "h-[180px] w-[180px]",
  };
  return (
    <img
      src={avatar || "/defaultPrfPic.jpg"}
      alt={`${name}'s avatar`}
      className={`border-1  ${preview[size]} overflow-hidden rounded-full object-cover`}
      ref={forwardedRef}
    />
  );
}
