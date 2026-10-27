import Image from "next/image";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import { contactPerson } from "@/content/site";

export function ContactPerson() {
  return (
    <section aria-labelledby="cp-title" className="bg-paper pb-24 text-night md:pb-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 border-t border-night/10 pt-24 md:grid-cols-12 md:gap-12 md:pt-32">
          <div className="mx-auto w-full max-w-xs md:col-span-4 md:max-w-none">
            <div className="rounded-[1.75rem] bg-concrete/70 p-1.5 ring-1 ring-night/5">
              {/* Replace public/images/ansprechpartner.svg with a real portrait (4:5) */}
              <Image
                src={contactPerson.image}
                alt={`Porträt von ${contactPerson.name}`}
                width={400}
                height={500}
                unoptimized
                className="aspect-[4/5] h-auto w-full rounded-[calc(1.75rem-0.375rem)] object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <p className="text-[15px] text-night/55">Ihr Ansprechpartner</p>
            <h2 id="cp-title" className="mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.03em]">
              {contactPerson.name}
            </h2>
            <p className="mt-2 text-lg text-workblue">{contactPerson.role}</p>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-night/70 md:text-xl">{contactPerson.intro}</p>
            <a
              href={contactPerson.phoneHref}
              className="group mt-10 inline-flex items-center gap-4 rounded-full bg-night py-2 pr-6 pl-2 text-base font-medium text-white transition-transform duration-500 ease-spring active:scale-[0.97]"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-white/15 text-signal transition-transform duration-500 ease-spring group-hover:scale-105">
                <PhoneIcon size={18} weight="light" aria-hidden />
              </span>
              <span>
                Direkt anrufen: <span className="tabular-nums">{contactPerson.phone}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
