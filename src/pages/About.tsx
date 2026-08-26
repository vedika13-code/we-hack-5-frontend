import { Link } from "react-router-dom";

const ELIGIBILITY = [
  "Open to students from all branches and disciplines.",
  "Teams must consist of 3–5 participants.",
  "Participants can build software, hardware, or hybrid solutions.",
  "No prior hackathon experience is required — innovative ideas and the drive to build are welcome.",
];

const RULES = [
  "All projects must be developed from scratch during the official hackathon period. Previously developed or substantially completed projects are not permitted and may lead to disqualification.",
  "Each participant may belong to only one team. Team composition cannot be changed after the hackathon officially begins.",
  "Official presentation templates provided for each track must be used during all judging rounds. Failure to comply may result in evaluation penalties.",
  "By the final review, every team must present a functional prototype along with a live demonstration of their solution.",
  "Mentors are available to provide guidance and technical support; however, they will not develop code, prepare presentations, or make project decisions on behalf of any team.",
  "Teams must adhere to the rules at all times. Any form of plagiarism, academic misconduct, harassment, or unethical behavior may result in immediate disqualification.",
  "Projects found to be copied or generated without meaningful contribution from the team may be subject to disqualification.",
  "Participants are responsible for ensuring that all submitted files, repositories, and demonstration links are complete, accessible, and functional before the submission deadline.",
  "The decisions of the Organizing Committee and the judging panel regarding eligibility, evaluation, and awards shall be final and binding.",
];

