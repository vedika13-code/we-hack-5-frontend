import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

const FAQS = [
  {
    q: "When will the problem statements be released?",
    a: "Problem statements will be released on the day of the hackathon before 8AM.",
  },
  {
    q: "5th September is a working day for freshers, will OD be given for the same?",
    a: "Yes, On-Duty for Saturday classes for freshers will be provided.",
  },
  {
    q: "I don't have a team yet, can I still register?",
    a: "Yes, you can still register. We have something exciting coming up for helping everyone find teammates. Keep an eye on our Instagram page for the same.",
  },
  {
    q: "Will refreshments be provided during the hackathon?",
    a: "Refreshments will be provided during the hackathon.",
  },
  {
    q: "What all do we have to bring to the venue?",
    a: "Bring your laptops, chargers, and any other electronic devices you may require during the hack.",
  },
  {
    q: "If we choose the Hardware Track will the hardware components be provided?",
    a: "TBD.",
  },
  {
    q: "External Participants — accommodation details?",
    a: "For male participants: AC accommodation with mattresses, buckets, mugs, pillows, and temporary Wi-Fi access will be provided.\nFor female participants: Non-AC accommodation with mattresses, buckets, mugs, and temporary Wi-Fi access will be provided.",
  },
];

const HIGHLIGHTS = [
  {
    num: "01",
    title: "CROSS-DOMAIN SYNERGY",
    desc: "Engineers from CS, Mechanical, Civil, Electrical, AI & Biomedical working in unison under one roof.",
  },
  {
    num: "02",
    title: "24/7 MENTOR SUPPORT",
    desc: "Unblock technical challenges anytime with dedicated domain expert mentors throughout the 36 hours.",
  },
  {
    num: "03",
    title: "REAL-WORLD PROTOTYPING",
    desc: "Build functional software, hardware, or hybrid prototypes solving actual industry and societal problems.",
  },
  {
    num: "04",
    title: "NETWORKING & EXPOSURE",
    desc: "Connect with tech leaders, industry sponsors, and like-minded innovators at an exclusive networking dinner.",
  },
];

