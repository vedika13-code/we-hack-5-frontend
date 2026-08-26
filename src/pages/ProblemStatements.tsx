import { useState } from "react";
import { Link } from "react-router-dom";

interface Track {
  id: string;
  name: string;
  category: string;
  description: string;
  sampleProblems: string[];
  tags: string[];
  icon: string;
}

const TRACKS: Track[] = [
  {
    id: "PS-01",
    name: "AI & Machine Learning",
    category: "AI / ML",
    description: "Build intelligent systems, predictive models, or automation tools using modern ML frameworks to solve real-world industry problems.",
    sampleProblems: [
      "Automated disease screening with computer vision",
      "Predictive supply chain & resource optimization",
      "Real-time LLM-powered domain assistance",
    ],
    tags: ["Python", "TensorFlow", "PyTorch", "LLMs"],
    icon: "🧠",
  },
  {
    id: "PS-02",
    name: "Web3 & Decentralized Tech",
    category: "Web3",
    description: "Build decentralized applications, smart contract protocols, digital identity verification systems, or transparent blockchain utilities.",
    sampleProblems: [
      "Decentralized credential & certificate verification",
      "Zero-knowledge proof privacy systems",
      "DeFi micro-payroll & escrow solutions",
    ],
    tags: ["Solidity", "EVM", "Ethers.js", "IPFS"],
    icon: "⛓️",
  },
  {
    id: "PS-03",
    name: "Fintech & Financial Inclusion",
    category: "Fintech",
    description: "Build financial tools that streamline payment systems, democratize credit access, or enhance transaction security.",
    sampleProblems: [
      "AI fraud detection in instant payments",
      "Micro-savings and credit scoring for gig workers",
      "Cross-border remittance with low fees",
    ],
    tags: ["Fintech APIs", "Security", "Analytics"],
    icon: "💳",
  },
  {
    id: "PS-04",
    name: "Hardware & IoT Systems",
    category: "Hardware",
    description: "Combine hardware sensors, embedded systems, microcontrollers, and software dashboards to solve physical engineering challenges.",
    sampleProblems: [
      "Smart agricultural soil & moisture telemetry",
      "Industrial equipment health monitoring",
      "Biomedical vital signs monitoring wearable",
    ],
    tags: ["ESP32", "Sensors", "MQTT", "Embedded C++"],
    icon: "⚡",
  },
  {
    id: "PS-05",
    name: "Open Innovation",
    category: "Open Innovation",
    description: "Build anything — no track restriction. Solve any impactful problem across healthcare, education, sustainability, or robotics.",
    sampleProblems: [
      "Sustainable e-waste tracking platform",
      "Accessible assistive devices for disability care",
      "Smart city traffic & emergency response router",
    ],
    tags: ["Fullstack", "Any Tech Stack", "SDG Goals"],
    icon: "🚀",
  },
];

const CATEGORIES = ["All Tracks", "AI / ML", "Web3", "Fintech", "Hardware", "Open Innovation"];

