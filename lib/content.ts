export const site = {
  name: "Tanvir Ahmad",
  title: "Registered Nurse",
  rnRegistrationNumber: "105358",
  rnVerificationUrl: "https://bncdb.bnmc.gov.bd/bnc/221260id.html",
  tagline:
    "Dedicated nursing professional and community leader blending compassionate patient care with a passion for digital design and civic engagement.",
  email: "tanvirnurse@gmail.com",
  phone: "+8801828729961",
  phoneHref: "tel:+8801828729961",
  whatsappHref: "https://wa.me/8801828729961",
  website: "https://tanvir.ahmad.bd",
  location: "Kodaliya, Tangail, Bangladesh",
  // External Google Drive CV; local public/cv.pdf is unused.
  cvUrl:
    "https://drive.google.com/file/d/18kruWvQjCkkVzsiqp8lTOtrP008gW-Np/view?usp=drivesdk",
  headshotSrc: "/images/Tanvir_Headshot.png",
  headshotAlt: "Professional headshot of Tanvir Ahmad",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
  { href: "#volunteering", label: "Volunteering" },
  { href: "#gallery", label: "Gallery" },
  { href: "#references", label: "References" },
  { href: "#contact", label: "Contact" },
] as const;

export const about = {
  eyebrow: "About",
  title: "Caring with purpose",
  summary:
    "As a registered nurse, I focus on applying clinical knowledge, patient care skills, and dedication to providing compassionate healthcare. My primary goal is to grow professionally while contributing to the well-being of patients and supporting the collaborative healthcare team. I also have a strong passion for exploring AI tools, creative writing, and organizing student events to foster community engagement.",
  philosophy: [
    "Patient-centered care delivered with a compassionate approach.",
    "Adaptability and resilience in dynamic healthcare settings.",
    "Strong critical thinking coupled with accurate medical documentation.",
    "Effective communication and seamless teamwork within medical units.",
    "Strict adherence to infection control practices and safety protocols.",
  ],
};

export const skills = {
  eyebrow: "Capabilities",
  title: "Skills & languages",
  description:
    "Clinical competencies paired with multilingual communication for inclusive caregiving.",
  // Short chip labels. Trimmed from 24 to 17 in Nov 2026: the list had
  // grown long enough to dominate the scroll on phones. Overlapping chips
  // were merged or dropped (see APPLY notes) — nothing here is lost that
  // isn't already covered by another chip or another section of the site.
  clinical: [
    {
      name: "Patient-centered care",
      icon: "HeartHandshake" as const,
    },
    {
      name: "Medication administration",
      icon: "Pill" as const,
    },
    {
      name: "Vital signs monitoring",
      icon: "Thermometer" as const,
    },
    {
      name: "First aid",
      icon: "Cross" as const,
    },
    {
      name: "Medical documentation",
      icon: "ClipboardList" as const,
    },
    {
      name: "BLS & ACLS protocols",
      icon: "HeartPulse" as const,
    },
    {
      name: "Infection prevention & control",
      icon: "ShieldCheck" as const,
    },
    {
      name: "Oxygen therapy",
      icon: "Wind" as const,
    },
    {
      name: "Wound care",
      icon: "Bandage" as const,
    },
    {
      name: "Sterile field preparation",
      icon: "Sparkles" as const,
    },
    {
      name: "Scrubbing, gowning & gloving",
      icon: "Hand" as const,
    },
    {
      name: "Scrub nurse assistance",
      icon: "Activity" as const,
    },
    {
      name: "Emergency ward care",
      icon: "Ambulance" as const,
    },
    {
      name: "Pediatric & neonatal care",
      icon: "Baby" as const,
    },
    {
      name: "Palliative & oncology care",
      icon: "Ribbon" as const,
    },
    {
      name: "Community health nursing",
      icon: "Globe" as const,
    },
    {
      name: "Multidisciplinary teamwork",
      icon: "Users" as const,
    },
  ],
  // Creative work sits in its own group so the clinical list stays clinical.
  other: [
    {
      name: "Freelancing",
      icon: "Briefcase" as const,
    },
    {
      name: "Adobe Stock Designer",
      icon: "Palette" as const,
    },
  ],
  languages: [
    {
      name: "Bengali",
      level: 100,
      label: "Native",
      note: "Native fluency in reading, writing & speaking",
    },
    {
      name: "English",
      level: 75,
      label: "Proficient",
      note: "Proficient in reading, writing & speaking · Duolingo English score 129",
    },
    {
      name: "Hindi",
      level: 50,
      label: "Foundational",
      note: "Foundational vocabulary and professional caregiving terminology",
    },
  ],
};

