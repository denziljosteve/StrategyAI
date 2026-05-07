import React from 'react';
import { Zap, Loader2 } from 'lucide-react';

const InputForm = ({ industry, setIndustry, problem, setProblem, onSubmit, loading }) => {
  return (
    <div className="glass p-6 neon-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-600/20 p-2 rounded-lg border border-red-500/30">
          <Zap className="w-6 h-6 text-red-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Strategy Configuration</h2>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Industry
          </label>
          <input
            type="text"
            required
            maxLength={100}
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="e.g. Electric Vehicles"
            className="w-full bg-gray-900/50 border border-white/10 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all placeholder:text-gray-600"
          />
        </div>

        <div className="lg:col-span-6">
          <div className="flex justify-between mb-2">
            <label className="block text-sm font-medium text-gray-400">
              Business Problem
            </label>
            <span className={`text-[10px] ${problem.length > 900 ? 'text-red-400' : 'text-gray-600'}`}>
              {problem.length}/1000
            </span>
          </div>
          <input
            type="text"
            required
            maxLength={1000}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe the core strategic challenge..."
            className="w-full bg-gray-900/50 border border-white/10 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all placeholder:text-gray-600"
          />
        </div>

        <div className="lg:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 h-[50px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analysing...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-current" />
                <span>Generate Strategy</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
