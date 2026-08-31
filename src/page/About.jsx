import AboutHero from "../components/about/AboutHero";
import AboutStory from "../components/about/AboutStory";
import WhyChooseUs from "../components/about/WhyChooseUs";
import ProcessTimeline from "../components/about/ProcessTimeline";
import Statistics from "../components/about/Statistics";
import AboutCTA from "../components/about/AboutCTA";

export default function About(){

return(

<main className="bg-secondary">

<AboutHero/>

<AboutStory/>

<WhyChooseUs/>

<ProcessTimeline/>

<Statistics/>

<AboutCTA />

</main>

)

}