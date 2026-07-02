import React, { useState } from "react";
import { generateAnalysis } from "../utils/api";
import AnalysisPage from "./AnalysisPage";

const HomePage = () => {
  const [inputType, setInputType] = useState("text");

  const [adText, setAdText] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState(null);

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
