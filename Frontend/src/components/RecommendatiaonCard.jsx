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

export default RecommendationCard;
