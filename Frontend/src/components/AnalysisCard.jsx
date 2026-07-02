import GetScoreColor from "./GetScoreColor";

const AnalysisCard = ({ title, section }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>

        <div
          className={`rounded-full px-4 py-2 text-sm font-bold ${(
            <GetScoreColor score={section.score} />
          )}`}
        >
          {section.score}/100
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <h4 className="mb-1 font-semibold text-slate-700">Why?</h4>

          <p className="text-slate-600">{section.reason}</p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-slate-700">Evidence</h4>

          {Array.isArray(section.evidence) ? (
            <ul className="space-y-2">
              {section.evidence.map((item, index) => (
                <li
                  key={index}
                  className="rounded-lg bg-slate-100 p-3 text-slate-700"
                >
                  • {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg bg-slate-100 p-3 text-slate-700">
              {section.evidence}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;
