// TODO: replace with your actual tracks and problem statements
const TRACKS = [
  {
    name: "AI / ML",
    description: "Build something that uses machine learning to solve a real problem.",
  },
  {
    name: "Web3",
    description: "Build a decentralized application or tool.",
  },
  {
    name: "Fintech",
    description: "Build a tool that makes managing money easier or more accessible.",
  },
  {
    name: "Open Innovation",
    description: "Build anything — no track restriction, just make it good.",
  },
];

export default function ProblemStatements() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Tracks & Problem Statements</h1>
      <div className="space-y-6">
        {TRACKS.map((track) => (
          <div key={track.name} className="border rounded p-4">
            <h2 className="font-semibold text-lg mb-1">{track.name}</h2>
            <p className="text-slate-600">{track.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}