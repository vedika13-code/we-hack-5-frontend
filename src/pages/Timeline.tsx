const SCHEDULE = [
  {
    day: "5 September",
    items: [
      {
        time: "8:00 AM – 11:00 AM",
        title: "Idea Finalisation & Approach Lock-in",
        description: "Problem statements will be released before the event. Teams will finalise their ideas and lock in their approach to the selected problem statement before beginning the hacking phase.",
      },
      {
        time: "11:00 AM – 1:00 PM",
        title: "Hacking & Mentor Round 1",
        description: "Teams begin working on their solutions. Mentor Round 1 will take place simultaneously, providing teams with guidance during the initial hacking phase.",
      },
      {
        time: "5:00 PM – 8:00 PM",
        title: "Elimination Round 1",
        description: "Teams will participate in the first elimination round while continuing to develop their solutions. Qualified teams will report back at 9:30 PM and continue hacking overnight.",
      },
    ],
  },
  {
    day: "6 September",
    items: [
      {
        time: "11:00 AM – 1:00 PM",
        title: "Elimination Round 2",
        description: "Qualified teams will continue working on their solutions during the overnight hacking session and the following morning. Teams will then proceed to final pitch preparation.",
      },
      {
        time: "4:00 PM – 6:00 PM",
        title: "Final Round",
        description: "The top 10 teams will participate in the final round after completing their final pitch preparation. The final round will be followed by the valedictory and closing ceremony.",
      },
    ],
  },
];

export default function Timeline() {
  return (
    <div className="app-shell bg-[#0a0b0a] text-[#f2eee5] font-['DM_Sans',sans-serif] min-h-screen selection:bg-[#dcff91] selection:text-[#0a0b0a]">
      {/* Inline styles for fonts & reference site visual language */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..800;1,9..40,400..800&family=Oswald:wght@500;700&family=Playfair+Display:ital,wght@0,400..800;1,400..800&display=swap');

        .font-display { font-family: 'Oswald', sans-serif; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }

        .timeline-row {
          border-top: 1px solid #f2eee526;
          transition: background 0.25s, padding 0.25s, color 0.25s;
        }
        .timeline-row:hover {
          background: #dcff91;
          color: #0a0b0a;
          padding-left: 1.5rem;
        }
        .timeline-row:hover .timeline-time {
          color: #6d1234;
        }
        .timeline-row:hover .timeline-[#f2eee5] {
          color: #0a0b0a;
        }
        .timeline-row:hover .timeline-desc {
          color: #43091f;
        }
      `}</style>

      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-xs font-extrabold tracking-[0.15em] text-[#dcff91] uppercase mb-4">
          // 36-HOUR HACKATHON SCHEDULE
        </div>
        <h1 className="font-display uppercase text-5xl sm:text-7xl font-bold tracking-tight text-[#f2eee5] mb-12">
          TIMELINE & <span className="font-serif italic text-[#ee9ab6] lowercase">schedule</span>
        </h1>

        {/* Timeline Day Groups */}
        <div className="space-y-16">
          {SCHEDULE.map((dayGroup, dayIdx) => (
            <div key={dayGroup.day} className="space-y-6">
              {/* Day Header Badge */}
              <div className="flex items-center gap-4">
                <div className="bg-[#6d1234] text-[#f2eee5] font-display text-2xl font-bold uppercase px-6 py-2 border border-[#f2eee526] shadow-[4px_4px_0_#0a0b0a]">
                  {dayGroup.day}
                </div>
                <div className="h-[1px] flex-1 bg-[#f2eee526]" />
              </div>

              {/* Items Process Rows */}
              <div className="border-b border-[#f2eee526]">
                {dayGroup.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="timeline-row p-6 sm:p-8 grid md:grid-cols-[180px_1fr_1.5fr] gap-4 md:gap-8 items-start sm:items-center"
                  >
                    {/* Time */}
                    <div className="timeline-time font-serif italic text-[#ee9ab6] font-bold text-base sm:text-lg">
                      {item.time}
                    </div>

                    {/* Title */}
                    <h3 className="timeline-title font-display uppercase text-2xl sm:text-3xl font-bold tracking-wide">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="timeline-desc font-serif text-[#d4cec2] text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}