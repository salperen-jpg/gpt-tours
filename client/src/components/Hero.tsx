import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-5.5rem)] grid place-items-center">
      <div className="text-center flex flex-col gap-y-6 items-center  border-2 border-white rounded-lg p-12 max-w-2xl mx-4 backdrop-blur-md">
        <h1 className="text-2xl md:text-4xl">
          Unleash Your Wanderlust with AI-Powered Tours
        </h1>
        <p className="leading-8">
          Discover the world through immersive AI-powered tours. Customize your
          own adventures or explore pre-designed journeys curated by travel
          enthusiasts. Get ready to redefine travel with our Tour Creator!
        </p>
        <Button asChild variant="outline">
          <Link to="/register">Get Started</Link>
        </Button>
      </div>
    </section>
  );
};
export default Hero;