export const education = {
  eyebrow: "Academic path",
  title: "Education",
  description: "Formal training and continuing studies that shape my nursing practice.",
  items: [
    {
      period: "2021 – 2026",
      institution: "Nursing and Midwifery College, Tangail",
      credential: "Diploma in Nursing Science & Midwifery",
      detail: "Result: 1st Year: CGPA 3.89 | 2nd Year: CGPA 3.92 | 3rd Year: CGPA 4.00",
    },
    {
      period: "2021",
      institution: "Govt. Sakhipur College, Sakhipur, Tangail",
      credential: "HSC (Science)",
      detail: "Result: GPA 4.83 out of 5.00",
    },
    {
      period: "2019",
      institution: "Govt. Sakhipur PM Pilot Model School and College, Sakhipur, Tangail",
      credential: "SSC (Science)",
      detail: "Result: GPA 4.06 out of 5.00",
    },
  ],
};

export const experience = {
  eyebrow: "Clinical Journey & Other Experience",
  title: "Experience",
  description: "Hands-on roles that strengthened bedside manner and clinical judgment.",
  items: [
    {
      period: "April 2026 – September 2026",
      organization: "Tangail Medical College, Tangail",
      role: "Intern Nurse (6-Month)",
      detail:
        "Completed a six-month internship applying clinical knowledge and patient care skills in a teaching hospital setting.",
    },
    {
      period: "April – May 2026",
      organization: "Momotaj Central Hospital, Tangail",
      role: "Operation Theater Nurse",
      detail:
        "Supported operating theater nursing duties with a focus on sterile technique, teamwork, and patient safety.",
    },
    {
      period: "January 2023 – November 2025",
      organization: "250 Bedded General Hospital, Tangail & Tangail Medical College, Tangail",
      role: "Clinical Practice (3 year)",
      detail:
        "Completed three years of clinical practice, including a specialized Operating Theater (OT) rotation.",
    },
    {
      period: "August 2022 – November 2022",
      organization: "Bismillah Computer Training Center, Tangail",
      role: "Office Room Computer Operator",
      detail:
        "Worked as an office room computer operator for 4 months.",
    },
  ],
};

export const volunteering = {
  eyebrow: "Impact",
  title: "Volunteering & leadership",
  description: "Service roles that connect healthcare with community voice and outreach.",
  items: [
    {
      role: "Public Relation Officer",
      organization: "Volunteer for Bangladesh, Tangail",
      period: "September 2024 – Present",
      detail:
        "Engaged in public health campaigns, environmental programs, and community service events.",
      icon: "Megaphone" as const,
    },
    {
      role: "Founding Member",
      organization: "Zarrah Foundation",
      period: "April 2026 – Present",
      detail:
        "Advocated for internship allowances, collaborated with Zarrah Foundation in policy discussions, training, and healthcare reform initiatives.",
      icon: "HandHeart" as const,
    },
    {
      role: "Founder & Director",
      organization: "Nursilo",
      period: "Present",
      detail:
        "Leads Nursilo's advocacy for nursing education and training, including policy discussions and healthcare reform initiatives.",
      icon: "Palette" as const,
    },
    {
      role: "Medical Personnel",
      organization: "Moshal Alo Trust",
      period: "August 2024",
      detail:
        "Provided patient care at the Bonnyar Kanna 24 medical camp, a flood-relief effort with Moshal Alo Trust.",
      icon: "HandHeart" as const,
    },
  ],
};

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  color: string;
  imageSrc?: string;
  imageAlt?: string;
  /** CSS object-position for face-focused crops, e.g. "50% 18%" */
  imageObjectPosition?: string;
  /** Optional Tailwind aspect class override, e.g. "aspect-[3/4]" */
  aspectClass?: string;
  /** cover (default crop) or contain (full frame, no crop) */
  imageFit?: "cover" | "contain";
};

