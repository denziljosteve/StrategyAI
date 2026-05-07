import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import { rateLimit } from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));

// Rate Limiter: 10 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many requests, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/analyze', limiter);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are a senior strategy consultant (McKinsey/BCG/Bain). 
Perform a deep multi-framework strategic analysis. 

STRICT RULES:
- Return ONLY valid JSON wrapped in \`\`\`json\`\`\` fences.
- For EVERY single framework (e.g., Porter's 5 Forces, SWOT, etc.), you MUST provide:
  1. "framework_description": A one-line explanation of what the framework does.
  2. "stance_rationale": Why you chose the specific findings/stances for this specific framework.
- No generic filler; use specific, data-driven insights.

JSON STRUCTURE:
{
  "executive_summary": "...",
  "external_analysis": {
    "porters_five_forces": { 
      "framework_description": "...", 
      "stance_rationale": "...",
      "forces": { "force_name": { "intensity": "High|Medium|Low", "implications": ["..."] } }
    },
    "pestle": { 
      "framework_description": "...", 
      "stance_rationale": "...",
      "factors": { "political": ["..."], "economic": ["..."], "social": ["..."], "technological": ["..."], "legal": ["..."], "environmental": ["..."] }
    },
    "strategic_groups": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "groups": [{ "group_name": "...", "characteristics": ["..."], "key_players": ["..."], "strategic_implication": "..." }]
    },
    "stp": { 
      "framework_description": "...", 
      "stance_rationale": "...",
      "segmentation": [{ "segment": "...", "size": "...", "needs": "..." }], 
      "targeting": { "recommended_segment": "...", "rationale": "..." }, 
      "positioning": { "statement": "...", "key_differentiators": ["..."] } 
    }
  },
  "internal_analysis": {
    "swot": { 
      "framework_description": "...", 
      "stance_rationale": "...",
      "quadrants": { "strengths": [{"point": "...", "implication": "..."}], "weaknesses": [{"point": "...", "implication": "..."}], "opportunities": [{"point": "...", "implication": "..."}], "threats": [{"point": "...", "implication": "..."}] }
    },
    "vrio": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "analysis": [{ "resource": "...", "valuable": true, "rare": true, "inimitable": true, "organized": true, "competitive_advantage": "..." }]
    },
    "value_chain": { 
      "framework_description": "...", 
      "stance_rationale": "...",
      "primary_activities": { "inbound_logistics": "...", "operations": "...", "outbound_logistics": "...", "marketing_and_sales": "...", "service": "..." }, 
      "support_activities": { "firm_infrastructure": "...", "hr_management": "...", "technology_development": "...", "procurement": "..." } 
    },
    "core_competencies": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "competencies": [{ "competency": "...", "evidence": "...", "competitive_relevance": "..." }]
    }
  },
  "competitive_strategy": {
    "porters_generic": { 
      "framework_description": "...", 
      "stance_rationale": "...",
      "recommended": "...", "justification": "...", "why_others_unsuitable": "..." 
    },
    "blue_ocean": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "opportunities": [{ "opportunity": "...", "how_to_create": "...", "value_innovation": "..." }]
    },
    "red_ocean": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "battlegrounds": [{ "battleground": "...", "current_dynamics": "...", "recommended_tactic": "..." }]
    }
  },
  "growth_strategy": {
    "ansoff": { 
      "framework_description": "...", 
      "stance_rationale": "...",
      "matrix": { "market_penetration": { "attractiveness": "...", "actions": ["..."] }, "market_development": { "attractiveness": "...", "actions": ["..."] }, "product_development": { "attractiveness": "...", "actions": ["..."] }, "diversification": { "attractiveness": "...", "actions": ["..."] } }
    },
    "bcg_matrix": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "units": [{ "unit": "...", "category": "Star|Cash Cow|Question Mark|Dog", "recommendation": "..." }]
    },
    "ge_mckinsey": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "units": [{ "unit": "...", "industry_attractiveness": "...", "business_strength": "...", "investment_priority": "..." }]
    }
  },
  "business_model": {
    "business_model_canvas": { 
      "framework_description": "...", 
      "stance_rationale": "...",
      "blocks": { "customer_segments": ["..."], "value_propositions": ["..."], "channels": ["..."], "customer_relationships": ["..."], "revenue_streams": ["..."], "key_resources": ["..."], "key_activities": ["..."], "key_partnerships": ["..."], "cost_structure": ["..."] }
    },
    "jtbd": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "jobs": [{ "job": "...", "type": "Functional|Emotional|Social", "current_solution": "...", "opportunity": "..." }]
    }
  },
  "execution": {
    "balanced_scorecard": { 
      "framework_description": "...", 
      "stance_rationale": "...",
      "perspectives": { "financial": [{"kpi": "...", "target": "...", "initiative": "..."}], "customer": [{"kpi": "...", "target": "...", "initiative": "..."}], "internal_process": [{"kpi": "...", "target": "...", "initiative": "..."}], "learning_growth": [{"kpi": "...", "target": "...", "initiative": "..."}] }
    },
    "okrs": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "objectives": [{ "objective": "...", "key_results": ["..."] }]
    }
  },
  "decision_frameworks": {
    "cost_benefit": { 
      "framework_description": "...", 
      "stance_rationale": "...",
      "initiatives": [{ "initiative": "...", "estimated_benefit": "...", "estimated_cost": "...", "npv_rationale": "...", "recommendation": "..." }]
    },
    "scenario_planning": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "scenarios": [{ "scenario": "Base|Optimistic|Pessimistic", "description": "...", "triggers": ["..."], "strategic_response": "..." }]
    },
    "decision_tree": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "trees": [{ "decision": "...", "options": [{ "option": "...", "probability": "...", "outcome": "...", "recommendation": "..." }] }]
    }
  },
  "advanced_frameworks": {
    "mckinsey_7s": { 
      "framework_description": "...", 
      "stance_rationale": "...",
      "elements": { "strategy": "...", "structure": "...", "systems": "...", "shared_values": "...", "style": "...", "staff": "...", "skills": "...", "alignment_gaps": ["..."] }
    },
    "three_horizons": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "horizons": { "h1_core": ["..."], "h2_emerging": ["..."], "h3_transformational": ["..."] }
    },
    "disruptive_innovation": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "risk_profile": { "disruption_risk": "High|Medium|Low", "threat_sources": ["..."], "defensive_moves": ["..."], "offensive_opportunities": ["..."] }
    },
    "ecosystem_strategy": {
      "framework_description": "...", 
      "stance_rationale": "...",
      "strategy": { "platform_opportunity": "...", "key_partners": ["..."], "orchestration_model": "...", "network_effects": "..." }
    }
  }
}`;

app.post('/analyze', async (req, res) => {
  const { industry, problem } = req.body;

  if (!industry || industry.length > 100) {
    return res.status(400).json({ error: 'Industry is required and must be under 100 characters.' });
  }
  if (!problem || problem.length > 1000) {
    return res.status(400).json({ error: 'Business problem is required and must be under 1000 characters.' });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Industry: ${industry}\n\nBusiness Problem: ${problem}` },
      ],
      temperature: 0.1,
      max_tokens: 6000,
      response_format: { type: "json_object" }
    });

    const raw = completion.choices[0].message.content;
    const clean = raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    
    try {
      const parsed = JSON.parse(clean);
      res.json(parsed);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      res.status(500).json({ error: 'The AI returned an unexpected format. Please try again.' });
    }
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: error.message || 'An error occurred during analysis.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
