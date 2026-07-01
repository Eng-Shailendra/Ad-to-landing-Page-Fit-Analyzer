import React from "react";

const getScoreColor = (score) => {
  if (score >= 80) return "text-green-600 bg-green-100";
  if (score >= 60) return "text-yellow-600 bg-yellow-100";
  return "text-red-600 bg-red-100";
};

const AnalysisCard = ({ title, section }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>

        <div
          className={`rounded-full px-4 py-2 text-sm font-bold ${getScoreColor(
            section.score,
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

const RecommendationCard = ({ recommendation, index }) => {
  return (
    <div className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">
          #{index + 1} {recommendation.title}
        </h3>

        <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
          {recommendation.impact} Impact
        </span>
      </div>

      <div className="mb-4 flex gap-3">
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          Confidence: {recommendation.confidence}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-slate-700">Reason</h4>

          <p className="text-slate-600">{recommendation.reason}</p>
        </div>

        <div className="rounded-xl bg-indigo-50 p-4">
          <h4 className="font-semibold text-indigo-700">
            Suggested Experiment
          </h4>

          <p className="mt-2 text-slate-700">{recommendation.experiment}</p>
        </div>
      </div>
    </div>
  );
};

const AnalysisPage = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}

        <div className="rounded-3xl bg-linear-to-r from-indigo-600 to-blue-600 p-10 text-white shadow-xl">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div>
              <p className="text-indigo-100">AI Generated Report</p>

              <h1 className="mt-2 text-4xl font-bold">
                Ad → Landing Page Analysis
              </h1>

              <p className="mt-5 max-w-3xl text-lg text-indigo-100">
                {analysis.summary}
              </p>
            </div>

            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white text-5xl font-bold text-indigo-700 shadow-lg">
              {analysis.overallScore}
            </div>
          </div>
        </div>

        {/* Analysis */}

        <div className="mt-12">
          <h2 className="mb-6 text-3xl font-bold text-slate-800">
            Detailed Analysis
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <AnalysisCard
              title="👤 Persona"
              section={analysis.sections.persona}
            />

            <AnalysisCard title=" Offer" section={analysis.sections.offer} />

            <AnalysisCard title=" Proof" section={analysis.sections.proof} />

            <AnalysisCard title=" CTA" section={analysis.sections.cta} />
          </div>
        </div>

        {/* Recommendations */}

        <div className="mt-14">
          <h2 className="mb-6 text-3xl font-bold text-slate-800">
            AI Recommendations
          </h2>

          <div className="space-y-6">
            {analysis.recommendations.map((item, index) => (
              <RecommendationCard
                key={index}
                recommendation={item}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Footer */}

        <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
          <h3 className="text-xl font-bold text-indigo-700">Final Verdict</h3>

          <p className="mt-3 text-slate-700">
            This report was generated by comparing the advertisement against the
            landing page content. Focus on the highest impact recommendations
            first to improve conversion rates and create a more consistent user
            experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AnalysisPage;
