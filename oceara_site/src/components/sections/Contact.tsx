import { useState, type FormEvent } from "react";

const INTERESTS = [
  { id: "Funding or grant leads", title: "Funding or grants", detail: "Introductions, grants or prototype support." },
  { id: "Hardware or test facilities", title: "Hardware or facilities", detail: "Components, fabrication, labs or test access." },
  { id: "Engineering review", title: "Engineering expertise", detail: "Robotics, controls, design or safety review." },
  { id: "Research or pilot partner", title: "Research or pilot partner", detail: "A use case, research team or future test partner." },
  { id: "Follow project progress", title: "Follow progress", detail: "Hear about the first prototype and test milestones." },
];

export function Contact() {
  const [interest, setInterest] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [note, setNote] = useState("");
  const [feedback, setFeedback] = useState("");
  const [preparedMessage, setPreparedMessage] = useState("");
  const [error, setError] = useState("");
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? "";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFeedback("");
    setPreparedMessage("");

    const message = [
      "Oceara Robotics / O-01 enquiry",
      "",
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      organization.trim() ? `Organisation / role: ${organization.trim()}` : "",
      `Interested in: ${interest}`,
      note.trim() ? `Note: ${note.trim()}` : "",
      "",
      "O-01 is at the architecture / requirements stage. Its physical prototype has not yet been built or tested.",
      "This enquiry is non-binding. No payment or investment is being requested through this form.",
    ].filter(Boolean).join("\n");

    if (contactEmail) {
      const subject = encodeURIComponent(`Oceara O-01 / ${interest}`);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${encodeURIComponent(message)}`;
      setFeedback("Your email app should open with the message ready. Please review and send it there.");
      return;
    }

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard not available");
      void navigator.clipboard.writeText(message).then(
        () => setFeedback("Message copied. Paste it into your email app to send. This page does not store enquiries."),
        () => {
          setPreparedMessage(message);
          setFeedback("Copy was blocked. Select the draft below and copy it manually.");
        },
      );
    } catch {
      setPreparedMessage(message);
      setFeedback("Select the draft below and copy it into your email app. This page does not store enquiries.");
    }
  }

  return (
    <section data-reveal id="contact" className="relative overflow-hidden bg-abyss py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
        <div className="absolute -top-32 right-[-12%] h-[440px] w-[440px] rounded-full bg-cyan/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="label text-cyan">Support the first test</div>
            <h2 className="headline mt-5 text-4xl md:text-6xl">
              Help move O-01 forward.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-mist">
              Choose how you might help, leave your contact details, and add a note if useful.
              It takes about 30 seconds.
            </p>
            <div className="mt-7 border-l border-cyan/50 bg-cyan/[0.035] py-3 pl-4 pr-3">
              <div className="label text-cyan">Where the project stands</div>
              <p className="mt-2 text-xs leading-relaxed text-foam">
                Design and engineering requirements are drafted. The physical prototype has not been built yet.
              </p>
            </div>
            <p className="mt-5 font-mono text-[9px] leading-relaxed tracking-[0.07em] text-slate-sea uppercase">
              No payment · No equity offer · No promised return
            </p>
          </div>

          <div className="lg:col-span-8">
            <form onSubmit={submit} className="border border-white/10 bg-abyss-2/90 p-5 shadow-2xl shadow-black/20 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <span className="label text-cyan">Quick enquiry</span>
                <span className="font-mono text-[9px] tracking-[0.1em] text-mist uppercase">30 seconds · Non-binding</span>
              </div>

              <fieldset className="mt-5">
                <legend className="font-display text-xl text-foam">How would you like to help?</legend>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {INTERESTS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={interest === item.id}
                      onClick={() => { setInterest(item.id); setError(""); }}
                      className={`relative min-h-[77px] border p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan ${interest === item.id ? "border-cyan/70 bg-cyan/[0.07]" : "border-white/10 bg-abyss hover:border-white/25"}`}
                    >
                      <span className={`block text-sm ${interest === item.id ? "text-cyan" : "text-foam"}`}>{item.title}</span>
                      <span className="mt-1 block text-[11px] leading-relaxed text-mist">{item.detail}</span>
                      <span className={`absolute right-3 top-3 h-3 w-3 rounded-full border ${interest === item.id ? "border-cyan bg-cyan" : "border-white/25"}`} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="label">Your name *</span>
                  <input autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} className="mt-2 w-full px-3 py-3 text-sm" placeholder="Name" />
                </label>
                <label className="block">
                  <span className="label">Email *</span>
                  <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={254} className="mt-2 w-full px-3 py-3 text-sm" placeholder="you@example.com" />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="label">Organisation / role <span className="text-slate-sea">(optional)</span></span>
                <input autoComplete="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} maxLength={120} className="mt-2 w-full px-3 py-3 text-sm" placeholder="Company, lab or role" />
              </label>

              <label className="mt-4 block">
                <span className="label">Anything we should know? <span className="text-slate-sea">(optional)</span></span>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={600} rows={2} className="mt-2 w-full px-3 py-3 text-sm" placeholder="A few words are enough" />
              </label>

              {error && <p role="alert" className="mt-4 border border-amber/30 p-3 text-xs leading-relaxed text-amber">{error}</p>}
              {feedback && <p aria-live="polite" className="mt-4 border border-cyan/25 bg-cyan/[0.04] p-3 text-xs leading-relaxed text-foam">{feedback}</p>}
              {preparedMessage && (
                <textarea
                  aria-label="Prepared enquiry message"
                  className="mt-3 w-full border border-white/15 bg-abyss p-3 font-mono text-[10px] leading-relaxed text-mist"
                  rows={7}
                  readOnly
                  value={preparedMessage}
                  onFocus={(e) => e.currentTarget.select()}
                />
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <p className="max-w-xs text-[10px] leading-relaxed text-mist">
                  This page does not save enquiries. Nothing is sent until you choose to send the prepared email.
                </p>
                <button type="submit" disabled={!interest} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">
                  {contactEmail ? "Open email draft" : "Prepare message"} <span aria-hidden="true">↗</span>
                </button>
              </div>
              {!interest && <p className="mt-3 font-mono text-[9px] text-slate-sea">Choose one option to continue.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
