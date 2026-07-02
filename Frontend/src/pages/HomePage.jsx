import React, { useState } from "react";
import { generateAnalysis } from "../utils/api";
import AnalysisPage from "./AnalysisPage";

const analyze = {
  overallScore: 80,
  recommendations: [
    {
      confidence: "High",
      effort: "Low",
      experiment: `A/B test a CTA or subtext that clearly states "Start Your 7-Day Free Trial" or "7-Day Free Trial (No credit card needed)" to align with the ad's promise.`,
      impact: "High",
      priority: "High",
      reason:
        'The advertisement specifically mentions a "7-day free trial", but the landing page only states "Start Free Trial." This discrepancy could lead to confusion or missed expectations for visitors who clicked expecting a specific trial length.',
      title: "Clarify Free Trial Duration",
    },
    {
      confidence: "Medium",
      effort: "Low",
      experiment:
        'A/B test adding elements of urgency such as "Limited-time offer!" or reinforcing the "today" from the ad in the CTA or surrounding text, e.g., "Start your free trial today!".',
      impact: "Medium",
      priority: "Medium",
      reason:
        'The ad included "Start your 7-day free trial today!", implying a call for immediate action. The landing page largely loses this sense of urgency, which can reduce conversion rates by not encouraging immediate signup.',
      title: "Introduce Urgency to the Offer",
    },
    {
      confidence: "Medium",
      effort: "Medium",
      experiment:
        "A/B test incorporating a small FAQ section or a brief statement addressing common concerns about AI-powered learning, such as its effectiveness, security, or how it differs from traditional learning.",
      impact: "Medium",
      priority: "Medium",
      reason:
        'While "No credit card required" addresses a financial objection, visitors new to AI-powered learning might have concerns about its efficacy, privacy, or what happens after the trial ends. Proactively addressing these could build more trust.',
      title: "Enhance Objection Handling",
    },
  ],
  sections: {
    cta: {
      evidence: [Array],
      reason: `The call-to-action is prominent, concise, and directly invites the user to start the free trial, aligning well with the ad's directive. The "No credit card required" note effectively reduces friction, making the offer more appealing.`,
      score: 90,
    },
    headline: {
      evidence: [Array],
      reason: `The landing page's headline and sub-headline strongly echo the ad's primary message, using keywords like "AI," "Master New Skills," "Personalized learning paths," "Interactive lessons," and "Track your progress," ensuring excellent continuity for the visitor.`,
      score: 95,
    },
    objections: {
      evidence: [Array],
      reason:
        'The landing page effectively addresses one significant objection by stating "No credit card required" for the free trial. However, it could further enhance trust and conversion by proactively addressing other common concerns related to AI learning or commitment beyond the trial.',
      score: 60,
    },
    offer: {
      evidence: [Array],
      reason: `The landing page clearly offers a "Free Trial," which directly matches the ad's promise. However, it omits the specific "7-day" duration mentioned in the ad, which could create a minor disconnect for visitors expecting that particular timeframe.`,
      score: 80,
    },
    persona: {
      evidence: [Array],
      reason:
        "The landing page content and features strongly resonate with individuals looking to acquire new skills efficiently through personalized and engaging learning, directly matching the ad's implied target audience of those wanting to 'Unlock Your Potential' and 'master new skills faster'.",
      score: 95,
    },
    proof: {
      evidence: [Array],
      reason:
        "The landing page includes two positive testimonials that serve as valuable social proof, helping to build trust and reinforce the benefits of the AI-powered learning platform, even though explicit proof wasn't mentioned in the ad.",
      score: 85,
    },
    urgency: {
      evidence: [],
      reason: `The landing page lacks specific elements to create urgency or scarcity. The ad's subtle urgency with "Start your 7-day free trial today!" is not carried over, as the page omits both the "7-day" and "today" aspects.`,
      score: 40,
    },
    valueProposition: {
      evidence: [Array],
      reason:
        "The landing page effectively communicates the core benefits and value proposition, such as AI-powered personalized learning, interactive lessons, and progress tracking, which directly align with and elaborate on the ad's promise of mastering new skills faster and unlocking potential.",
      score: 90,
    },
  },
  strengths: [
    "Excellent headline-to-ad match, providing immediate continuity.",
    "Clear and well-articulated value proposition, reinforcing core benefits.",
    "Strong social proof through relevant testimonials, building trust.",
    "Clear and compelling Call-to-Action, with friction reduction ('No credit card required').",
    "Strong alignment with the target persona, using appropriate language and features.",
  ],
  summary: `The landing page provides a strong continuation of the advertisement's message, with excellent alignment in headline, value proposition, and target persona. While the free trial offer is clear and compelling, it omits the specific "7-day" duration from the ad and lacks any urgency, which could be improved. The inclusion of testimonials is a strong point for building trust and credibility.`,
  verdict: "Good",
  weaknesses: [
    "The landing page fails to specify the '7-day' duration of the free trial as advertised.",
    "Lack of urgency or scarcity elements, which were subtly present in the ad's 'today!' prompt.",
    "Limited handling of potential customer objections beyond the 'no credit card required' statement.",
  ],
};