export const gallery: {
  eyebrow: string;
  title: string;
  description: string;
  items: GalleryItem[];
} = {
  eyebrow: "Moments",
  title: "Gallery",
  description: "Clinical practice, campaigns, workshops, and community moments from the field.",
  items: [
    {
      id: "g1",
      title: "Emergency Ward internship",
      caption:
        "Second month of internship at Tangail Medical College Hospital — learning in the Emergency Ward, where every second counts and empathy meets critical action.",
      color: "#1E40AF",
      imageSrc: "/images/gallery-emergency-ward-internship.png",
      imageAlt:
        "Tanvir Ahmad, Intern Nurse, standing outside the Emergency and Casualty Department at Tangail Medical College Hospital",
      imageObjectPosition: "50% 12%",
      aspectClass: "aspect-[3/4]",
    },
    {
      id: "g2",
      title: "Pediatrics ward care",
      caption:
        "Administering an injection to a pediatric patient in the children’s ward during clinical practice.",
      color: "#0284C7",
      imageSrc: "/images/gallery-pediatrics-injection.png",
      imageAlt:
        "Tanvir Ahmad giving an injection to a pediatric patient in the pediatrics ward",
    },
    {
      id: "g3",
      title: "SCANU Ward clinical practice",
      caption:
        "Clinical practice at SCANU Ward, 250-Bedded General Hospital, Tangail — collecting CBG samples, neonatal oral/nasal suctioning, using incubator, infusion and syringe pumps, and assisting with NG tube feeding.",
      color: "#0284C7",
      imageSrc: "/images/gallery-scanu-ward.png",
      imageAlt:
        "Tanvir Ahmad providing neonatal care at an incubator in the SCANU Ward, 250-Bedded General Hospital, Tangail",
      aspectClass: "aspect-[5/4]",
      imageObjectPosition: "42% 40%",
    },
    {
      id: "g4",
      title: "Shoulder dislocation reduction demo",
      caption:
        "Class demonstration on October 16, 2025 — presenting shoulder dislocation reduction techniques (Three-Sheet Technique) during Orthopedic Nursing class on Shoulder Dislocation Management.",
      color: "#0D9488",
      imageSrc: "/images/gallery-shoulder-dislocation-demo.png",
      imageAlt:
        "Class demonstration of shoulder dislocation reduction using the Three-Sheet Technique",
      aspectClass: "aspect-[16/10]",
      imageFit: "cover",
      imageObjectPosition: "50% 45%",
    },
    {
      id: "g5",
      title: "National Nursing Workshop 2026",
      caption:
        "Attended National Nursing Workshop 2026: Advancing Excellence in Critical Care Nursing, organized by Unico Hospitals PLC.",
      color: "#F97316",
      imageSrc: "/images/gallery-national-nursing-workshop-2026.png",
      imageAlt:
        "Tanvir Ahmad at the National Nursing Workshop 2026 podium, Unico Hospitals PLC",
    },
    {
      id: "g6",
      title: "Infection Prevention & Control (IPC)",
      caption:
        "Successfully completed the Infection Prevention & Control (IPC) Short Course organized by Safra Nursing School on 24th July 2026.",
      color: "#0F766E",
      imageSrc: "/images/gallery-ipc-safra-2026.png",
      imageAlt:
        "Tanvir Ahmad receiving the Infection Prevention and Control certificate at Safra Nursing Academy",
      aspectClass: "aspect-[3/4]",
      imageFit: "cover",
      // Faces + certificate in frame (was cropped too high before)
      imageObjectPosition: "50% 32%",
    },
    {
      id: "g7",
      title: "Capacity Strengthening Training",
      caption:
        "October 2025 — Capacity Strengthening Trainings on COPD, Postpartum Hemorrhage (PPH), Cancer Care, Physiotherapy, and Self-Breast Examination for nursing professionals and students. Special thanks to Elizabeth Anne McLellan, and instructors Sara Ann (Cancer Care) and Karie (Physiotherapy).",
      color: "#0D9488",
      imageSrc: "/images/gallery-capacity-strengthening-training-2025.png",
      imageAlt:
        "Tanvir Ahmad with Elizabeth Anne McLellan holding a framed certificate at Nursing and Midwifery College, Tangail",
      aspectClass: "aspect-[4/5]",
      imageObjectPosition: "50% 22%",
    },
    {
      id: "g8",
      title: "Lead Poisoning Prevention Week 2025",
      caption:
        "24 October 2025 — rally and human chain for International Lead Poisoning Prevention Week, organized by Volunteer for Bangladesh (Tangail), YouthNet Global & Pure Earth Bangladesh, in collaboration with UNICEF Bangladesh.",
      color: "#CA8A04",
      imageSrc: "/images/gallery-lead-prevention-week-2025.png",
      imageAlt:
        "Tanvir Ahmad holding a LEAD a silent killer poster during International Lead Poisoning Prevention Week 2025",
      aspectClass: "aspect-[3/4]",
      imageObjectPosition: "50% 28%",
    },
    {
      id: "g9",
      title: "Volunteer for Bangladesh",
      caption:
        "Public health campaigns and community service with Volunteer for Bangladesh, Tangail.",
      color: "#0D9488",
      imageSrc: "/images/VBD_DP.png",
      imageAlt:
        "Volunteer for Bangladesh collage featuring Tanvir Ahmad in community and public health work",
    },
  ],
};

