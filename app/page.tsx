import About from "@/components/About";
import BackToTop from "@/components/BackToTop";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import EducationTimeline from "@/components/EducationTimeline";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import FloatingMedicalIcons from "@/components/FloatingMedicalIcons";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PageFade from "@/components/PageFade";
import PageParticles from "@/components/PageParticles";
import Preloader from "@/components/Preloader";
import References from "@/components/References";
import Skills from "@/components/Skills";
import Volunteering from "@/components/Volunteering";

export default function Home() {
  return (
    <>
      <Preloader />
      <PageParticles />
      <div className="relative isolate">
        <FloatingMedicalIcons />
        <PageFade>
          <Navbar />
          <main id="main-content" className="relative z-10 flex-1">
            <Hero />
            <About />
            <Skills />
            <EducationTimeline />
            <ExperienceTimeline />
            <Volunteering />
            <Gallery />
            <Certifications />
            <References />
            <Contact />
          </main>
          <Footer />
        </PageFade>
      </div>
      <BackToTop />
    </>
  );
}
