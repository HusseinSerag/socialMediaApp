export default function Img({
  className,
  src = "defaultNoData.png",
  alt = "altImg",
  ...rest
}) {
  return (
    <img {...rest} loading="lazy" className={className} src={src} alt={alt} />
  );
}