export const certifications = {
  eyebrow: "Credentials",
  title: "Certifications & workshops",
  description: "Clinical credentials first, with additional training below.",
  // Clinical certifications and nursing workshops, strongest first.
  items: [
    {
      title: "Advanced Cardiovascular Life Support (ACLS)",
      issuer: "National Health Care Provider Solutions",
      year: "January 2025",
    },
    {
      title: "Introduction to Oxygen Therapy",
      issuer: "World Health Organization",
      year: "December 2024",
    },
    {
      title: "Infection Prevention & Control (IPC) Short Course",
      issuer: "Safra Nursing School",
      year: "24 July 2026",
    },
    {
      title:
        "National Nursing Workshop 2026: Advancing Excellence in Critical Care Nursing",
      issuer: "Unico Hospitals PLC",
      year: "2026",
    },
    {
      title:
        "Capacity Strengthening Trainings (COPD, PPH, Cancer Care, Physiotherapy & Self-Breast Examination)",
      issuer: "Nursing & Midwifery College, Tangail — with Elizabeth Anne McLellan",
      year: "October 2025",
    },
    {
      title: "The Primary Palliative Care Special Edition",
      issuer: "icddr,b",
      year: "November 2024",
    },
    {
      title: "Bereavement Care",
      issuer: "The Royal College of Midwives",
      year: "October 2024",
    },
    {
      title:
        "Mastering the Literature Review: Strategies for EBP, QI, and Research",
      issuer: "Henry Ford Health & Michigan State University",
      year: "August 2025",
    },
    {
      title: "Introduction to Good Clinical Laboratory Practice",
      issuer: "The Global Health Network",
      year: "September 2024",
    },
  ],
  otherTitle: "Other training",
  otherItems: [
    {
      title:
        "Connecting the Dots: Strengthening Volunteer for Bangladesh regional youth development workshop",
      issuer: "Volunteer for Bangladesh",
      year: "2026",
    },
    {
      title: "National Skill Standard Basic course (360 hrs) - Computer Office Application",
      issuer: "National Skill Standard",
      year: "July – December 2022",
    },
    {
      title: "Introduction to 2D Animation",
      issuer: "Grameenphone Academy",
      year: "2026",
    },
  ],
};

