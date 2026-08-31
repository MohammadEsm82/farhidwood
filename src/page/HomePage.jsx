import WhyChooseUs from "../components/about/WhyChooseUs";
import HomePortfolio from "../components/HomePortfolio";
import ParallaxBG from "../components/ParallaxBG/ParallaxBG";
import Stats from "../sections/states";
import AboutServices from "./AboutServices";
import BeforeAfter from "../components/Home/BeforeAfter";
import Materials from "../components/Home/Materials";
import Testimonials from "../components/Home/Testimonials";
import ContactCTA from "../components/Home/ContactCTA";


function HomePage() {
  return (
   <div>
    <ParallaxBG/>
    <Stats/>
    <AboutServices/>
    <Materials />
    <BeforeAfter />
    <HomePortfolio/>
    <WhyChooseUs/>
    <Testimonials/>
    <ContactCTA />

   </div>
  );
}
export default HomePage;