export default function About() {
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
      `}</style>

      {/* Header & Overview Section */}
      <section className="border-b border-[#f2eee526] px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        <div className="text-xs font-extrabold tracking-[0.15em] text-[#dcff91] uppercase mb-4">
          // ABOUT WE HACK 5.0
        </div>
        <h1 className="font-display uppercase text-5xl sm:text-7xl font-bold tracking-tight text-[#f2eee5] mb-8">
          CROSS-DOMAIN <span className="font-serif italic text-[#ee9ab6] lowercase">engineering</span> <br />
          IN ACTION
        </h1>

        <div className="bg-[#171814] border border-[#f2eee526] p-8 sm:p-12 shadow-[8px_8px_0_#6d1234]">
          <p className="font-serif text-[#d4cec2] text-base sm:text-xl leading-relaxed">
            WE Hack 5.0 is a 36-hour hackathon where engineers from every branch come together to build real
            solutions to real problems. Not just software. Not just CS. Mechanical, civil, biomedical, electrical,
            electronics, AI and more, all in one room, building together.
          </p>
          <p className="font-serif text-[#d4cec2] text-base sm:text-xl leading-relaxed mt-6 border-t border-[#f2eee515] pt-6">
            200+ participants. 4 cross-domain themes. One shot to build something that actually matters. You get 36 hours of non-stop building, 24/7 mentor access to keep you unblocked, and a seat at an exclusive networking dinner with industry professionals. The teams that show up ready to build walk away with more than a prize. Spots are limited. Build with us.
          </p>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="border-b border-[#f2eee526] px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        <div className="text-xs font-extrabold tracking-[0.15em] text-[#dcff91] uppercase mb-4">
          // WHO CAN PARTICIPATE
        </div>
        <h2 className="font-display uppercase text-4xl sm:text-6xl font-bold text-[#f2eee5] mb-12">
          ELIGIBILITY <span className="font-serif italic text-[#ee9ab6] lowercase">criteria</span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {ELIGIBILITY.map((item, i) => (
            <div
              key={i}
              className="bg-[#f2eee5] text-[#0a0b0a] border-2 border-[#0a0b0a] p-6 shadow-[6px_6px_0_#6d1234] flex items-start gap-4"
            >
              <span className="font-display text-2xl font-bold text-[#6d1234]">
                ✓
              </span>
              <p className="font-ui text-sm sm:text-base font-bold text-[#0a0b0a] pt-0.5 leading-snug">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Judging Criteria Section */}
      <section className="border-b border-[#f2eee526] px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        <div className="text-xs font-extrabold tracking-[0.15em] text-[#dcff91] uppercase mb-4">
          // EVALUATION PROCESS
        </div>
        <h2 className="font-display uppercase text-4xl sm:text-6xl font-bold text-[#f2eee5] mb-12">
          JUDGING <span className="font-serif italic text-[#ee9ab6] lowercase">criteria</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#171814] border border-[#f2eee526] p-8 flex flex-col justify-between hover:border-[#dcff91] transition-all">
            <div>
              <span className="font-display text-xs font-extrabold text-[#dcff91] tracking-widest uppercase block mb-3">
                // REVIEW 1
              </span>
              <h3 className="font-display uppercase text-2xl font-bold text-[#f2eee5] mb-4">
                IDEA & ALIGNMENT
              </h3>
              <p className="font-serif text-[#d4cec2] text-sm leading-relaxed">
                Review 1 will focus on the team's proposed idea, evaluating it based on innovation, scalability, and alignment with the selected track.
              </p>
            </div>
          </div>

          <div className="bg-[#171814] border border-[#f2eee526] p-8 flex flex-col justify-between hover:border-[#dcff91] transition-all">
            <div>
              <span className="font-display text-xs font-extrabold text-[#ee9ab6] tracking-widest uppercase block mb-3">
                // REVIEW 2
              </span>
              <h3 className="font-display uppercase text-2xl font-bold text-[#f2eee5] mb-4">
                DEVELOPMENT PROGRESS
              </h3>
              <p className="font-serif text-[#d4cec2] text-sm leading-relaxed">
                Review 2 will focus on the team's development progress. Teams are expected to have completed at least 50% of their solution and will be evaluated on technical progress, scalability, SDG alignment, and entrepreneurial feasibility.
              </p>
            </div>
          </div>

          <div className="bg-[#171814] border border-[#f2eee526] p-8 flex flex-col justify-between hover:border-[#dcff91] transition-all">
            <div>
              <span className="font-display text-xs font-extrabold text-[#efc66e] tracking-widest uppercase block mb-3">
                // REVIEW 3
              </span>
              <h3 className="font-display uppercase text-2xl font-bold text-[#f2eee5] mb-4">
                PROTOTYPE & DEMO
              </h3>
              <p className="font-serif text-[#d4cec2] text-sm leading-relaxed">
                Review 3 will focus on the team's functional prototype, overall solution, and live demonstration. Teams will also be evaluated on their presentation and ability to address questions from the judging panel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="border-b border-[#f2eee526] px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        <div className="text-xs font-extrabold tracking-[0.15em] text-[#dcff91] uppercase mb-4">
          // OFFICIAL GUIDELINES
        </div>
        <h2 className="font-display uppercase text-4xl sm:text-6xl font-bold text-[#f2eee5] mb-12">
          HACKATHON <span className="font-serif italic text-[#ee9ab6] lowercase">rules</span>
        </h2>

        <div className="border-t border-[#f2eee526] divide-y divide-[#f2eee526]">
          {RULES.map((rule, i) => (
            <div
              key={i}
              className="py-8 grid sm:grid-cols-[100px_1fr] items-start gap-4 group hover:bg-[#171814] transition-colors px-4"
            >
              <span className="font-display text-4xl sm:text-5xl font-bold text-[#dcff91]">
                0{i + 1}
              </span>
              <p className="font-serif text-[#d4cec2] text-base sm:text-lg leading-relaxed">
                {rule}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#6d1234] px-6 sm:px-12 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display uppercase text-4xl sm:text-6xl font-bold text-[#f2eee5] mb-6">
            SPOTS ARE LIMITED. <span className="font-serif italic text-[#ee9ab6] lowercase">build</span> WITH US.
          </h2>
          <Link
            to="/signup"
            className="btn-primary px-10 py-5 text-base font-extrabold inline-flex items-center gap-3 shadow-[8px_8px_0_#0a0b0a]"
          >
            Register Team <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}