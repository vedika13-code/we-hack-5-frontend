export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">About WE HACK 5.0</h1>
        {/* TODO: replace with your actual theme/mission text */}
        <p className="text-slate-600">
          WE HACK 5.0 brings together builders for a day of focused, hands-on making. Pick a track, form a team,
          and ship something real by the end of the event.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
        {/* TODO: fill in your actual eligibility rules */}
        <p className="text-slate-600">Open to all current students. Teams of 2–4.</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Rules</h2>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          {/* TODO: fill in your actual rules */}
          <li>All code must be written during the event.</li>
          <li>Teams must register before the deadline.</li>
          <li>Final submissions must include a working demo.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Code of Conduct</h2>
        {/* TODO: fill in your actual code of conduct, or link to a full document */}
        <p className="text-slate-600">
          Be respectful, be inclusive, and help make this a welcoming event for everyone.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Judging Criteria</h2>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          {/* TODO: fill in your actual judging criteria */}
          <li>Technical execution</li>
          <li>Creativity and originality</li>
          <li>Real-world impact</li>
          <li>Presentation</li>
        </ul>
      </div>
    </div>
  );
}