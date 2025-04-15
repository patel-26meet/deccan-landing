import AboutUsFAQs from "@/components/pages/home/AboutUsFAQs";
import Footer from "@/components/pages/home/Footer/Footer";
import OpportunitiesAndBenifits from "@/components/pages/home/opportunitiesandbenifits";
import Statistics from "@/components/pages/home/Statistics/statistics";

export default function Home() {
  return (
    <div>
      <OpportunitiesAndBenifits />
      <Statistics/>
      <AboutUsFAQs />
      <Footer />
    </div>

  );
}
