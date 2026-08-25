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

export default function Home() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [deadline, setDeadline] = useState<string | null>(null);

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

  return (
    <div>
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">WE HACK 5.0</h1>
        <p className="text-lg text-slate-600 mb-8">
          A 36-hour hackathon where engineers from every branch build real solutions to real problems —
          not just software, not just CS.
        </p>
        {deadline && (
          <p className="text-sm text-slate-500 mb-6">
            Registration closes {new Date(deadline).toLocaleString()}
          </p>
        )}
        <Link to="/signup" className="inline-block bg-slate-900 text-white rounded px-6 py-3 font-medium">
          Register now
        </Link>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-3xl font-bold">200+</p>
          <p className="text-sm text-slate-500">Participants</p>
        </div>
        <div>
          <p className="text-3xl font-bold">36h</p>
          <p className="text-sm text-slate-500">Duration</p>
        </div>
        <div>
          <p className="text-3xl font-bold">4</p>
          <p className="text-sm text-slate-500">Cross-domain themes</p>
        </div>
        <div>
          <p className="text-3xl font-bold">In-person</p>
          <p className="text-sm text-slate-500">Format</p>
        </div>
      </section>

      {sponsors.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold mb-6 text-center">Sponsors</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {sponsors.map((s) => (
              <a key={s.id} href={s.link} target="_blank" rel="noreferrer">
                <img src={s.logoUrl} alt={s.name} className="h-12 object-contain" />
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">FAQs</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details key={i} className="border rounded p-4">
              <summary className="font-medium cursor-pointer">{faq.q}</summary>
              <p className="text-slate-600 mt-2 whitespace-pre-line">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}