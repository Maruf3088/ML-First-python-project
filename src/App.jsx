import { useState } from "react";
import axios from "axios";

function App() {
  const [iq, setIq] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!iq || !cgpa) {
      alert("Please enter both IQ and CGPA.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://ml-first-python-project-backend-1.onrender.com/predict",
        {
          iq: Number(iq),
          cgpa: Number(cgpa),
        }
      );

      setResult({
        prediction: response.data.prediction,
        message: response.data.result,
      });
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the prediction server.");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-20 -left-20"></div>

      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -bottom-20 -right-20"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-blue-600/30">
            <span className="text-3xl">🎓</span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Placement Predictor
          </h1>

          <p className="text-slate-400 mt-2">
            Predict your placement possibility using AI
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* IQ */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              IQ Score
            </label>

            <input
              type="number"
              value={iq}
              onChange={(e) => setIq(e.target.value)}
              placeholder="Enter your IQ score"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          {/* CGPA */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              CGPA
            </label>

            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              placeholder="Enter your CGPA"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-lg shadow-blue-600/20 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Predict Placement"}
          </button>

        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Powered by Machine Learning
        </p>
      </div>

      {/* RESULT POPUP */}
      {result && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 z-50">

          <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl shadow-2xl p-8 text-center">

            {/* Icon */}
            <div
              className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-5 ${
                result.prediction === 1
                  ? "bg-emerald-500/20"
                  : "bg-red-500/20"
              }`}
            >
              <span className="text-4xl">
                {result.prediction === 1 ? "🎉" : "📊"}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-3">
              {result.prediction === 1
                ? "Placement Likely!"
                : "Placement Less Likely"}
            </h2>

            {/* Result */}
            <p
              className={`text-lg font-semibold mb-6 ${
                result.prediction === 1
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {result.message}
            </p>

            {/* User Data */}
            <div className="bg-white/5 rounded-2xl p-4 mb-6 text-left space-y-3">

              <div className="flex justify-between">
                <span className="text-slate-400">IQ Score</span>
                <span className="text-white font-semibold">
                  {iq}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">CGPA</span>
                <span className="text-white font-semibold">
                  {cgpa}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Prediction</span>
                <span
                  className={`font-semibold ${
                    result.prediction === 1
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {result.prediction === 1 ? "Positive" : "Negative"}
                </span>
              </div>

            </div>

            {/* Close */}
            <button
              onClick={closePopup}
              className="w-full bg-white text-slate-900 font-semibold py-3 rounded-xl hover:bg-slate-200 transition"
            >
              Try Again
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;