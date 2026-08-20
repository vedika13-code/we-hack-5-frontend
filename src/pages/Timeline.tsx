// TODO: replace with your actual event schedule
const SCHEDULE = [
  { time: "9:00 AM", event: "Check-in & breakfast" },
  { time: "10:00 AM", event: "Opening ceremony" },
  { time: "11:00 AM", event: "Hacking begins" },
  { time: "2:00 PM", event: "Mentor rounds" },
  { time: "8:00 PM", event: "Dinner" },
  { time: "10:00 AM (next day)", event: "Submissions close" },
  { time: "11:00 AM", event: "Judging" },
  { time: "1:00 PM", event: "Results & closing ceremony" },
];

export default function Timeline() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Timeline & Schedule</h1>
      <div className="border-l-2 border-slate-200 pl-6 space-y-6">
        {SCHEDULE.map((item, i) => (
          <div key={i}>
            <p className="text-sm font-semibold text-slate-500">{item.time}</p>
            <p className="text-lg">{item.event}</p>
          </div>
        ))}
      </div>
    </div>
  );
}