import bannerImage from '../../imports/banner.png';

interface PageBannerProps {
  title: string;
  subtitle: string;
}

export default function PageBanner({ title, subtitle }: PageBannerProps) {
  return (
    <section className="relative h-72 overflow-hidden">
      <img src={bannerImage} alt="" className="absolute inset-0 w-full h-full object-cover object-[center_65%]" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-white/80">{subtitle}</p>
      </div>
    </section>
  );
}
