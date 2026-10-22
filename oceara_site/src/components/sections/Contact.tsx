import { useMemo, useState } from "react";

const INTERESTS = [
  {
    id: "Engineering review",
    title: "Review the engineering",
    detail: "Architecture, requirements, system integration or safety review.",
  },
  {
    id: "Hardware or facility sponsorship",
    title: "Support a part or facility",
    detail: "Supplier introductions, fabrication, lab time or test-site access.",
  },
  {
    id: "Funding conversation",
    title: "Discuss prototype funding",
    detail: "A conversation after the first-test scope and supplier quotes are ready.",
  },
  {
    id: "Operator or pilot feedback",
    title: "Share an underwater use case",
    detail: "An inspection, monitoring or recovery workflow worth designing toward.",
  },
  {
    id: "Research access",
    title: "Connect research resources",
    detail: "Sensors, a technical mentor, a lab or a controlled test environment.",
  },
  {
    id: "Follow progress",
    title: "Follow the build",
    detail: "Hear about the first test milestone, including what changes along the way.",
  },
];

const EVIDENCE = [
  "Reviewed technical requirements",
  "A supplier-quoted component budget",
  "Independent engineering or safety review",
  "Unedited controlled-water test footage",
  "A named operator or pilot partner",
];

export function Contact() {
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState("");
  const [evidence, setEvidence] = useState<string[]>([]);
  const [supportRange, setSupportRange] = useState("After seeing the quote-backed budget");
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? "";
  const selected = INTERESTS.find((item) => item.id === interest);
  const isFunding = interest === "Funding conversation" || interest === "Hardware or facility sponsorship";

  const message = useMemo(() => [
    "Oceara Robotics / O-01 interest signal",
    "",
    `Name: ${name.trim()}`,
    `Email: ${senderEmail.trim()}`,
    `Organization or role: ${organization.trim() || "Not provided"}`,
    `Interest: ${selected?.title ?? interest}`,
    isFunding ? `Indicative range: ${supportRange}` : "",
    `Evidence requested: ${evidence.length ? evidence.join("; ") : "Not selected"}`,
    "",
    "Note:",
    note.trim() || "No additional note",
    "",
    "Important: this is non-binding interest only. O-01 is at the architecture / requirements stage. Its physical prototype has not yet been built or tested.",
  ].filter(Boolean).join("\n"), [name, senderEmail, organization, selected, interest, isFunding, supportRange, evidence, note]);

  const next = () => {
    setError("");
    if (step === 1 && !interest) {
      setError("Choose the type of conversation you would consider.");
      return;
    }
    setStep((value) => Math.min(3, value + 1));
  };

  const back = () => {
    setError("");
    setStep((value) => Math.max(1, value - 1));
  };

  const toggleEvidence = (item: string) => {
    setEvidence((current) => current.includes(item)
      ? current.filter((value) => value !== item)
      : [...current, item]);
  };

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setError("");
    } catch {
      setError("Copying is blocked by this browser. Select the summary below and copy it manually.");
    }
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!consent) {
      setError("Please confirm that you consent to use of these details if you send the message.");
      return;
    }
    if (!contactEmail) {
      setError("The site owner still needs to configure VITE_CONTACT_EMAIL in Vercel. Nothing has been sent or stored. You can copy the prepared summary below.");
      return;
    }
    const subject = encodeURIComponent(`Oceara Robotics / ${interest}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${encodeURIComponent(message)}`;
  }

  return (
    <section data-reveal id="contact" className="relative overflow-hidden bg-abyss py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <div className="absolute -top-32 right-[-12%] h-[440px] w-[440px] rounded-full bg-cyan/5 blur-3xl" />
        <div className="absolute bottom-0 left-[-8%] h-[360px] w-[360px] rounded-full bg-amber/5 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="label text-cyan">Build with us / Interest signal</div>
            <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
              What would you need to see?
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-mist md:text-base">
              Tell us what kind of contribution makes sense and which evidence
              would earn your confidence. This is a considered conversation,
              not a payment form or an investment offer.
            </p>
            <div className="mt-9 border-l border-cyan/50 bg-cyan/[0.035] py-4 pl-5 pr-4">
              <div className="label text-cyan">The current truth</div>
              <p className="mt-3 text-sm leading-relaxed text-foam">
                Architecture and engineering requirements are drafted. The
                physical prototype has not yet been built. The component budget
                will follow technical review and supplier quotations.
              </p>
            </div>
            <div className="mt-8 space-y-3 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-mist uppercase">
              <p className="flex gap-3"><span className="text-cyan">01</span><span>No payment is collected on this site.</span></p>
              <p className="flex gap-3"><span className="text-cyan">02</span><span>No equity or financial return is offered here.</span></p>
              <p className="flex gap-3"><span className="text-cyan">03</span><span>No form response is recorded unless you send the prepared email.</span></p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={submit} className="border border-white/10 bg-abyss-2/90 shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-7">
                <span className="label text-cyan">O-01 / Support signal</span>
                <span className="font-mono text-[9px] tracking-[0.13em] text-mist uppercase">Step 0{step} / 03</span>
              </div>
              <div className="grid grid-cols-3 gap-1 px-5 pt-5 md:px-7">
                {[1,2,3].map((n) => <div key={n} className={`h-[2px] transition-colors ${n <= step ? "bg-cyan" : "bg-white/10"}`} />)}
              </div>
              <div className="p-5 md:p-7">
                {step === 1 && (
                  <div>
                    <div className="label">01 / Your role</div>
                    <h3 className="font-display mt-4 text-3xl leading-tight tracking-tight text-foam md:text-4xl">How might you help?</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">Choose the conversation that is most relevant. You can review your choice before preparing a message.</p>
                    <div className="mt-7 grid gap-2 sm:grid-cols-2">
                      {INTERESTS.map((item, i) => (
                        <button key={item.id} type="button" onClick={() => { setInterest(item.id); setError(""); }} aria-pressed={interest === item.id}
                          className={`group relative min-h-[112px] border p-4 text-left transition-colors ${interest === item.id ? "border-cyan/70 bg-cyan/[0.07]" : "border-white/10 bg-abyss hover:border-white/25"}`}>
                          <span className={`font-mono text-[9px] tracking-[0.12em] ${interest === item.id ? "text-cyan" : "text-slate-sea"}`}>0{i+1}</span>
                          <span className="mt-3 block font-display text-lg leading-tight text-foam">{item.title}</span>
                          <span className="mt-2 block text-xs leading-relaxed text-mist">{item.detail}</span>
                          <span className={`absolute right-3 top-3 grid h-4 w-4 place-items-center rounded-full border text-[9px] ${interest === item.id ? "border-cyan bg-cyan text-abyss" : "border-white/20 text-transparent"}`}>✓</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <div className="label">02 / Your evidence bar</div>
                    <h3 className="font-display mt-4 text-3xl leading-tight tracking-tight text-foam md:text-4xl">What would build confidence?</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">Select any evidence you would like to see before considering a deeper conversation.</p>
                    <div className="mt-7 space-y-2">
                      {EVIDENCE.map((item, i) => (
                        <label key={item} className={`flex cursor-pointer items-center gap-4 border p-4 transition-colors ${evidence.includes(item) ? "border-cyan/60 bg-cyan/[0.05]" : "border-white/10 hover:border-white/20"}`}>
                          <input type="checkbox" checked={evidence.includes(item)} onChange={() => toggleEvidence(item)} className="h-4 w-4 accent-cyan" />
                          <span className="font-mono text-[9px] text-cyan">0{i+1}</span>
                          <span className="text-sm text-foam">{item}</span>
                        </label>
                      ))}
                    </div>
                    {isFunding && (
                      <div className="mt-7">
                        <label htmlFor="support-range" className="label">Optional / Indicative support range</label>
                        <select id="support-range" value={supportRange} onChange={(e) => setSupportRange(e.target.value)} className="mt-3 w-full px-4 py-3 text-sm">
                          <option>After seeing the quote-backed budget</option>
                          <option>Up to ₹10,000</option>
                          <option>₹10,000 to ₹50,000</option>
                          <option>₹50,000 or more</option>
                          <option>Prefer not to say</option>
                        </select>
                        <p className="mt-2 text-xs leading-relaxed text-mist">Non-binding indication only. No money is requested or accepted.</p>
                      </div>
                    )}
                    <label className="mt-7 block">
                      <span className="label">Anything else? / Optional</span>
                      <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={1000} rows={4} className="mt-3 w-full px-4 py-3 text-sm" placeholder="A technical question, a test site, a risk to consider..." />
                    </label>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <div className="label">03 / Where to reach you</div>
                    <h3 className="font-display mt-4 text-3xl leading-tight tracking-tight text-foam md:text-4xl">Make the follow-up useful.</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">The details below will be placed into an email draft. This page does not save them to a database.</p>
                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                      <label className="block"><span className="label">Name</span><input autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} className="mt-2 w-full px-4 py-3 text-sm" placeholder="Your name" /></label>
                      <label className="block"><span className="label">Email</span><input type="email" autoComplete="email" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} required maxLength={254} className="mt-2 w-full px-4 py-3 text-sm" placeholder="you@example.com" /></label>
                    </div>
                    <label className="mt-5 block"><span className="label">Company, institution or role / Optional</span><input autoComplete="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} maxLength={120} className="mt-2 w-full px-4 py-3 text-sm" placeholder="A little context helps" /></label>
                    <div className="mt-6 border border-white/10 bg-abyss p-4">
                      <div className="label">Your signal</div>
                      <div className="mt-2 font-display text-xl text-foam">{selected?.title ?? interest}</div>
                      <div className="mt-3 text-xs leading-relaxed text-mist">Evidence requested: {evidence.length ? evidence.join(", ") : "Not selected"}</div>
                      <button type="button" className="mt-3 font-mono text-[9px] text-cyan uppercase tracking-[0.12em] hover:text-foam" onClick={() => setStep(1)}>Change selection ↗</button>
                    </div>
                    <label className="mt-6 flex items-start gap-3 text-xs leading-relaxed text-mist">
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-1 h-4 w-4 accent-cyan" />
                      <span>I agree that these details may be included in a message I choose to send to Oceara Robotics. My response is non-binding.</span>
                    </label>
                    {!contactEmail && (
                      <div className="mt-5 border border-amber/30 bg-amber/[0.05] p-4 text-xs leading-relaxed text-amber">
                        Email routing is not configured yet. Nothing will be sent or stored until the site owner adds VITE_CONTACT_EMAIL in Vercel. You can copy your prepared message instead.
                      </div>
                    )}
                    <details className="mt-5 border border-white/10 p-4">
                      <summary className="cursor-pointer font-mono text-[9px] tracking-[0.12em] text-mist uppercase">Preview prepared message</summary>
                      <pre className="mt-4 whitespace-pre-wrap break-words font-mono text-[10px] leading-relaxed text-mist">{message}</pre>
                    </details>
                    <button type="button" onClick={copyMessage} className="mt-4 border border-white/20 px-4 py-3 font-mono text-[9px] tracking-[0.1em] text-foam uppercase hover:border-cyan/60">{copied ? "Message copied ✓" : "Copy message"}</button>
                  </div>
                )}

                {error && <p className="mt-5 border border-amber/30 bg-amber/[0.05] p-3 text-xs leading-relaxed text-amber" role="alert">{error}</p>}
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <button type="button" onClick={back} disabled={step === 1} className="font-mono text-[9px] tracking-[0.1em] text-mist uppercase transition-colors hover:text-foam disabled:invisible">← Back</button>
                  <div className="flex items-center gap-3">
                    {step < 3 ? (
                      <button type="button" onClick={next} className="btn-primary">Continue <span aria-hidden="true">↗</span></button>
                    ) : (
                      <button type="submit" className="btn-primary">{contactEmail ? "Open email draft" : "Prepare message"} <span aria-hidden="true">↗</span></button>
                    )}
                  </div>
                </div>
              </div>
            </form>
            <p className="mt-4 font-mono text-[9px] leading-relaxed tracking-[0.06em] text-slate-sea">
              NO PAYMENT / NO EQUITY OFFER / NO PROMISE OF FINANCIAL RETURN. Current stage: architecture and requirements. Prototype not yet built or tested.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
