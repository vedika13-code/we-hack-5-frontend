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
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Timeline & Schedule</h1>
      {SCHEDULE.map((day) => (
        <div key={day.day} className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-slate-700">{day.day}</h2>
          <div className="border-l-2 border-slate-200 pl-6 space-y-6">
            {day.items.map((item, i) => (
              <div key={i}>
                <p className="text-sm font-semibold text-slate-500">{item.time}</p>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-slate-600 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}