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

export const metadata: Metadata = {
  title: "Tanvir Ahmad | Registered Nurse in Tangail, Bangladesh",
  description: "Portfolio of Tanvir Ahmad, a dedicated Registered Nurse in Tangail blending compassionate patient-centered care, operation theater clinical skills, and community leadership.",
  keywords: [
    "Tanvir Ahmad", 
    "Registered Nurse Tangail", 
    "Nurse Tanvir Ahmad", 
    "Operation Theater Nurse", 
    "Clinical Nurse Bangladesh", 
    "Nursilo Founder", 
    "Patient-Centered Care"
  ],
  authors: [{ name: "Tanvir Ahmad" }],
  openGraph: {
    title: "Tanvir Ahmad | Registered Nurse Portfolio",
    description: "Discover the clinical journey, skills, and community impact of Tanvir Ahmad, a Registered Nurse based in Tangail, Bangladesh.",
    url: "https://tanvir.ahmad.bd/",
    siteName: "Tanvir Ahmad Portfolio",
    images: [
      {
        url: "/images/Tanvir_Headshot.png", // Ensure you have an image at public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Tanvir Ahmad - Registered Nurse",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

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
