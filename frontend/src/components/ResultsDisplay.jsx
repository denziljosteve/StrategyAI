import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Copy, 
  Download, 
  Check, 
  AlertCircle, 
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  XCircle,
  Zap,
  Target,
  GitBranch,
  FileText,
  Info,
  Swords,
  Globe,
  ChevronLeft
} from 'lucide-react';
import TabNav, { TABS } from './TabNav';
import FrameworkCard from './FrameworkCard';

const ResultsDisplay = ({ result, activeTab, setActiveTab, loading, error }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    document.head.appendChild(script);
    script.onload = () => {
      const element = document.getElementById('results-content');
      const opt = {
        margin: 10,
        filename: 'StrategyJEDI-Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#030712' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      window.html2pdf().set(opt).from(element).save();
    };
  };

  const FrameworkHeader = ({ description, rationale }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
        <h4 className="text-[10px] font-black text-red-400 uppercase mb-2 tracking-widest flex items-center gap-2">
          <Info className="w-3.5 h-3.5" /> Framework Context
        </h4>
        <p className="text-sm text-gray-300 leading-relaxed italic">"{description}"</p>
      </div>
      <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-xl">
        <h4 className="text-[10px] font-black text-blue-400 uppercase mb-2 tracking-widest flex items-center gap-2">
          <Zap className="w-3.5 h-3.5" /> Stance Rationale
        </h4>
        <p className="text-sm text-gray-400 leading-relaxed">{rationale}</p>
      </div>
    </div>
  );

  const navigateTab = (direction) => {
    const currentIndex = TABS.findIndex(tab => tab.key === activeTab);
    if (direction === 'next' && currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].key);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].key);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center animate-pulse-slow p-12 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <Brain className="w-20 h-20 text-red-500 relative z-10" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Synthesizing Strategy...</h2>
        <p className="text-lg text-gray-400 max-w-lg">
          Our AI partner is analyzing your industry dynamics and competitive landscape to build a McKinsey-grade report.
        </p>
        <div className="mt-8 flex gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass p-10 neon-border border-red-500/30 flex flex-col items-center text-center">
        <AlertCircle className="w-20 h-20 text-red-500 mb-6" />
        <h3 className="text-2xl font-bold text-white mb-3">Analysis Failed</h3>
        <p className="text-red-400 text-lg mb-8">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl hover:bg-red-500/20 transition-all font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-16 text-center border-2 border-dashed border-white/5 rounded-3xl bg-black/20">
        <div className="bg-white/5 p-8 rounded-full mb-8">
          <Brain className="w-20 h-20 text-gray-700" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Awaiting Intelligence</h2>
        <p className="text-gray-500 text-lg max-w-md">
          Enter your industry and business problem in the sidebar to generate a comprehensive strategic analysis.
        </p>
      </div>
    );
  }

  const getIntensityClass = (intensity) => {
    switch (intensity?.toLowerCase()) {
      case 'high': return 'intensity-high';
      case 'medium': return 'intensity-medium';
      case 'low': return 'intensity-low';
      default: return '';
    }
  };

  const renderExternal = (data) => (
    <div className="space-y-12">
      {data.porters_five_forces && (
        <section>
          <FrameworkHeader description={data.porters_five_forces.framework_description} rationale={data.porters_five_forces.stance_rationale} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.porters_five_forces.forces && Object.entries(data.porters_five_forces.forces).map(([key, value]) => (
              <FrameworkCard 
                key={key} 
                title={key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} 
                accent={value?.intensity?.toLowerCase() === 'high' ? 'red' : value?.intensity?.toLowerCase() === 'medium' ? 'amber' : 'green'}
              >
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                  <span className="text-sm text-gray-400 uppercase tracking-widest">Intensity</span>
                  <span className={`text-sm font-black uppercase ${getIntensityClass(value?.intensity)}`}>{value?.intensity}</span>
                </div>
                <ul className="space-y-3">
                  {value?.implications && value.implications.map((imp, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <ChevronRight className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                      <span className="text-base">{imp}</span>
                    </li>
                  ))}
                </ul>
              </FrameworkCard>
            ))}
          </div>
        </section>
      )}

      {data.pestle && (
        <section>
          <FrameworkHeader description={data.pestle.framework_description} rationale={data.pestle.stance_rationale} />
          <FrameworkCard title="PESTLE Analysis" subtitle="Macro-Environmental Factors" accent="blue">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2">
              {data.pestle.factors && Object.entries(data.pestle.factors).map(([key, factors]) => (
                <div key={key}>
                  <h4 className="text-sm font-black text-red-400 uppercase mb-4 flex items-center gap-2 tracking-widest">
                    <div className="w-1.5 h-4 bg-red-500 rounded-full"></div>
                    {key}
                  </h4>
                  <ul className="space-y-3">
                    {Array.isArray(factors) && factors.map((f, idx) => (
                      <li key={idx} className="text-sm leading-relaxed text-gray-300">• {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FrameworkCard>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {data.strategic_groups && (
          <section>
            <FrameworkHeader description={data.strategic_groups.framework_description} rationale={data.strategic_groups.stance_rationale} />
            <FrameworkCard title="Strategic Groups" accent="amber">
              <div className="space-y-5">
                {data.strategic_groups.groups?.map((group, idx) => (
                  <div key={idx} className="bg-white/5 p-5 rounded-xl border border-white/5">
                    <h4 className="text-lg font-bold text-white mb-2">{group?.group_name}</h4>
                    <p className="text-xs text-gray-500 mb-3 tracking-wide">{group?.key_players?.join(', ')}</p>
                    <p className="text-base italic text-red-400 border-l-2 border-red-500/30 pl-4">{group?.strategic_implication}</p>
                  </div>
                ))}
              </div>
            </FrameworkCard>
          </section>
        )}

        {data.stp && (
          <section>
            <FrameworkHeader description={data.stp.framework_description} rationale={data.stp.stance_rationale} />
            <FrameworkCard title="STP Framework" subtitle="Segmentation, Targeting, Positioning" accent="green">
              <div className="space-y-6">
                {data.stp.targeting && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-bold">Targeting Recommendation</p>
                    <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-xl">
                      <p className="text-lg font-black text-green-400 mb-2">{data.stp.targeting.recommended_segment}</p>
                      <p className="text-base text-gray-300 leading-relaxed">{data.stp.targeting.rationale}</p>
                    </div>
                  </div>
                )}
                {data.stp.positioning && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-bold">Positioning Statement</p>
                    <p className="text-lg leading-relaxed italic border-l-4 border-red-500 pl-6 py-2 bg-red-500/5 rounded-r-xl">
                      "{data.stp.positioning.statement}"
                    </p>
                  </div>
                )}
              </div>
            </FrameworkCard>
          </section>
        )}
      </div>
    </div>
  );

  const renderInternal = (data) => (
    <div className="space-y-12">
      {data.swot && (
        <section>
          <FrameworkHeader description={data.swot.framework_description} rationale={data.swot.stance_rationale} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl">
              <h4 className="text-sm font-black text-green-400 uppercase mb-4 tracking-widest">Strengths</h4>
              <ul className="space-y-4">
                {data.swot.quadrants?.strengths?.map((s, idx) => (
                  <li key={idx} className="text-sm leading-snug text-gray-300">
                    <span className="font-black block text-green-400 mb-1">{s.point}</span>
                    {s.implication}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
              <h4 className="text-sm font-black text-red-400 uppercase mb-4 tracking-widest">Weaknesses</h4>
              <ul className="space-y-4">
                {data.swot.quadrants?.weaknesses?.map((s, idx) => (
                  <li key={idx} className="text-sm leading-snug text-gray-300">
                    <span className="font-black block text-red-400 mb-1">{s.point}</span>
                    {s.implication}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
              <h4 className="text-sm font-black text-blue-400 uppercase mb-4 tracking-widest">Opportunities</h4>
              <ul className="space-y-4">
                {data.swot.quadrants?.opportunities?.map((s, idx) => (
                  <li key={idx} className="text-sm leading-snug text-gray-300">
                    <span className="font-black block text-blue-400 mb-1">{s.point}</span>
                    {s.implication}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl">
              <h4 className="text-sm font-black text-amber-400 uppercase mb-4 tracking-widest">Threats</h4>
              <ul className="space-y-4">
                {data.swot.quadrants?.threats?.map((s, idx) => (
                  <li key={idx} className="text-sm leading-snug text-gray-300">
                    <span className="font-black block text-amber-400 mb-1">{s.point}</span>
                    {s.implication}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {data.vrio && (
        <section>
          <FrameworkHeader description={data.vrio.framework_description} rationale={data.vrio.stance_rationale} />
          <FrameworkCard title="VRIO Analysis" subtitle="Resource-Based View" accent="red">
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm">
                <thead className="text-gray-500 border-b border-white/5">
                  <tr>
                    <th className="text-left py-3 px-2">Resource</th>
                    <th className="px-3">V</th>
                    <th className="px-3">R</th>
                    <th className="px-3">I</th>
                    <th className="px-3">O</th>
                    <th className="text-right py-3 px-2">Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.vrio.analysis?.map((v, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-2 font-bold text-white">{v.resource}</td>
                      <td className="text-center px-3">{v.valuable ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-red-500 mx-auto" />}</td>
                      <td className="text-center px-3">{v.rare ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-red-500 mx-auto" />}</td>
                      <td className="text-center px-3">{v.inimitable ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-red-500 mx-auto" />}</td>
                      <td className="text-center px-3">{v.organized ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-red-500 mx-auto" />}</td>
                      <td className="text-right py-4 px-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter ${
                          v.competitive_advantage?.includes('Sustained') ? 'bg-green-500/20 text-green-400' :
                          v.competitive_advantage?.includes('Temporary') ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {v.competitive_advantage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FrameworkCard>
        </section>
      )}

      {data.value_chain && (
        <section>
          <FrameworkHeader description={data.value_chain.framework_description} rationale={data.value_chain.stance_rationale} />
          <FrameworkCard title="Porter's Value Chain" accent="blue">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-4">
              <div>
                <h4 className="text-xs font-black text-blue-400 uppercase mb-6 tracking-[0.2em] flex items-center gap-3">
                  <div className="w-8 h-px bg-blue-500/50"></div>
                  Primary Activities
                </h4>
                <div className="space-y-6">
                  {data.value_chain.primary_activities && Object.entries(data.value_chain.primary_activities).map(([key, val]) => (
                    <div key={key} className="flex flex-col gap-2">
                      <div className="text-xs text-gray-500 uppercase font-black tracking-widest">{key.replace(/_/g, ' ')}</div>
                      <div className="text-base text-gray-300 border-l-2 border-white/5 pl-4 py-1">{val}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-black text-red-400 uppercase mb-6 tracking-[0.2em] flex items-center gap-3">
                  <div className="w-8 h-px bg-red-500/50"></div>
                  Support Activities
                </h4>
                <div className="space-y-6">
                  {data.value_chain.support_activities && Object.entries(data.value_chain.support_activities).map(([key, val]) => (
                    <div key={key} className="flex flex-col gap-2">
                      <div className="text-xs text-gray-500 uppercase font-black tracking-widest">{key.replace(/_/g, ' ')}</div>
                      <div className="text-base text-gray-300 border-l-2 border-white/5 pl-4 py-1">{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FrameworkCard>
        </section>
      )}

      {data.core_competencies && (
        <section>
          <FrameworkHeader description={data.core_competencies.framework_description} rationale={data.core_competencies.stance_rationale} />
          <FrameworkCard title="Core Competencies" accent="red">
            <div className="space-y-5">
              {data.core_competencies.competencies?.map((comp, idx) => (
                <div key={idx} className="bg-white/5 p-5 rounded-xl border border-white/5">
                  <h4 className="text-lg font-bold text-white mb-2">{comp?.competency}</h4>
                  <p className="text-sm text-gray-400 mb-3 leading-relaxed">{comp?.evidence}</p>
                  <p className="text-base italic text-red-400 border-l-2 border-red-500/30 pl-4">{comp?.competitive_relevance}</p>
                </div>
              ))}
            </div>
          </FrameworkCard>
        </section>
      )}
    </div>
  );

  const renderCompetitive = (data) => (
    <div className="space-y-12">
      {data.porters_generic && (
        <section>
          <FrameworkHeader description={data.porters_generic.framework_description} rationale={data.porters_generic.stance_rationale} />
          <FrameworkCard title="Porter's Generic Strategy" accent="red">
            <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl mb-8 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <Swords className="w-48 h-48 text-red-500" />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-10 relative z-10">
                <div className="shrink-0 text-center md:text-left">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 font-black">Strategic Choice</p>
                  <h4 className="text-4xl font-black text-white tracking-tighter">{data.porters_generic.recommended}</h4>
                </div>
                <div className="hidden md:block h-20 w-px bg-white/10"></div>
                <p className="text-lg text-gray-300 leading-relaxed font-medium">{data.porters_generic.justification}</p>
              </div>
            </div>
            <div className="p-2">
              <h4 className="text-xs font-black text-gray-500 uppercase mb-4 tracking-widest flex items-center gap-3">
                <AlertCircle className="w-4 h-4" />
                Strategic Trade-offs
              </h4>
              <p className="text-base text-gray-400 italic leading-relaxed border-l-2 border-white/10 pl-6">{data.porters_generic.why_others_unsuitable}</p>
            </div>
          </FrameworkCard>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {data.blue_ocean && (
          <section>
            <FrameworkHeader description={data.blue_ocean.framework_description} rationale={data.blue_ocean.stance_rationale} />
            <FrameworkCard title="Blue Ocean Strategy" subtitle="Value Innovation Opportunities" accent="blue">
              <div className="space-y-5 mt-2">
                {data.blue_ocean.opportunities?.map((opt, idx) => (
                  <div key={idx} className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-xl">
                    <h4 className="text-lg font-black text-blue-400 mb-3">{opt?.opportunity}</h4>
                    <p className="text-base text-gray-300 mb-4 leading-relaxed">{opt?.how_to_create}</p>
                    <div className="bg-blue-500/10 px-4 py-2 rounded-lg text-sm text-blue-300 font-black uppercase tracking-widest inline-block">
                      Impact: {opt?.value_innovation}
                    </div>
                  </div>
                ))}
              </div>
            </FrameworkCard>
          </section>
        )}
        {data.red_ocean && (
          <section>
            <FrameworkHeader description={data.red_ocean.framework_description} rationale={data.red_ocean.stance_rationale} />
            <FrameworkCard title="Red Ocean Tactics" subtitle="Head-to-Head Competitive Moves" accent="red">
              <div className="space-y-5 mt-2">
                {data.red_ocean.battlegrounds?.map((move, idx) => (
                  <div key={idx} className="bg-red-500/5 border border-red-500/10 p-6 rounded-xl">
                    <h4 className="text-lg font-black text-red-400 mb-2">{move?.battleground}</h4>
                    <p className="text-sm text-gray-500 mb-4 tracking-wide font-medium">{move?.current_dynamics}</p>
                    <div className="flex items-center gap-3 text-base text-white font-bold bg-white/5 p-3 rounded-lg">
                      <Zap className="w-5 h-5 text-red-500" />
                      {move?.recommended_tactic}
                    </div>
                  </div>
                ))}
              </div>
            </FrameworkCard>
          </section>
        )}
      </div>
    </div>
  );

  const renderGrowth = (data) => (
    <div className="space-y-12">
      {data.ansoff && (
        <section>
          <FrameworkHeader description={data.ansoff.framework_description} rationale={data.ansoff.stance_rationale} />
          <FrameworkCard title="Ansoff Matrix" accent="green">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {data.ansoff.matrix && Object.entries(data.ansoff.matrix).map(([key, val]) => (
                <div key={key} className="glass p-6 relative overflow-hidden group hover:neon-border transition-all">
                  <div className={`absolute top-0 right-0 px-4 py-1.5 text-xs font-black uppercase tracking-widest ${getIntensityClass(val?.attractiveness)}`}>
                    {val?.attractiveness}
                  </div>
                  <h4 className="text-xs font-black text-gray-500 uppercase mb-5 tracking-[0.2em]">{key.replace(/_/g, ' ')}</h4>
                  <ul className="space-y-3">
                    {val?.actions && val.actions.map((act, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex gap-3 leading-relaxed">
                        <span className="text-green-500 font-black">+</span> {act}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FrameworkCard>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {data.bcg_matrix && (
          <section>
            <FrameworkHeader description={data.bcg_matrix.framework_description} rationale={data.bcg_matrix.stance_rationale} />
            <FrameworkCard title="BCG Portfolio Matrix" accent="amber">
              <div className="space-y-4 mt-2">
                {data.bcg_matrix.units?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white/5 p-5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="pr-4">
                      <p className="text-base font-black text-white mb-1">{item?.unit}</p>
                      <p className="text-sm text-gray-400 leading-snug">{item?.recommendation}</p>
                    </div>
                    <span className={`shrink-0 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${
                      item?.category?.includes('Star') ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      item?.category?.includes('Cow') ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      item?.category?.includes('Question') ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                      'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}>
                      {item?.category}
                    </span>
                  </div>
                ))}
              </div>
            </FrameworkCard>
          </section>
        )}
        {data.ge_mckinsey && (
          <section>
            <FrameworkHeader description={data.ge_mckinsey.framework_description} rationale={data.ge_mckinsey.stance_rationale} />
            <FrameworkCard title="GE-McKinsey Matrix" accent="blue">
              <div className="space-y-4 mt-2">
                {data.ge_mckinsey.units?.map((item, idx) => (
                  <div key={idx} className="bg-white/5 p-5 rounded-xl flex flex-col gap-4 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start">
                      <p className="text-base font-black text-white">{item?.unit}</p>
                      <span className={`px-3 py-1 rounded text-xs font-black uppercase tracking-widest ${
                        item?.investment_priority?.includes('Invest') ? 'bg-green-500 text-white' :
                        item?.investment_priority?.includes('Hold') ? 'bg-amber-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {item?.investment_priority}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/20 p-3 rounded-lg">
                        <p className="text-[10px] uppercase font-black text-gray-500 mb-1">Industry Attractiveness</p>
                        <p className={`text-sm ${getIntensityClass(item?.industry_attractiveness)}`}>{item?.industry_attractiveness}</p>
                      </div>
                      <div className="bg-black/20 p-3 rounded-lg">
                        <p className="text-[10px] uppercase font-black text-gray-500 mb-1">Business Strength</p>
                        <p className={`text-sm ${getIntensityClass(item?.business_strength)}`}>{item?.business_strength}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FrameworkCard>
          </section>
        )}
      </div>
    </div>
  );

  const renderBusinessModel = (data) => (
    <div className="space-y-12">
      {data.business_model_canvas && (
        <section>
          <FrameworkHeader description={data.business_model_canvas.framework_description} rationale={data.business_model_canvas.stance_rationale} />
          <FrameworkCard title="Business Model Canvas" accent="red">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
              <div className="lg:row-span-2 flex flex-col gap-4">
                <div className="glass p-5 flex-1">
                  <h4 className="text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest">Key Partners</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    {data.business_model_canvas.blocks?.key_partnerships?.map((p, i) => <li key={i} className="leading-tight">• {p}</li>)}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-1 flex flex-col gap-4">
                <div className="glass p-5 flex-1">
                  <h4 className="text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest">Key Activities</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    {data.business_model_canvas.blocks?.key_activities?.map((p, i) => <li key={i} className="leading-tight">• {p}</li>)}
                  </ul>
                </div>
                <div className="glass p-5 flex-1">
                  <h4 className="text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest">Key Resources</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    {data.business_model_canvas.blocks?.key_resources?.map((p, i) => <li key={i} className="leading-tight">• {p}</li>)}
                  </ul>
                </div>
              </div>
              <div className="lg:row-span-2 flex flex-col gap-4">
                <div className="bg-red-500/10 border border-red-500/20 p-6 flex-1 relative overflow-hidden">
                  <div className="absolute top-2 right-2 opacity-10">
                    <Zap className="w-12 h-12 text-red-500" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase text-red-400 mb-4 tracking-widest">Value Propositions</h4>
                  <ul className="text-base text-white space-y-3 relative z-10">
                    {data.business_model_canvas.blocks?.value_propositions?.map((p, i) => <li key={i} className="font-bold leading-snug">• {p}</li>)}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-1 flex flex-col gap-4">
                <div className="glass p-5 flex-1">
                  <h4 className="text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest">Customer Relationships</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    {data.business_model_canvas.blocks?.customer_relationships?.map((p, i) => <li key={i} className="leading-tight">• {p}</li>)}
                  </ul>
                </div>
                <div className="glass p-5 flex-1">
                  <h4 className="text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest">Channels</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    {data.business_model_canvas.blocks?.channels?.map((p, i) => <li key={i} className="leading-tight">• {p}</li>)}
                  </ul>
                </div>
              </div>
              <div className="lg:row-span-2 flex flex-col gap-4">
                <div className="glass p-5 flex-1">
                  <h4 className="text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest">Customer Segments</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    {data.business_model_canvas.blocks?.customer_segments?.map((p, i) => <li key={i} className="leading-tight">• {p}</li>)}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-2 lg:row-start-3">
                <div className="glass p-5 h-full">
                  <h4 className="text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest">Cost Structure</h4>
                  <ul className="text-sm text-gray-400 grid grid-cols-2 gap-2">
                    {data.business_model_canvas.blocks?.cost_structure?.map((p, i) => <li key={i}>• {p}</li>)}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-3 lg:row-start-3">
                <div className="glass p-5 h-full">
                  <h4 className="text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest">Revenue Streams</h4>
                  <ul className="text-sm text-gray-400 grid grid-cols-2 gap-2">
                    {data.business_model_canvas.blocks?.revenue_streams?.map((p, i) => <li key={i}>• {p}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </FrameworkCard>
        </section>
      )}

      {data.jtbd && (
        <section>
          <FrameworkHeader description={data.jtbd.framework_description} rationale={data.jtbd.stance_rationale} />
          <FrameworkCard title="Jobs-To-Be-Done" subtitle="Customer Motivations" accent="blue">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {data.jtbd.jobs?.map((job, idx) => (
                <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-black text-white leading-tight">{job?.job}</h4>
                    <span className="shrink-0 px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">{job?.type}</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1 uppercase font-black tracking-widest">Current Solution</p>
                      <p className="text-sm text-gray-300">{job?.current_solution}</p>
                    </div>
                    <div className="bg-red-500/5 p-4 rounded-xl border-l-2 border-red-500">
                      <p className="text-[10px] text-red-400 mb-1 uppercase font-black tracking-widest">Strategic Opportunity</p>
                      <p className="text-base text-white font-bold italic">"{job?.opportunity}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FrameworkCard>
        </section>
      )}
    </div>
  );

  const renderExecution = (data) => (
    <div className="space-y-12">
      {data.balanced_scorecard && (
        <section>
          <FrameworkHeader description={data.balanced_scorecard.framework_description} rationale={data.balanced_scorecard.stance_rationale} />
          <FrameworkCard title="Balanced Scorecard" accent="green">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
              {data.balanced_scorecard.perspectives && Object.entries(data.balanced_scorecard.perspectives).map(([key, metrics]) => (
                <div key={key}>
                  <h4 className="text-xs font-black text-green-400 uppercase mb-6 tracking-[0.2em] flex items-center gap-3">
                    <div className="w-8 h-px bg-green-500/30"></div>
                    {key.replace(/_/g, ' ')}
                  </h4>
                  <div className="space-y-4">
                    {Array.isArray(metrics) && metrics.map((m, i) => (
                      <div key={i} className="bg-white/5 p-5 rounded-xl border-l-4 border-green-500/40 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-base font-black text-white leading-tight">{m?.kpi}</span>
                          <span className="shrink-0 text-sm font-black text-green-400 bg-green-400/10 px-2 py-0.5 rounded ml-4">{m?.target}</span>
                        </div>
                        <p className="text-sm text-gray-400 italic mt-3 flex gap-2">
                          <span className="text-green-500 font-black">Plan:</span> {m?.initiative}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FrameworkCard>
        </section>
      )}

      {data.okrs && (
        <section>
          <FrameworkHeader description={data.okrs.framework_description} rationale={data.okrs.stance_rationale} />
          <FrameworkCard title="Objectives & Key Results (OKRs)" accent="red">
            <div className="space-y-6 mt-6">
              {data.okrs.objectives?.map((okr, idx) => (
                <div key={idx} className="bg-white/5 p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Target className="w-24 h-24 text-red-500" />
                  </div>
                  <h4 className="text-xl font-black text-red-400 mb-8 flex items-center gap-4 relative z-10">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <Target className="w-6 h-6" />
                    </div>
                    {okr?.objective}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {okr?.key_results?.map((kr, i) => (
                      <div key={i} className="bg-black/40 p-5 rounded-xl flex gap-4 items-start border border-white/5 hover:border-red-500/30 transition-all">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5 border border-red-500/30">
                          <span className="text-xs font-black text-red-400">{i+1}</span>
                        </div>
                        <p className="text-sm text-gray-200 leading-relaxed font-medium">{kr}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FrameworkCard>
        </section>
      )}
    </div>
  );

  const renderDecisions = (data) => (
    <div className="space-y-12">
      {data.cost_benefit && (
        <section>
          <FrameworkHeader description={data.cost_benefit.framework_description} rationale={data.cost_benefit.stance_rationale} />
          <FrameworkCard title="Cost-Benefit Analysis" accent="amber">
            <div className="space-y-6 mt-4">
              {data.cost_benefit.initiatives?.map((item, idx) => (
                <div key={idx} className="bg-white/5 p-8 rounded-2xl border border-white/5 group hover:neon-border transition-all">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-black text-white tracking-tight">{item?.initiative}</h4>
                    <span className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] border ${
                      item?.recommendation?.includes('High') || item?.recommendation?.includes('Yes') || item?.recommendation?.includes('Primary') ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}>
                      Rec: {item?.recommendation}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-green-500/5 p-4 rounded-xl border border-green-500/10">
                      <p className="text-[10px] text-green-500/60 uppercase font-black mb-2 tracking-widest">Estimated Benefit</p>
                      <p className="text-lg font-black text-green-400">{item?.estimated_benefit}</p>
                    </div>
                    <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                      <p className="text-[10px] text-red-500/60 uppercase font-black mb-2 tracking-widest">Estimated Cost</p>
                      <p className="text-lg font-black text-red-400">{item?.estimated_cost}</p>
                    </div>
                    <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                      <p className="text-[10px] text-red-500/60 uppercase font-black mb-2 tracking-widest">NPV Rationale</p>
                      <p className="text-sm font-bold text-red-400 truncate">{item?.npv_rationale}</p>
                    </div>
                  </div>
                  <p className="text-base text-gray-400 italic leading-relaxed pl-6 border-l-2 border-white/10">
                    "{item?.npv_rationale}"
                  </p>
                </div>
              ))}
            </div>
          </FrameworkCard>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {data.scenario_planning && (
          <section>
            <FrameworkHeader description={data.scenario_planning.framework_description} rationale={data.scenario_planning.stance_rationale} />
            <FrameworkCard title="Scenario Planning" accent="blue">
              <div className="space-y-6 mt-4">
                {data.scenario_planning.scenarios?.map((s, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border-l-8 shadow-xl ${
                    s?.scenario?.includes('Optimistic') ? 'bg-green-500/5 border-l-green-500 shadow-green-500/5' :
                    s?.scenario?.includes('Base') ? 'bg-blue-500/5 border-l-blue-500 shadow-blue-500/5' :
                    'bg-red-500/5 border-l-red-500 shadow-red-500/5'
                  }`}>
                    <h4 className="text-sm font-black uppercase mb-3 text-white tracking-[0.2em]">{s?.scenario} Scenario</h4>
                    <p className="text-base text-gray-300 mb-6 leading-relaxed font-medium">{s?.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {s?.triggers?.map((t, i) => <span key={i} className="px-3 py-1 bg-black/40 text-[10px] text-gray-400 rounded-full border border-white/10 font-bold uppercase tracking-wider">{t}</span>)}
                    </div>
                    <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                      <p className="text-[10px] text-red-400 font-black uppercase mb-1 tracking-widest">Strategic Response</p>
                      <p className="text-base font-bold text-white">{s?.strategic_response}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FrameworkCard>
          </section>
        )}
        {data.decision_tree && (
          <section>
            <FrameworkHeader description={data.decision_tree.framework_description} rationale={data.decision_tree.stance_rationale} />
            <FrameworkCard title="Strategic Decision Tree" accent="red">
              <div className="space-y-8 mt-4">
                {data.decision_tree.trees?.map((d, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-black text-white mb-6 flex items-center gap-3 uppercase tracking-[0.2em]">
                      <div className="p-1.5 bg-red-500/20 rounded-md">
                        <GitBranch className="w-4 h-4 text-red-500" />
                      </div>
                      {d?.decision}
                    </h4>
                    <div className="space-y-4 pl-6 border-l-2 border-white/10 ml-3">
                      {d?.options?.map((opt, i) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-[26px] top-6 w-6 h-px bg-white/10"></div>
                          <div className="bg-white/5 p-5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-base font-bold text-gray-200">{opt?.option}</span>
                              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-500/10 px-2 py-1 rounded">{opt?.probability} Prob.</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-4 leading-relaxed"><span className="text-gray-400 font-bold">Outcome:</span> {opt?.outcome}</p>
                            {opt?.recommendation?.includes('Recommended') && <span className="text-[10px] px-3 py-1 bg-green-500/20 text-green-400 rounded-lg font-black tracking-widest border border-green-500/30">PRIMARY CHOICE</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FrameworkCard>
          </section>
        )}
      </div>
    </div>
  );

  const renderAdvanced = (data) => (
    <div className="space-y-12">
      {data.mckinsey_7s && (
        <section>
          <FrameworkHeader description={data.mckinsey_7s.framework_description} rationale={data.mckinsey_7s.stance_rationale} />
          <FrameworkCard title="McKinsey 7S Framework" accent="blue">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-4">
              {data.mckinsey_7s.elements && Object.entries(data.mckinsey_7s.elements).map(([key, val]) => {
                if (key === 'alignment_gaps') return null;
                return (
                  <div key={key} className="glass p-5 text-center group hover:neon-border transition-all">
                    <p className="text-[10px] font-black text-blue-400 uppercase mb-3 tracking-widest">{key}</p>
                    <p className="text-sm text-gray-200 leading-snug font-medium">{val}</p>
                  </div>
                );
              })}
            </div>
            {Array.isArray(data.mckinsey_7s.elements?.alignment_gaps) && (
              <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-2 right-2 opacity-10">
                  <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
                <h4 className="text-xs font-black text-red-400 uppercase mb-5 tracking-[0.2em] relative z-10">Alignment Gaps & Strategic Friction</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {data.mckinsey_7s.elements.alignment_gaps.map((gap, i) => (
                    <li key={i} className="text-sm text-gray-300 flex gap-3 leading-relaxed">
                      <span className="text-red-500 font-black">!</span> {gap}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </FrameworkCard>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.three_horizons && (
          <section>
            <FrameworkHeader description={data.three_horizons.framework_description} rationale={data.three_horizons.stance_rationale} />
            <FrameworkCard title="Three Horizons" accent="red">
              <div className="space-y-8 mt-2 p-2">
                <div className="bg-green-500/5 p-4 rounded-xl border border-green-500/10">
                  <p className="text-[10px] font-black text-green-400 uppercase mb-4 tracking-widest">H1: Core Operations</p>
                  <ul className="space-y-3">{data.three_horizons.horizons?.h1_core?.map((h, i) => <li key={i} className="text-sm text-gray-300 leading-relaxed">• {h}</li>)}</ul>
                </div>
                <div className="bg-blue-500/5 p-4 rounded-xl border border-blue-500/10">
                  <p className="text-[10px] font-black text-blue-400 uppercase mb-4 tracking-widest">H2: Emerging Opportunities</p>
                  <ul className="space-y-3">{data.three_horizons.horizons?.h2_emerging?.map((h, i) => <li key={i} className="text-sm text-gray-300 leading-relaxed">• {h}</li>)}</ul>
                </div>
                <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                  <p className="text-[10px] font-black text-red-400 uppercase mb-4 tracking-widest">H3: Transformational</p>
                  <ul className="space-y-3">{data.three_horizons.horizons?.h3_transformational?.map((h, i) => <li key={i} className="text-sm text-gray-300 leading-relaxed">• {h}</li>)}</ul>
                </div>
              </div>
            </FrameworkCard>
          </section>
        )}
        
        {data.disruptive_innovation && (
          <section>
            <FrameworkHeader description={data.disruptive_innovation.framework_description} rationale={data.disruptive_innovation.stance_rationale} />
            <FrameworkCard title="Disruption Assessment" accent="red">
              <div className="mb-8 flex items-center justify-between bg-red-500/10 p-6 rounded-2xl border border-red-500/20 mt-2">
                <span className="text-sm font-black text-white uppercase tracking-[0.2em]">Risk Profile</span>
                <span className={`text-3xl font-black tracking-tighter ${getIntensityClass(data.disruptive_innovation.risk_profile?.disruption_risk)}`}>{data.disruptive_innovation.risk_profile?.disruption_risk}</span>
              </div>
              <div className="space-y-6 p-2">
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase mb-3 tracking-widest">Primary Threat Sources</p>
                  <ul className="text-sm text-gray-400 space-y-2">{data.disruptive_innovation.risk_profile?.threat_sources?.map((t, i) => <li key={i} className="leading-snug">• {t}</li>)}</ul>
                </div>
                <div className="bg-red-500/5 p-5 rounded-xl border-l-4 border-red-500">
                  <p className="text-[10px] font-black text-red-400 uppercase mb-3 tracking-widest">Defensive Strategic Moves</p>
                  <ul className="text-sm text-gray-300 space-y-2">{data.disruptive_innovation.risk_profile?.defensive_moves?.map((t, i) => <li key={i} className="leading-snug font-medium">• {t}</li>)}</ul>
                </div>
              </div>
            </FrameworkCard>
          </section>
        )}

        {data.ecosystem_strategy && (
          <section>
            <FrameworkHeader description={data.ecosystem_strategy.framework_description} rationale={data.ecosystem_strategy.stance_rationale} />
            <FrameworkCard title="Platform & Ecosystem" accent="green">
              <div className="space-y-6 mt-4 p-2">
                <div className="bg-green-500/10 p-6 rounded-2xl border border-green-500/20 relative overflow-hidden group hover:neon-border transition-all">
                  <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Globe className="w-24 h-24 text-green-500" />
                  </div>
                  <p className="text-[10px] font-black text-green-400 uppercase mb-3 tracking-widest">Platform Opportunity</p>
                  <p className="text-lg text-white font-black leading-tight relative z-10">{data.ecosystem_strategy.strategy?.platform_opportunity}</p>
                </div>
                <div className="bg-white/5 p-5 rounded-xl">
                  <p className="text-[10px] font-black text-gray-500 uppercase mb-3 tracking-widest">Network Effects Strategy</p>
                  <p className="text-base text-gray-300 leading-relaxed italic border-l-2 border-green-500/30 pl-4">{data.ecosystem_strategy.strategy?.network_effects}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-widest">Critical Ecosystem Partners</p>
                  <div className="flex flex-wrap gap-2">{data.ecosystem_strategy.strategy?.key_partners?.map((p, i) => <span key={i} className="px-3 py-1.5 bg-white/10 rounded-lg text-xs text-gray-300 font-bold border border-white/5">{p}</span>)}</div>
                </div>
              </div>
            </FrameworkCard>
          </section>
        )}
      </div>
    </div>
  );

  const renderSummary = (data) => (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-10">
      <div className="glass p-16 neon-border border-red-500/40 relative overflow-hidden rounded-[2.5rem]">
        <div className="absolute top-0 right-0 p-8">
          <FileText className="w-20 h-20 text-red-500/10" />
        </div>
        <h3 className="text-xs font-black text-red-400 uppercase mb-12 tracking-[0.4em] flex items-center gap-6">
          <div className="h-px w-20 bg-red-500/30"></div>
          Lead Partner's Executive Synthesis
        </h3>
        <p className="text-3xl font-black text-white leading-tight mb-16 border-l-8 border-red-600 pl-12 py-4 bg-red-600/5 rounded-r-3xl italic">
          {data.executive_summary}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-16">
          <div className="md:col-span-2">
            <h4 className="text-xs font-black text-gray-500 uppercase mb-8 tracking-[0.2em] flex items-center gap-4">
               <TrendingUp className="w-4 h-4" />
               Critical Strategic Imperatives
            </h4>
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <span className="text-4xl font-black text-red-600 opacity-40 group-hover:opacity-100 transition-opacity">01</span>
                <p className="text-lg text-gray-200 font-medium leading-relaxed pt-1">Accelerate vertical integration and platform-led scale to capture unaddressed margin in the core segment.</p>
              </div>
              <div className="flex gap-6 group">
                <span className="text-4xl font-black text-red-600 opacity-40 group-hover:opacity-100 transition-opacity">02</span>
                <p className="text-lg text-gray-200 font-medium leading-relaxed pt-1">Pivot the business model toward an asset-light, ecosystem-first approach to drive exponential network effects.</p>
              </div>
              <div className="flex gap-6 group">
                <span className="text-4xl font-black text-red-600 opacity-40 group-hover:opacity-100 transition-opacity">03</span>
                <p className="text-lg text-gray-200 font-medium leading-relaxed pt-1">Institutionalize the Three Horizons framework to ensure continuous innovation without cannibalizing core cash flows.</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black text-red-500 uppercase mb-8 tracking-[0.2em] flex items-center gap-3">
              <AlertCircle className="w-4 h-4" />
              Existential Risk Vector
            </h4>
            <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl relative overflow-hidden group hover:bg-red-500/20 transition-all">
              <div className="absolute -bottom-4 -right-4 opacity-10">
                <Zap className="w-20 h-20 text-red-500" />
              </div>
              <p className="text-lg text-red-400 font-black leading-relaxed italic relative z-10">
                Strategic paralysis caused by legacy operational rigidity, leading to inevitable disruption by agile, tech-first entrants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    if (!result) return null;
    
    switch (activeTab) {
      case 'external': 
        return result.external_analysis ? renderExternal(result.external_analysis) : <div className="p-12 text-center text-gray-500 text-lg">External analysis data unavailable.</div>;
      case 'internal': 
        return result.internal_analysis ? renderInternal(result.internal_analysis) : <div className="p-12 text-center text-gray-500 text-lg">Internal analysis data unavailable.</div>;
      case 'competitive': 
        return result.competitive_strategy ? renderCompetitive(result.competitive_strategy) : <div className="p-12 text-center text-gray-500 text-lg">Competitive strategy data unavailable.</div>;
      case 'growth': 
        return result.growth_strategy ? renderGrowth(result.growth_strategy) : <div className="p-12 text-center text-gray-500 text-lg">Growth strategy data unavailable.</div>;
      case 'business_model': 
        return result.business_model ? renderBusinessModel(result.business_model) : <div className="p-12 text-center text-gray-500 text-lg">Business model data unavailable.</div>;
      case 'execution': 
        return result.execution ? renderExecution(result.execution) : <div className="p-12 text-center text-gray-500 text-lg">Execution data unavailable.</div>;
      case 'decisions': 
        return result.decision_frameworks ? renderDecisions(result.decision_frameworks) : <div className="p-12 text-center text-gray-500 text-lg">Decision frameworks data unavailable.</div>;
      case 'advanced': 
        return result.advanced_frameworks ? renderAdvanced(result.advanced_frameworks) : <div className="p-12 text-center text-gray-500 text-lg">Advanced frameworks data unavailable.</div>;
      case 'summary': 
        return result.executive_summary ? renderSummary(result) : <div className="p-12 text-center text-gray-500 text-lg">Executive summary unavailable.</div>;
      default: return null;
    }
  };

  const currentIndex = TABS.findIndex(tab => tab.key === activeTab);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Strategic Intelligence Report</h2>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-[0.3em]">Prepared by StrategyJEDI AI Model v3.3</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleCopyJSON}
            className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-black text-gray-300 hover:bg-white/10 transition-all uppercase tracking-widest"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy JSON'}
          </button>
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-3 px-6 py-3 bg-red-600 border border-red-500 rounded-xl text-sm font-black text-white hover:bg-red-500 transition-all shadow-xl shadow-red-900/40 uppercase tracking-widest"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="flex items-center bg-black/20 border border-white/5 rounded-2xl p-1 gap-2 mb-8 neon-border-subtle">
        <button 
          onClick={() => navigateTab('prev')}
          disabled={currentIndex === 0}
          className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-red-400 hover:bg-white/10 transition-all disabled:opacity-5 disabled:cursor-not-allowed group shrink-0"
          title="Previous Dimension"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        
        <div className="flex-1 min-w-0">
          <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <button 
          onClick={() => navigateTab('next')}
          disabled={currentIndex === TABS.length - 1}
          className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-red-400 hover:bg-white/10 transition-all disabled:opacity-5 disabled:cursor-not-allowed group shrink-0"
          title="Next Dimension"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div id="results-content" className="flex-1 overflow-y-auto pr-4 custom-scrollbar pb-20 mt-4">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default ResultsDisplay;