const HomePage = () => {
  const [inputType, setInputType] = useState("text");

  const [adText, setAdText] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState(analyze);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (!file) return;

    setImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const clearImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setImage(null);
  };

  const handleGenerateButton = async () => {
    try {
      if (!url.trim()) {
        return alert("Landing Page URL is required.");
      }

      if (inputType === "text" && !adText.trim()) {
        setImage(null);
        return alert("Please enter advertisement copy.");
      }

      if (inputType === "image" && !image) {
        setAdText(null);
        return alert("Please upload an advertisement image.");
      }

      const formData = await new FormData();

      formData.append("url", url);
      if (inputType === "text") formData.append("adText", adText);
      else formData.append("adImage", image);

      //! this ai api call
      setLoading(true);
      const response = generateAnalysis(formData);
      setAnalysis(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50">
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl"></div>

      <div className="absolute right-0 top-52 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-indigo-200 bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            AI Powered CRO Analysis
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Ad → Landing Page
            <span className="block bg-gradient from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Fit Analyzer
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Compare your advertisement with the landing page and instantly
            discover messaging gaps, weak CTAs, missing proof, offer
            inconsistencies, and AI-powered CRO recommendations.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
          {/* Toggle */}

          <div className="mb-8 flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setInputType("text")}
              className={`flex-1 rounded-lg py-3 text-sm font-semibold transition ${
                inputType === "text"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600"
              }`}
            >
              📝 Ad Copy
            </button>

            <button
              type="button"
              onClick={() => setInputType("image")}
              className={`flex-1 rounded-lg py-3 text-sm font-semibold transition ${
                inputType === "image"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600"
              }`}
            >
              🖼 Ad Image
            </button>
          </div>

          {/* Text */}

          {inputType === "text" ? (
            <div>
              <label className="mb-2 block font-medium">
                Advertisement Copy
              </label>

              <textarea
                rows={7}
                value={adText}
                onChange={(e) => setAdText(e.target.value)}
                placeholder="Paste advertisement copy..."
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          ) : (
            <div>
              <label className="mb-2 block font-medium">
                Upload Advertisement
              </label>

              <label
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 hover:border-indigo-500 hover:bg-indigo-50"
              >
                {image ? (
                  <>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="max-h-64 rounded-xl"
                    />

                    <p className="mt-4 text-green-600 font-medium">
                      {image.name}
                    </p>

                    <button
                      type="button"
                      onClick={clearImage}
                      className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-red-600"
                    >
                      Remove Image
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-5xl">📷</div>

                    <p className="mt-4 text-lg font-semibold">
                      Drag & Drop or Click
                    </p>

                    <p className="text-sm text-slate-500">PNG, JPG, JPEG</p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}

          {/* URL */}

          <div className="mt-8">
            <label className="mb-2 block font-medium">Landing Page URL</label>

            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <button
            onClick={handleGenerateButton}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 py-4 text-lg font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating Report..." : "🚀 Generate AI Report"}
          </button>
        </div>
      </div>

      {analysis && <AnalysisPage analysis={analysis} />}
    </section>
  );
};

export default HomePage;
