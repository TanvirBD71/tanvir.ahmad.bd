import Image from "next/image";
import { footer, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-teal/15 bg-brand-navy text-white">
      <div className="relative w-full overflow-hidden border-b border-white/5">
        <div className="mx-auto max-w-6xl px-2 py-5 md:px-6 md:py-6">
          <Image
            src="/images/footer-medical-line.png"
            alt="Tanvir Ahmad — medical line art with ECG and stethoscope"
            width={1600}
            height={280}
            className="mx-auto h-auto w-full max-w-5xl object-contain opacity-95 mix-blend-screen"
            sizes="(max-width: 768px) 100vw, 1024px"
            priority={false}
          />
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-semibold">{site.name}</p>
          <p className="text-sm text-white/70">{site.title}</p>
        </div>
        <p className="text-sm text-white/65">{footer.note}</p>
        <p className="text-sm text-white/55">
          © {footer.copyrightYear} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