export const references = {
  eyebrow: "Endorsements",
  title: "References",
  description: "Words from mentors and collaborators who have guided my growth.",
  items: [
    {
      quote:
        "Tanvir has consistently demonstrated exceptional dedication to both his academic studies and clinical practice. His strong clinical judgment, high academic standards, and compassionate, patient-centered approach make him a standout nursing professional. He is highly capable and ready to make a significant impact in the healthcare field.",
      name: "Rofiqul Islam",
      role: "Instructor Incharge, Nursing and Midwifery College, Tangail",
    },
    {
      quote:
        "During his time in the clinical wards and operation theater rotations, Tanvir showed remarkable adaptability and a keen eagerness to learn. He communicates effectively, works seamlessly within a multidisciplinary team, and always prioritizes patient safety. He will be a valuable asset to any medical unit.",
      name: "Mosharof Hossain",
      role: "Nursing Instructor, Nursing and Midwifery College, Tangail",
    },
    // Added from LinkedIn recommendations (Nov 2026) — verbatim excerpts;
    // full texts are on his LinkedIn profile.
    {
      quote:
        "I am delighted to recommend Tanvir Ahmad as a compassionate, hardworking, and dedicated nurse. Having had the opportunity to witness his professionalism and commitment to patient care, I can confidently say that he is an exceptional healthcare provider who genuinely prioritizes the well-being of others. Tanvir is not only highly skilled in his clinical duties but also has a natural ability to connect with patients, offering them both comfort and confidence during their treatment.",
      name: "Md Wajed",
      role: "Registered Nurse · Mentor",
    },
    {
      quote:
        "I am pleased to recommend Tanvir Ahmad, with whom I had the pleasure of working for three years at our nursing college. Tanvir is an exceptionally creative, proactive, and quick learner. His ability to grasp complex concepts swiftly and apply them effectively in practical scenarios is truly commendable. Tanvir's dedication to his work and his proactive approach have always stood out. He consistently demonstrated a strong commitment to excellence and a genuine passion for nursing.",
      name: "MD Faridul Islam",
      role: "Registered Nurse · Mentor",
    },
    {
      quote:
        "I had the pleasure of working closely with Tanvir Ahmed during Moshal Alo Trust's flood relief project in Feni, Bangladesh, in 2024. In his role as a medical professional offering first aid support to those in need, Tanvir consistently demonstrated remarkable skill, unwavering dedication, and genuine compassion. His ability to remain calm under pressure and his thorough approach to addressing each case were truly commendable.",
      name: "Tanzil Amin Shuvo",
      role: "Founding Chairman, Moshal Alo Trust",
    },
    {
      quote:
        "It's a pleasure to recommend Tanvir Ahmad Vai, someone I've had the privilege to work with and learn from. His professionalism and strategic thinking make him stand out in any team or organization he's part of. Tanvir Vai is not only a dedicated and results-driven professional but also someone who inspires those around him with his calm demeanor and solution-focused mindset.",
      name: "Puza Rani Dev",
      role: "MSS in Sociology, Khulna University · Social Researcher",
    },
  ],
};

export const contact = {
  eyebrow: "Connect",
  title: "Get in touch",
  description:
    "Open to clinical opportunities, collaborations, and conversations about nursing and community health.",
  successMessage:
    "Thank you — your message was sent successfully. I’ll get back to you soon.",
  socials: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/nursetanvir/",
      icon: "Linkedin" as const,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/TANVIR.TNT",
      icon: "Facebook" as const,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/_tanvir_ahmad_/",
      icon: "Instagram" as const,
    },
    {
      name: "Website",
      href: "https://tanvir.ahmad.bd",
      icon: "Globe" as const,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/8801828729961",
      icon: "Phone" as const,
    },
    {
      name: "Email",
      href: "mailto:tanvirnurse@gmail.com",
      icon: "Mail" as const,
    },
  ],
};

export const footer = {
  note: "Built with care for patients, community, and craft.",
  copyrightYear: 2026,
};
