export default function HeroSection({ title }) {
  return (
    <div className="hero">
      <div className="diagonal-hero-bg flex items-center justify-center">
        <div className="text-xl text-white-A700 sm:text-2xl">{title}</div>
      </div>
    </div>
  );
}
