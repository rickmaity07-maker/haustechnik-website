"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ClockIcon, EnvelopeSimpleIcon, MapPinIcon, PhoneIcon, SirenIcon, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";

const objectTypes = ["Mehrfamilienhaus", "Wohnanlage", "Gewerbeobjekt", "Einfamilienhaus"] as const;
const services = ["Hausmeisterservice", "Haustechnik", "Grünpflege", "Winterdienst", "Reinigung"] as const;

type Values = {
  name: string;
  email: string;
  phone: string;
  objectType: string;
  units: string;
  services: string[];
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  objectType: "",
  units: "",
  services: [],
  message: "",
  consent: false,
};

// Order matters: the first invalid field in this list receives focus.
const fieldOrder: (keyof Values)[] = ["name", "email", "phone", "objectType", "units", "services", "consent"];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Bitte geben Sie Ihren Vor- und Nachnamen ein.";
  if (!v.email.trim()) e.email = "Bitte geben Sie Ihre E-Mail-Adresse ein, damit wir antworten können.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Die E-Mail-Adresse ist unvollständig. Bitte im Format name@beispiel.de eingeben.";
  if (v.phone.trim() && !/^\+?[\d\s/()-]{6,}$/.test(v.phone.trim()))
    e.phone = "Bitte nur Ziffern, Leerzeichen und + / ( ) - verwenden, mindestens 6 Ziffern.";
  if (!v.objectType) e.objectType = "Bitte wählen Sie aus, um welche Art von Objekt es geht.";
  if (v.units.trim()) {
    const n = Number(v.units);
    if (!Number.isInteger(n) || n < 1 || n > 9999) e.units = "Bitte eine ganze Zahl ab 1 eingeben, z. B. 12.";
  }
  if (v.services.length === 0) e.services = "Bitte wählen Sie mindestens eine Leistung aus.";
  if (!v.consent) e.consent = "Bitte stimmen Sie der Datenschutzerklärung zu, damit wir Ihre Anfrage bearbeiten dürfen.";
  return e;
}

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".contact-reveal", {
          y: 48,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".contact-reveal", { autoAlpha: 1, y: 0 });
      });
    },
    { scope: root },
  );

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    // After the first submit attempt, errors update live so the user sees when a field is fixed.
    if (submitted) setErrors(validate(next));
  }

  function toggleService(s: string) {
    update("services", values.services.includes(s) ? values.services.filter((x) => x !== s) : [...values.services, s]);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);

    const first = fieldOrder.find((k) => found[k]);
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }

    // Form backend: connect your form service here (e.g. a Route Handler at /api/anfrage,
    // a Server Action, or a provider like Formspree). Send `values` and only call
    // setSent(true) once the request succeeded; show an error message otherwise.
    setSent(true);
  }

  return (
    <section id="kontakt" ref={root} className="bg-paper py-32 md:py-48">
      <style>{`
        @keyframes contact-draw { to { stroke-dashoffset: 0; } }
        @keyframes contact-pop { from { transform: scale(0.6); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>

      <div className="mx-auto grid max-w-7xl gap-14 px-4 md:grid-cols-[1fr_1.15fr] md:gap-16 lg:gap-24">
        <div className="contact-reveal">
          <p className="text-sm font-medium text-workblue">Kontakt</p>
          <h2 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-night md:text-6xl">
            Erzählen Sie uns von Ihrem Objekt.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-night/65">
            Wir melden uns innerhalb eines Werktags und vereinbaren einen Termin für die kostenlose Objektbegehung.
          </p>

          <dl className="mt-12 space-y-6">
            <ContactRow Icon={PhoneIcon} label="Telefon">
              <a href={site.phoneHref} className="hover:text-workblue">
                {site.phone}
              </a>
            </ContactRow>
            <ContactRow Icon={SirenIcon} label="24h Notdienst">
              <a href={site.emergencyPhoneHref} className="hover:text-workblue">
                {site.emergencyPhone}
              </a>
            </ContactRow>
            <ContactRow Icon={EnvelopeSimpleIcon} label="E-Mail">
              <a href={`mailto:${site.email}`} className="break-all hover:text-workblue">
                {site.email}
              </a>
            </ContactRow>
            <ContactRow Icon={MapPinIcon} label="Adresse">
              {site.address.street}, {site.address.zip} {site.address.city}
            </ContactRow>
            <ContactRow Icon={ClockIcon} label="Bürozeiten">
              {site.hours}
            </ContactRow>
          </dl>
        </div>

        <div className="contact-reveal rounded-[1.75rem] bg-night/[0.03] p-1.5 ring-1 ring-night/10">
          <div className="rounded-[calc(1.75rem-0.375rem)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_30px_60px_-36px_rgba(15,27,45,0.35)] md:p-10">
            {sent ? (
              <div className="flex min-h-[32rem] flex-col items-center justify-center text-center" role="status" aria-live="polite">
                <svg viewBox="0 0 96 96" className="size-24 animate-[contact-pop_0.7s_cubic-bezier(0.32,0.72,0,1)_both]" aria-hidden>
                  <circle cx="48" cy="48" r="44" fill="var(--signal)" fillOpacity="0.18" />
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    fill="none"
                    stroke="var(--night)"
                    strokeWidth="2"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1}
                    className="animate-[contact-draw_0.9s_cubic-bezier(0.65,0,0.35,1)_0.1s_forwards]"
                  />
                  <path
                    d="M30 49l12 12 24-26"
                    fill="none"
                    stroke="var(--night)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1}
                    className="animate-[contact-draw_0.6s_cubic-bezier(0.65,0,0.35,1)_0.7s_forwards]"
                  />
                </svg>
                <p className="mt-8 max-w-sm text-2xl font-medium tracking-tight text-night">
                  Anfrage gesendet. Wir melden uns innerhalb eines Werktags.
                </p>
                <p className="mt-3 text-night/60">
                  Eilt es? Rufen Sie uns an unter{" "}
                  <a href={site.phoneHref} className="text-night underline decoration-signal decoration-2 underline-offset-4">
                    {site.phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
                <Field id="name" label="Name" error={errors.name}>
                  <input
                    id="name"
                    data-field="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass(!!errors.name)}
                  />
                </Field>

                <Field id="email" label="E-Mail" error={errors.email}>
                  <input
                    id="email"
                    data-field="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass(!!errors.email)}
                  />
                </Field>

                <Field id="phone" label="Telefon" optional error={errors.phone}>
                  <input
                    id="phone"
                    data-field="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={inputClass(!!errors.phone)}
                  />
                </Field>

                <Field id="objectType" label="Objektart" error={errors.objectType}>
                  <select
                    id="objectType"
                    data-field="objectType"
                    value={values.objectType}
                    onChange={(e) => update("objectType", e.target.value)}
                    aria-invalid={!!errors.objectType}
                    aria-describedby={errors.objectType ? "objectType-error" : undefined}
                    className={`${inputClass(!!errors.objectType)} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5l5 5 5-5' stroke='%230f1b2d' stroke-width='1.4'/%3E%3C/svg%3E")] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                  >
                    <option value="" disabled>
                      Bitte wählen
                    </option>
                    {objectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id="units" label="Anzahl Wohneinheiten" optional error={errors.units} className="md:col-span-2">
                  <input
                    id="units"
                    data-field="units"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    value={values.units}
                    onChange={(e) => update("units", e.target.value)}
                    aria-invalid={!!errors.units}
                    aria-describedby={errors.units ? "units-error" : undefined}
                    className={`${inputClass(!!errors.units)} md:max-w-[12rem]`}
                  />
                </Field>

                <fieldset
                  className="md:col-span-2"
                  aria-invalid={!!errors.services}
                  aria-describedby={errors.services ? "services-error" : undefined}
                >
                  <legend className="text-sm font-medium text-night">Leistungen</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {services.map((s, i) => {
                      const checked = values.services.includes(s);
                      return (
                        <label
                          key={s}
                          className={`relative cursor-pointer rounded-full px-4 py-2.5 text-sm ring-1 transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal ${checked ? "bg-night text-white ring-night" : "bg-paper text-night/80 ring-night/15 hover:ring-night/40"}`}
                        >
                          <input
                            type="checkbox"
                            data-field={i === 0 ? "services" : undefined}
                            checked={checked}
                            onChange={() => toggleService(s)}
                            className="sr-only"
                          />
                          {s}
                        </label>
                      );
                    })}
                  </div>
                  <ErrorText id="services-error" message={errors.services} />
                </fieldset>

                <Field id="message" label="Nachricht" optional className="md:col-span-2">
                  <textarea
                    id="message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Was sollen wir über Ihr Objekt wissen?"
                    className={`${inputClass(false)} resize-y`}
                  />
                </Field>

                <div className="md:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-night/75">
                    <input
                      type="checkbox"
                      data-field="consent"
                      checked={values.consent}
                      onChange={(e) => update("consent", e.target.checked)}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      className="mt-0.5 size-5 shrink-0 accent-night"
                    />
                    <span>
                      Ich habe die{" "}
                      <Link href="/datenschutz" className="text-night underline decoration-signal decoration-2 underline-offset-4">
                        Datenschutzerklärung
                      </Link>{" "}
                      gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage gespeichert werden.
                    </span>
                  </label>
                  <ErrorText id="consent-error" message={errors.consent} />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-night py-2 pr-2 pl-6 text-base font-medium text-white transition-transform duration-500 ease-spring active:scale-[0.97] sm:w-auto"
                  >
                    <span>Anfrage senden</span>
                    <span className="flex size-10 items-center justify-center rounded-full bg-signal text-night transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:scale-105">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function inputClass(invalid: boolean) {
  return `block w-full rounded-2xl bg-paper px-4 py-3.5 text-base text-night ring-1 transition-shadow duration-300 placeholder:text-night/35 focus:ring-2 focus:outline-none ${invalid ? "ring-red-700/60 focus:ring-red-700" : "ring-night/12 focus:ring-workblue"}`;
}

function Field({
  id,
  label,
  optional,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-night">
        {label}
        {optional && <span className="ml-1.5 font-normal text-night/45">(optional)</span>}
      </label>
      {children}
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-red-800">
      {message}
    </p>
  );
}

function ContactRow({
  Icon,
  label,
  children,
}: {
  Icon: PhosphorIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-night text-signal">
        <Icon size={20} weight="light" aria-hidden />
      </span>
      <div>
        <dt className="text-sm text-night/50">{label}</dt>
        <dd className="mt-0.5 text-lg text-night">{children}</dd>
      </div>
    </div>
  );
}
