import React, { useState } from 'react';
import axios from 'axios';
import { Brain, Zap, Globe, Building2, Swords, TrendingUp, LayoutGrid, Target, GitBranch, Sparkles, FileText } from 'lucide-react';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';

const App = () => {
  const [industry, setIndustry] = useState('');
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('external');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('/analyze', { industry, problem });
      setResult(response.data);
      setActiveTab('external');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 429) {
        setError('Too many requests. Please wait a moment before trying again.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Unable to connect to the analysis server. Make sure the backend is running on port 3001.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 selection:bg-red-500/30 cyber-grid">
      <header className="border-b border-red-500/20 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-lg blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="bg-black border border-red-500/50 p-2 rounded-lg relative z-10 neon-glow-red">
                <Brain className="w-7 h-7 text-red-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black italic tracking-[0.1em] text-white flex items-baseline gap-1">
                <span className="futuristic-text text-3xl">STRATEGY</span>
                <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] font-black uppercase text-4xl">JEDI</span>
              </h1>
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-red-500/50"></div>
                <p className="text-[10px] text-red-400/80 font-black tracking-[0.3em] uppercase">
                  Neural Strategic Core
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">System Status</span>
              <span className="flex items-center gap-2 text-xs font-bold text-green-400">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                OPERATIONAL
              </span>
            </div>
            <div className="h-10 w-px bg-white/5"></div>
            <div className="flex items-center gap-3 px-4 py-2 bg-red-500/5 border border-red-500/10 rounded-full">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">V3.3 Versatile</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
        <section>
          <InputForm
            industry={industry}
            setIndustry={setIndustry}
            problem={problem}
            setProblem={setProblem}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </section>

        <section className="min-h-[600px] border-t border-white/5 pt-8">
          <ResultsDisplay
            result={result}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            loading={loading}
            error={error}
          />
        </section>
      </main>

      <footer className="w-full max-w-7xl mx-auto shrink-0 mt-12 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 z-10 relative px-4">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <span className="text-slate-500 uppercase font-black tracking-widest text-[10px]">Lead Developer:</span>
          <span className="font-bold text-white tracking-tight">Denzil Josteve Fernandes</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://denziljosteve.github.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-400 transition-all duration-300 group">
            <Globe className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Terminal</span>
          </a>
          <a href="https://www.linkedin.com/in/denziljosteve/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-400 transition-all duration-300 group">
            <svg className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span className="font-bold uppercase tracking-widest text-[10px]">LinkedIn</span>
          </a>
          <a href="https://github.com/denziljosteve" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-400 transition-all duration-300 group">
            <svg className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            <span className="font-bold uppercase tracking-widest text-[10px]">Repository</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
