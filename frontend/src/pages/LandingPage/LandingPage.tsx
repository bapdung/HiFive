import HeroSection from "./LandingPage.HeroSection";
import Description from "./LandingPage.Description";
import CreatorList from "./LandingPage.CreatorList";

const LandingPage = () => (
  <div className="flex flex-col items-center w-[100%]">
    <HeroSection />
    <Description />
    <CreatorList />
  </div>
);

export default LandingPage;