export default function Home() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [deadline, setDeadline] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    api.getSponsors().then(setSponsors).catch(() => {});
    api
      .getDeadlines()
      .then((deadlines) => {
        const reg = deadlines.find((d: any) => d.key === "registration");
        if (reg) setDeadline(reg.extendedTo || reg.dueAt);
      })
      .catch(() => {});
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="app-shell bg-[#0a0b0a] text-[#f2eee5] font-['DM_Sans',sans-serif] min-h-screen selection:bg-[#dcff91] selection:text-[#0a0b0a]">
      {/* Inline styles for fonts & custom component rules matching reference site */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..800;1,9..40,400..800&family=Oswald:wght@500;700&family=Playfair+Display:ital,wght@0,400..800;1,400..800&display=swap');

        .font-display { font-family: 'Oswald', sans-serif; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-ui { font-family: 'DM Sans', sans-serif; }

        .btn-primary {
          background: #dcff91;
          color: #0a0b0a;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.1em;
          border: 1px solid #dcff91;
          box-shadow: 6px 6px 0 #6d1234;
          font-weight: 800;
          text-transform: uppercase;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .btn-primary:hover {
          box-shadow: 4px 4px 0 #6d1234;
          background: #f2eee5;
          transform: translate(2px, 2px);
        }

        .btn-secondary {
          background: transparent;
          color: #f2eee5;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.1em;
          border: 1px solid #f2eee526;
          box-shadow: 4px 4px 0 #171814;
          font-weight: 800;
          text-transform: uppercase;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          border-color: #dcff91;
          color: #dcff91;
          transform: translate(2px, 2px);
        }

        .pulse-dot {
          background: #dcff91;
          border-radius: 50%;
          width: 8px;
          height: 8px;
          box-shadow: 0 0 0 4px #dcff9126;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 #dcff9166; }
          70% { box-shadow: 0 0 0 8px #dcff9100; }
          100% { box-shadow: 0 0 #dcff9100; }
        }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }

        .faq-row {
          border-top: 1px solid #f2eee526;
          transition: background 0.25s, color 0.25s;
        }
        .faq-row:hover {
          background: #dcff9115;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative border-b border-[#f2eee526] px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-3 text-[#dcff91] text-xs font-extrabold tracking-[0.15em] uppercase mb-6">
          <span className="pulse-dot" />
          WE HACK 5.0 • 36-HOUR HACKATHON
        </div>

        {/* Hero Title */}
        <h1 className="font-display uppercase text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.95] text-[#f2eee5] mb-8">
          BUILD REAL <span className="font-serif italic font-normal text-[#ee9ab6] lowercase">solutions</span> <br />
          FOR THE REAL WORLD
        </h1>

        {/* Description */}
        <p className="max-w-2xl text-base sm:text-xl text-[#d4cec2] font-serif leading-relaxed mb-8 border-l-2 border-[#dcff91] pl-6">
          A 36-hour hackathon where engineers from every branch build real solutions to real problems —
          not just software, not just CS. <em className="text-[#ee9ab6]">Mechanical, civil, biomedical, electrical, electronics, AI</em> and more.
        </p>

        {/* Deadline Notice */}
        {deadline && (
          <div className="inline-block bg-[#171814] border border-[#f2eee526] px-4 py-2 text-xs font-bold tracking-wider text-[#dcff91] uppercase mb-8">
            <span className="text-[#8f8b82]">Registration Deadline: </span>
            {new Date(deadline).toLocaleString()}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/signup"
            className="btn-primary px-8 py-4 text-sm font-extrabold flex items-center gap-3"
          >
            Register Now <span>→</span>
          </Link>
          <Link
            to="/about"
            className="btn-secondary px-8 py-4 text-sm font-extrabold"
          >
            Explore Event
          </Link>
        </div>
      </section>

      {/* Kinetic Strip Marquee */}
      <div className="bg-[#dcff91] text-[#0a0b0a] border-y-2 border-[#0a0b0a] py-3 overflow-hidden">
        <div className="animate-marquee font-display uppercase tracking-wider text-sm sm:text-base font-bold flex gap-8">
          <span>★ WE HACK 5.0</span>
          <span>★ 36 HOURS NON-STOP</span>
          <span>★ ALL ENGINEERING BRANCHES</span>
          <span>★ 200+ PARTICIPANTS</span>
          <span>★ 4 CROSS-DOMAIN THEMES</span>
          <span>★ IN-PERSON HACKATHON</span>
          <span>★ 24/7 MENTORSHIP</span>
          <span>★ WE HACK 5.0</span>
          <span>★ 36 HOURS NON-STOP</span>
          <span>★ ALL ENGINEERING BRANCHES</span>
          <span>★ 200+ PARTICIPANTS</span>
          <span>★ 4 CROSS-DOMAIN THEMES</span>
          <span>★ IN-PERSON HACKATHON</span>
          <span>★ 24/7 MENTORSHIP</span>
        </div>
      </div>

      {/* Stats Grid Section */}
      <section className="border-b border-[#f2eee526] px-6 sm:px-12 py-16 sm:py-20 max-w-7xl mx-auto w-full">
        <div className="text-xs font-extrabold tracking-[0.15em] text-[#dcff91] uppercase mb-10">
          // KEY METRICS
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { stat: "200+", label: "Participants", desc: "Cross-disciplinary teams" },
            { stat: "36h", label: "Duration", desc: "Non-stop building" },
            { stat: "4", label: "Cross-domain themes", desc: "Hardware, AI, Web3 & more" },
            { stat: "IN-PERSON", label: "Format", desc: "Hands-on venue hack" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#f2eee5] text-[#0a0b0a] border-2 border-[#0a0b0a] p-6 shadow-[6px_6px_0_#6d1234] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <div className="font-display text-4xl sm:text-6xl font-bold uppercase leading-none mb-2">
                {item.stat}
              </div>
              <div className="font-ui text-xs font-extrabold uppercase tracking-wider text-[#6d1234] mb-1">
                {item.label}
              </div>
              <div className="font-serif text-xs text-[#55524e] italic">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Highlights Section */}
      <section className="border-b border-[#f2eee526] px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-8 items-end mb-16">
          <div className="md:col-span-2">
            <div className="text-xs font-extrabold tracking-[0.15em] text-[#dcff91] uppercase mb-4">
              // WHY PARTICIPATE
            </div>
            <h2 className="font-display uppercase text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee5]">
              BUILT FOR ENGINEERS WHO <span className="font-serif italic text-[#ee9ab6] lowercase">ship</span>
            </h2>
          </div>
          <p className="font-serif text-[#d4cec2] text-base border-l-2 border-[#dcff91] pl-4">
            Everything you need to turn ambitious ideas into functional prototypes in 36 hours.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={i}
              className="bg-[#171814] border border-[#f2eee526] p-6 flex flex-col justify-between hover:border-[#dcff91] transition-all"
            >
              <div>
                <span className="font-serif italic text-2xl font-bold text-[#ee9ab6] block mb-4">
                  {h.num}
                </span>
                <h3 className="font-display uppercase text-xl font-bold text-[#f2eee5] mb-2 tracking-wide">
                  {h.title}
                </h3>
                <p className="font-ui text-xs text-[#8f8b82] leading-relaxed">
                  {h.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsors Section */}
      {sponsors.length > 0 && (
        <section className="border-b border-[#f2eee526] px-6 sm:px-12 py-16 max-w-7xl mx-auto w-full">
          <div className="text-xs font-extrabold tracking-[0.15em] text-[#dcff91] uppercase text-center mb-8">
            // SPONSORS & PARTNERS
          </div>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {sponsors.map((s) => (
              <a
                key={s.id}
                href={s.link}
                target="_blank"
                rel="noreferrer"
                className="bg-[#171814] border border-[#f2eee526] p-4 hover:border-[#dcff91] transition-all"
              >
                <img src={s.logoUrl} alt={s.name} className="h-12 object-contain" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* FAQs Section */}
      <section className="border-b border-[#f2eee526] px-6 sm:px-12 py-16 sm:py-24 max-w-5xl mx-auto w-full">
        <div className="text-xs font-extrabold tracking-[0.15em] text-[#dcff91] uppercase mb-4">
          // FREQUENTLY ASKED QUESTIONS
        </div>
        <h2 className="font-display uppercase text-4xl sm:text-5xl font-bold text-[#f2eee5] mb-12">
          NEED TO KNOW <span className="font-serif italic text-[#ee9ab6] lowercase">details</span>
        </h2>

        <div className="space-y-4 border-b border-[#f2eee526]">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="faq-row">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-[#ee9ab6] font-bold text-lg">
                      0{i + 1}
                    </span>
                    <span className="font-display uppercase text-lg sm:text-xl font-bold text-[#f2eee5]">
                      {faq.q}
                    </span>
                  </div>
                  <span className="text-[#dcff91] font-display text-2xl font-bold">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 pl-10 pr-4 font-serif text-[#d4cec2] text-sm leading-relaxed whitespace-pre-line border-t border-[#f2eee515] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call CTA Section */}
      <section className="bg-[#6d1234] px-6 sm:px-12 py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="text-xs font-extrabold tracking-[0.15em] text-[#dcff91] uppercase mb-4">
            // JOIN THE HACKATHON
          </div>
          <h2 className="font-display uppercase text-5xl sm:text-7xl font-bold text-[#f2eee5] mb-6">
            READY TO BUILD AT <span className="font-serif italic text-[#ee9ab6] lowercase">WE Hack 5.0</span>?
          </h2>
          <p className="font-serif text-[#d4cec2] text-lg max-w-xl mx-auto mb-8">
            Spots are limited for this 36-hour in-person hackathon. Form your team and secure your slot today.
          </p>
          <Link
            to="/signup"
            className="btn-primary px-10 py-5 text-base font-extrabold inline-flex items-center gap-3 shadow-[8px_8px_0_#0a0b0a]"
          >
            Register Now <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}