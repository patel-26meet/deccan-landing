import AboutUsFAQs from "@/components/pages/home/AboutUsFAQs";
import HowItWorks from "@/components/pages/home/campusPartnersHowItWorks";
import Footer from "@/components/pages/home/Footer/Footer";
import OpportunitiesAndBenifits from "@/components/pages/home/opportunitiesandbenifits";
import Statistics from "@/components/pages/home/Statistics/statistics";
import Stories from "@/components/pages/home/stories";

export default function Home() {
  return (
    <div>
      <OpportunitiesAndBenifits />
      <Statistics />
      <Stories />
      <HowItWorks />
      <AboutUsFAQs />
      <Footer />
    </div>

  );
}
