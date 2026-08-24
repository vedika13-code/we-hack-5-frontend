export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">About WE HACK 5.0</h1>
        <p className="text-slate-600">
          WE Hack 5.0 is a 36-hour hackathon where engineers from every branch come together to build real
          solutions to real problems. Not just software. Not just CS. Mechanical, civil, biomedical, electrical,
          electronics, AI and more, all in one room, building together. 200+ participants. 4 cross-domain themes.
          One shot to build something that actually matters. You get 36 hours of non-stop building, 24/7 mentor
          access to keep you unblocked, and a seat at an exclusive networking dinner with industry professionals.
          The teams that show up ready to build walk away with more than a prize. Spots are limited. Build with us.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Open to students from all branches and disciplines.</li>
          <li>Teams must consist of 3–5 participants.</li>
          <li>Participants can build software, hardware, or hybrid solutions.</li>
          <li>No prior hackathon experience is required — innovative ideas and the drive to build are welcome.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Rules</h2>
        <ol className="list-decimal list-inside text-slate-600 space-y-2">
          <li>
            All projects must be developed from scratch during the official hackathon period. Previously developed
            or substantially completed projects are not permitted and may lead to disqualification.
          </li>
          <li>Each participant may belong to only one team. Team composition cannot be changed after the hackathon officially begins.</li>
          <li>Official presentation templates provided for each track must be used during all judging rounds. Failure to comply may result in evaluation penalties.</li>
          <li>By the final review, every team must present a functional prototype along with a live demonstration of their solution.</li>
          <li>Mentors are available to provide guidance and technical support; however, they will not develop code, prepare presentations, or make project decisions on behalf of any team.</li>
          <li>Teams must adhere to the rules at all times. Any form of plagiarism, academic misconduct, harassment, or unethical behavior may result in immediate disqualification.</li>
          <li>Projects found to be copied or generated without meaningful contribution from the team may be subject to disqualification.</li>
          <li>Participants are responsible for ensuring that all submitted files, repositories, and demonstration links are complete, accessible, and functional before the submission deadline.</li>
          <li>The decisions of the Organizing Committee and the judging panel regarding eligibility, evaluation, and awards shall be final and binding.</li>
        </ol>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Judging Criteria</h2>
        <div className="space-y-3 text-slate-600">
          <p><strong>Review 1</strong> will focus on the team's proposed idea, evaluating it based on innovation, scalability, and alignment with the selected track.</p>
          <p><strong>Review 2</strong> will focus on the team's development progress. Teams are expected to have completed at least 50% of their solution and will be evaluated on technical progress, scalability, SDG alignment, and entrepreneurial feasibility.</p>
          <p><strong>Review 3</strong> will focus on the team's functional prototype, overall solution, and live demonstration. Teams will also be evaluated on their presentation and ability to address questions from the judging panel.</p>
        </div>
      </div>
    </div>
  );
}