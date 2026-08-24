import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

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
    </div>
  );
}