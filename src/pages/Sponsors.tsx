import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSponsors().then(setSponsors).finally(() => setLoading(false));
  }, []);

  const tiers = ["title", "gold", "partner"];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Sponsors</h1>

      {loading ? (
        <p className="text-center text-slate-500">Loading…</p>
      ) : sponsors.length === 0 ? (
        <p className="text-center text-slate-500">Sponsors will be announced soon.</p>
      ) : (
        tiers.map((tier) => {
          const tierSponsors = sponsors.filter((s) => s.tier === tier);
          if (tierSponsors.length === 0) return null;
          return (
            <div key={tier} className="mb-10">
              <h2 className="text-lg font-semibold mb-4 text-center capitalize text-slate-500">
                {tier === "title" ? "Title Sponsor" : `${tier} Sponsors`}
              </h2>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                {tierSponsors.map((s) => (
                  <a key={s.id} href={s.link} target="_blank" rel="noreferrer">
                    <img src={s.logoUrl} alt={s.name} className="h-16 object-contain" />
                  </a>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}