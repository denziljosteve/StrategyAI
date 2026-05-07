import React, { useEffect, useRef } from 'react';
import { 
  Globe, 
  Building2, 
  Swords, 
  TrendingUp, 
  LayoutGrid, 
  Target, 
  GitBranch, 
  Sparkles, 
  FileText 
} from 'lucide-react';

export const TABS = [
  { key: 'summary', label: 'Executive Summary', icon: FileText },
  { key: 'external', label: 'External Analysis', icon: Globe },
  { key: 'internal', label: 'Internal Analysis', icon: Building2 },
  { key: 'competitive', label: 'Competitive Strategy', icon: Swords },
  { key: 'growth', label: 'Growth Strategy', icon: TrendingUp },
  { key: 'business_model', label: 'Business Model', icon: LayoutGrid },
  { key: 'execution', label: 'Execution & KPIs', icon: Target },
  { key: 'decisions', label: 'Strategic Decisions', icon: GitBranch },
  { key: 'advanced', label: 'Advanced Frameworks', icon: Sparkles },
];

const TabNav = ({ activeTab, setActiveTab }) => {
  const containerRef = useRef(null);
  const activeTabRef = useRef(null);

  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeTab]);

  return (
    <div className="cyber-tab-container">
      <div 
        ref={containerRef}
        className="flex overflow-x-auto pb-1 gap-1 custom-scrollbar scroll-smooth"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          
          return (
            <button
              key={tab.key}
              ref={isActive ? activeTabRef : null}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-lg text-sm font-black tracking-widest transition-all duration-500 uppercase ${
                isActive ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-red-300 animate-pulse' : 'text-gray-600'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNav;