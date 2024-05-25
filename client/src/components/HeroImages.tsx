import { useEffect, useState } from "react";
import heroImg1 from "../assets/hero-1.jpg";
import heroImg2 from "../assets/hero-2.jpg";
import heroImg3 from "../assets/hero-3.jpg";
import Logo from "./Logo";
import Hero from "./Hero";

const imgArr = [heroImg1, heroImg2, heroImg3];

const HeroImages = () => {
  const [index, setIndex] = useState(0);

  const changeBgImage = () => {
    setIndex((prevState) => {
      const nextState = (prevState + 1) % imgArr.length;
      return nextState;
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      changeBgImage();
    }, 7000);
    return () => clearTimeout(timeout);
  });

  return (
    <main
      className="bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(0,0,0,0.5)),url('${imgArr[index]}')`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <header className="align-element pt-16">
        <Logo />
      </header>
      <Hero />
    </main>
  );
};
export default HeroImages;
