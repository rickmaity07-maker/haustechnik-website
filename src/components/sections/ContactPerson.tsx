import Image from "next/image";
import { ChatCircleDotsIcon, ClockIcon, EnvelopeSimpleIcon, PhoneIcon, SirenIcon } from "@phosphor-icons/react/dist/ssr";
import { contactPerson, site } from "@/content/site";

import { SectionBackdrop } from "@/components/SectionBackdrop";
// The bundled placeholder gets initials and a note on top; a real photo is shown as it is.
const isPlaceholder = contactPerson.image.endsWith("ansprechpartner.svg");

const initials = contactPerson.name
  .split(/\s+/)
  .map((part) => part[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

const factLink = "underline decoration-white/25 underline-offset-4 transition-colors duration-300 hover:decoration-signal";

export function ContactPerson() {
  return (
    <section aria-labelledby="cp-title" className="relative isolate bg-paper py-16 text-white md:py-24">
      <SectionBackdrop variant="glow" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="rounded-[2rem] bg-night/5 p-1.5 ring-1 ring-night/10">
          <div className="relative isolate grid grid-cols-1 gap-8 overflow-hidden rounded-[calc(2rem-0.375rem)] bg-night p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] sm:p-6 md:grid-cols-12 md:items-center md:gap-10 md:p-8 lg:gap-14 lg:p-10">
            <div aria-hidden className="pointer-events-none absolute -top-1/3 -right-1/4 -z-10 size-[36rem] rounded-full bg-workblue/40 blur-[120px]" />

            {/* Photo slot. Replace public/images/ansprechpartner.svg with a real portrait (4:5). */}
            <div className="mx-auto w-full max-w-sm md:col-span-5 md:max-w-none lg:col-span-4">
              <div className="relative overflow-hidden rounded-[1.5rem] ring-1 ring-white/10">
                <Image
                  src={contactPerson.image}
                  alt={isPlaceholder ? "" : `Porträt von ${contactPerson.name}`}
                  width={400}
                  height={500}
                  unoptimized
                  className="aspect-[4/5] h-auto w-full object-cover"
                />
                {isPlaceholder && (
                  <>
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center pb-[12%] text-[clamp(5rem,12vw,9rem)] leading-none font-semibold tracking-[-0.05em] text-white/90"
                    >
                      {initials}
                    </span>
                    <span className="absolute bottom-4 left-4 rounded-full bg-night/70 px-3 py-1 text-xs text-white/75 ring-1 ring-white/15 backdrop-blur-sm">
                      Foto folgt
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="md:col-span-7 lg:col-span-8">
              <p className="text-[15px] text-white/55">Ihr Ansprechpartner</p>
              <h2 id="cp-title" className="mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.03em]">
                {contactPerson.name}
              </h2>
              <p className="mt-2 text-lg text-signal">{contactPerson.role}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{contactPerson.intro}</p>

              <dl className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Fact Icon={ClockIcon} label="Bürozeiten">
                  {site.hours}
                </Fact>
                <Fact Icon={SirenIcon} label="24h Notdienst">
                  <a href={site.emergencyPhoneHref} className={`${factLink} tabular-nums`}>
                    {site.emergencyPhone}
                  </a>
                </Fact>
                <Fact Icon={ChatCircleDotsIcon} label="Antwortzeit">
                  Innerhalb eines Werktags
                </Fact>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={contactPerson.phoneHref}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-signal py-2 pr-6 pl-2 text-base font-medium text-night transition-transform duration-500 ease-spring active:scale-[0.97] sm:justify-start"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-night/10 transition-transform duration-500 ease-spring group-hover:scale-105">
                    <PhoneIcon size={18} weight="light" aria-hidden />
                  </span>
                  <span>
                    Anrufen: <span className="tabular-nums">{contactPerson.phone}</span>
                  </span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-white/10 py-2 pr-6 pl-2 text-base font-medium text-white ring-1 ring-white/20 transition-[background-color,scale] duration-500 ease-spring hover:bg-white/15 active:scale-[0.97] sm:justify-start"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-spring group-hover:scale-105">
                    <EnvelopeSimpleIcon size={18} weight="light" aria-hidden />
                  </span>
                  E-Mail schreiben
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({
  Icon,
  label,
  children,
}: {
  Icon: React.ComponentType<{ size?: number; weight?: "light"; className?: string; "aria-hidden"?: boolean }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
      <Icon size={20} weight="light" className="mt-0.5 shrink-0 text-signal" aria-hidden />
      <div className="min-w-0">
        <dt className="text-sm text-white/55">{label}</dt>
        <dd className="mt-0.5 text-[15px] text-white/90">{children}</dd>
      </div>
    </div>
  );
}
