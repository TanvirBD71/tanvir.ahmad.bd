import { CheckCircle2 } from "lucide-react";
import MotionSection from "@/components/MotionSection";
import SectionHeading from "@/components/SectionHeading";
import { about } from "@/lib/content";

export default function About() {
  return (
    <MotionSection
      id="about"
      ariaLabelledby="about-heading"
      className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24"
    >
      <SectionHeading
        id="about-heading"
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.summary}
      />
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="glass-panel rounded-3xl p-6 md:p-8">
          <h3 className="mb-4 text-lg font-semibold text-navy">Care philosophy</h3>
          <ul className="space-y-4">
            {about.philosophy.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                  aria-hidden="true"
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center gap-6">
          <p className="text-lg leading-relaxed text-navy-soft">
            Compassionate patient care, civic leadership, and digital design come together
            in how I listen, teach, and support people through moments that matter.
          </p>
          <div className="h-px w-16 bg-teal" aria-hidden="true" />
          <p className="text-base leading-relaxed text-muted">
            Whether at the bedside, in the operating theater, or in community outreach, I
            aim to grow professionally while contributing to patient well-being and
            collaborative healthcare teams.
          </p>
        </div>
      </div>
    </MotionSection>
  );
}
