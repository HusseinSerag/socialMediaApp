export default function Avatar({ avatar, name }) {
  return (
    <img
      src={avatar || "/defaultPrfPic.jpg"}
      alt={`${name}'s avatar`}
      className="border-1  h-[40px] w-[40px] rounded-full object-cover"
    />
  );
}
