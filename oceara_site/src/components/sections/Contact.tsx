import { useState } from "react";

const INTERESTS = [
  "Capital",
  "Robotics engineering",
  "Hardware",
  "Research access",
  "Testing environments",
  "Early deployment",
];

export function Contact() {
  const [interest, setInterest] = useState("Capital");
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [note, setNote] = useState("");
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? "";

  const mailto = contactEmail
    ? `mailto:${contactEmail}?subject=${encodeURIComponent(`Oceara Robotics — ${interest}`)}&body=${encodeURIComponent(`Name: ${name || "—"}
Email: ${senderEmail || "—"}
Interest: ${interest}

${note || ""}`)}`
    : "#";

  return (
    <section data-reveal id="contact" className="relative bg-abyss py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">14 — Contact</div>
        <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          Build with us.
        </h2>
        <p className="mt-6 max-w-xl text-mist">
          We are looking for people and institutions who understand that the hard
          part is still ahead: metal, water, and time.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="space-y-6">
              <label className="block">
                <span className="label">Name</span>
                <input id="contact-name" value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full px-4 py-3" required />
              </label>
              <label className="block">
                <span className="label">Email</span>
                <input id="contact-email" type="email" value={senderEmail} onChange={(event) => setSenderEmail(event.target.value)} className="mt-2 w-full px-4 py-3" required />
              </label>
              <fieldset>
                <legend className="label">Interest</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {INTERESTS.map((i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setInterest(i)}
                      className={`border px-3 py-2 font-mono text-[10px] tracking-[0.14em] uppercase ${
                        interest === i
                          ? "border-cyan text-cyan"
                          : "border-white/15 text-mist"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="block">
                <span className="label">Note</span>
                <textarea id="contact-note" value={note} onChange={(event) => setNote(event.target.value)} className="mt-2 min-h-32 w-full px-4 py-3" />
              </label>

              {contactEmail ? (
                <a
                  className="btn-primary inline-flex"
                  href={mailto}
                >
                  Open email <span>↗</span>
                </a>
              ) : (
                <div className="border border-amber/20 bg-amber/5 px-4 py-3 font-mono text-[10px] tracking-[0.12em] text-amber uppercase">
                  Contact routing is not configured yet. Set VITE_CONTACT_EMAIL before production.
                </div>
              )}
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="border border-white/10 p-8">
              <div className="label">Status</div>
              <p className="font-display mt-4 text-3xl tracking-tight">
                Early stage / pre-pilot
              </p>
              <p className="mt-6 text-sm leading-relaxed text-mist">
                First physical prototype has not yet been built. No invented
                customers. No invented pilots. No fabricated deployments.
              </p>
              <div className="mt-8 space-y-2 font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
                <div>Explore. Understand. Inspect. Act.</div>
                <div>Autonomous underwater systems.</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
