import Hero from "@/components/sections/Hero";
import SpecialCards from "@/components/sections/SpecialCards";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowItWorks from "@/components/sections/HowItWorks";
import HomeContact from "@/components/sections/HomeContact";
import Seo from "@/components/ui/Seo";

export default function Home() {
  return (
    <>
      <Seo
        title="RGTvertex — The AI Workforce for the Enterprise"
        description="RGTvertex gives every team in your company a dedicated AI agent — support, legal, finance, engineering, sales, hiring, and research — on one secure platform."
      />
      <Hero />
      <SpecialCards />
      <WhyChooseUs />
      <HowItWorks />
      <HomeContact />
    </>
  );
}
