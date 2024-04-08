import HeroImg from "../assets/images/hero.png";
const Hero = () => {
  return (
    <div>
      {" "}
      <img src={HeroImg} className="w-full max-h-[600px] object-cover" alt="" />
    </div>
  );
};

export default Hero;
