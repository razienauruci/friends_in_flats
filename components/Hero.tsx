import { AuthButtons } from './AuthButtons';
import backgroundImage from './image1.jpg'; // Import the image

export const Hero = () => {
  return (
    <div className="relative isolate px-6 lg:px-8 bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      <div className="relative z-10 mx-auto max-w-2xl lg:py-16 text-white h-full flex flex-col justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Find Your Dream Apartment Today
          </h1>
          <p className="mt-6 text-lg leading-8">
            Discover a variety of apartments and rooms that fit your lifestyle and budget. Whether you're looking for a cozy studio or a spacious home, we have the perfect place for you.
          </p>
          <AuthButtons />
        </div>
      </div>
    </div>
  );
};