export default function ProblemStatements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Tracks");

  const filteredTracks = TRACKS.filter((track) => {
    const matchesCategory =
      selectedCategory === "All Tracks" || track.category === selectedCategory;
    const matchesSearch =
      track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-shell bg-[#0a0b0a] text-[#f2eee5] font-['DM_Sans',sans-serif] min-h-screen selection:bg-[#dcff91] selection:text-[#0a0b0a]">
      {/* Inline styles for fonts & reference site visual language */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..800;1,9..40,400..800&family=Oswald:wght@500;700&family=Playfair+Display:ital,wght@0,400..800;1,400..800&display=swap');

        .font-display { font-family: 'Oswald', sans-serif; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }

        .btn-primary {
          background: #dcff91;
          color: #0a0b0a;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.1em;
          border: 1px solid #dcff91;
          box-shadow: 4px 4px 0 #6d1234;
          font-weight: 800;
          text-transform: uppercase;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .btn-primary:hover {
          box-shadow: 6px 6px 0 #6d1234;
          background: #f2eee5;
          transform: translate(-2px, -2px);
        }
      `}</style>

      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-xs font-extrabold tracking-[0.15em] text-[#dcff91] uppercase mb-4">
          // CHALLENGE DOMAINS
        </div>
        <h1 className="font-display uppercase text-5xl sm:text-7xl font-bold tracking-tight text-[#f2eee5] mb-6">
          TRACKS & <span className="font-serif italic text-[#ee9ab6] lowercase">problem statements</span>
        </h1>
        <p className="font-serif text-[#d4cec2] text-base sm:text-xl max-w-2xl mb-10 border-l-2 border-[#dcff91] pl-4">
          Explore our hackathon tracks below. Specific problem statements will be officially released on September 5 before 8:00 AM.
        </p>

        {/* Release Status Notice */}
        <div className="bg-[#171814] border border-[#f2eee526] p-6 sm:p-8 mb-12 shadow-[6px_6px_0_#6d1234] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-extrabold tracking-[0.15em] text-[#dcff91] uppercase mb-2">
              // RELEASE SCHEDULE ANNOUNCEMENT
            </div>
            <p className="font-serif text-[#d4cec2] text-sm sm:text-base">
              Problem statements will be released on the day of the hackathon before 8:00 AM. Select your track and prepare your team in advance.
            </p>
          </div>
          <Link
            to="/registration"
            className="btn-primary px-6 py-3 text-xs font-extrabold shrink-0"
          >
            Register Team
          </Link>
        </div>

        {/* Search & Category Filters */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <div className="max-w-xl">
            <input
              type="text"
              placeholder="SEARCH TRACKS, TECH STACK, KEYWORDS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#171814] border-2 border-[#f2eee526] focus:border-[#dcff91] text-[#f2eee5] placeholder-[#8f8b82] px-5 py-4 font-ui text-xs sm:text-sm font-bold tracking-wider outline-none transition-colors"
            />
          </div>

          {/* Category Choice Pills */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-3 font-ui text-xs font-extrabold tracking-wider uppercase border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#dcff91] text-[#0a0b0a] border-[#dcff91] shadow-[4px_4px_0_#6d1234] -translate-x-0.5 -translate-y-0.5"
                      : "bg-[#171814] text-[#f2eee5] border-[#f2eee526] hover:border-[#f2eee54d]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tracks Card Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredTracks.map((track) => (
            <div
              key={track.id}
              className="bg-[#f2eee5] text-[#0a0b0a] border-2 border-[#0a0b0a] p-8 shadow-[8px_8px_0_#6d1234] flex flex-col justify-between group hover:-translate-x-1 hover:-translate-y-1 transition-all"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{track.icon}</span>
                    <div>
                      <span className="font-display text-xs font-bold tracking-widest text-[#6d1234] uppercase block">
                        {track.id}
                      </span>
                      <h2 className="font-display uppercase text-2xl font-bold tracking-tight text-[#0a0b0a]">
                        {track.name}
                      </h2>
                    </div>
                  </div>
                  <span className="bg-[#6d1234] text-[#f2eee5] font-ui text-[10px] font-extrabold uppercase px-3 py-1 tracking-wider">
                    {track.category}
                  </span>
                </div>

                <p className="font-ui text-xs sm:text-sm text-[#46413c] leading-relaxed mb-6">
                  {track.description}
                </p>

                {/* Sample Problem Focus */}
                <div className="bg-[#0a0b0a] text-[#f2eee5] p-4 mb-6 border border-[#0a0b0a]">
                  <div className="font-ui text-[10px] font-extrabold text-[#dcff91] uppercase tracking-wider mb-2">
                    // EXAMPLE DOMAINS:
                  </div>
                  <ul className="space-y-1.5">
                    {track.sampleProblems.map((prob, i) => (
                      <li key={i} className="font-serif text-xs text-[#d4cec2] flex items-start gap-2">
                        <span className="text-[#ee9ab6] font-bold">•</span>
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags & Action CTA */}
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {track.tags.map((t, i) => (
                    <span
                      key={i}
                      className="border border-[#79736c] text-[#46413c] font-ui text-[11px] font-bold px-2.5 py-1 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to="/registration"
                  className="btn-primary w-full py-3.5 text-center text-xs font-extrabold block"
                >
                  Register Team for Track →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}