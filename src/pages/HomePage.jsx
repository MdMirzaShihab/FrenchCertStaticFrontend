import Hero from "../components/Hero";
import HomeAccredited from "../components/HomeTrainings";
import HomeServices from "../components/HomeServices";


const HomePage = () => {
  return (
    <div>
      <Hero />
      <HomeServices />
      <HomeAccredited />
    </div>
  );
};

export default HomePage;