import type { Metadata } from "next";
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
import { contact, site } from "@/lib/content";

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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tanvir Ahmad | Registered Nurse Portfolio",
    description: "Discover the clinical journey, skills, and community impact of Tanvir Ahmad, a Registered Nurse based in Tangail, Bangladesh.",
    url: "https://tanvir.ahmad.bd/",
    siteName: "Tanvir Ahmad Portfolio",
    // The share image comes from app/opengraph-image.jpg (Next.js file
    // convention), so it is not repeated here.
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanvir Ahmad | Registered Nurse Portfolio",
    description: "Discover the clinical journey, skills, and community impact of Tanvir Ahmad, a Registered Nurse based in Tangail, Bangladesh.",
    // The Twitter share image comes from app/twitter-image.jpg.
  },
};

// Structured data (JSON-LD) so search engines and AI tools can understand
// who this page is about. All values come from lib/content.ts.
const sameAs = [
  ...contact.socials
    .filter((social) => ["LinkedIn", "Facebook", "Instagram"].includes(social.name))
    .map((social) => social.href),
  "https://about.me/tanvir_ahmad",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${site.website}/#profilepage`,
      url: `${site.website}/`,
      name: "Tanvir Ahmad | Registered Nurse in Tangail, Bangladesh",
      mainEntity: { "@id": `${site.website}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.website}/#person`,
      name: site.name,
      jobTitle: site.title,
      description: site.tagline,
      url: `${site.website}/`,
      image: `${site.website}${site.headshotSrc}`,
      email: `mailto:${site.email}`,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tangail",
        addressCountry: "BD",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Nursing and Midwifery College, Tangail",
      },
      knowsLanguage: ["Bengali", "English", "Hindi"],
      identifier: {
        "@type": "PropertyValue",
        name: "RN Registration Number (BNMC)",
        value: site.rnRegistrationNumber,
        url: site.rnVerificationUrl,
      },
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${site.website}/#website`,
      url: `${site.website}/`,
      name: "Tanvir Ahmad Portfolio",
      about: { "@id": `${site.website}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
