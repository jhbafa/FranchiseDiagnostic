import React, { useState } from "react";

const CONFIG = {
  emailjs: {
    serviceId: "service_0pjdngd",
    templateId: "template_uvgqumf",
    publicKey: "CG0LSi3EE-r9KpLKb",
    notifyEmail: "john@ascentfranchiseadvisors.com",
  },
  links: {
    calendar: "https://meetings.hubspot.com/ascentfranchiseadvisors/intro-meeting",
    linkedin: "https://www.linkedin.com/in/ascentfa",
  },
  logo: "https://i.imgur.com/mur4A3D.png",
};

async function sendEmailJS(params) {
  try {
    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: CONFIG.emailjs.serviceId,
        template_id: CONFIG.emailjs.templateId,
        user_id: CONFIG.emailjs.publicKey,
        template_params: { to_email: CONFIG.emailjs.notifyEmail, ...params },
      }),
    });
  } catch (e) {}
}

function trackClick(action) {
  sendEmailJS({ subject: "Diagnostic CTA Clicked: " + action, message: "A user clicked: " + action + "\nTime: " + new Date().toLocaleString() });
}
function trackCompletion(score, tier) {
  sendEmailJS({ subject: "New Diagnostic Completed, Score: " + score + ", " + tier, message: "Score: " + score + "/100\nTier: " + tier + "\nCompleted: " + new Date().toLocaleString() });
}

const QUESTIONS = [
  {
    section:"A", sectionTitle:"Section A: Financial Reality",
    sectionIntro:"Financial position is the most objective readiness factor. These questions have no right or wrong answers, only accurate or inaccurate ones. Answer based on your current reality, not your projection.",
    id:"A1", text:"What is your current annual W-2 or household income?",
    type:"single",
    options:[
      {label:"Under $80,000",pts:0},
      {label:"$80,000 to $120,000",pts:1},
      {label:"$120,000 to $175,000",pts:2},
      {label:"$175,000 to $250,000",pts:3},
      {label:"Over $250,000",pts:4},
    ], maxPts:4,
  },
  {
    section:"A", id:"A2",
    text:"How much cash do you currently have access to?",
    subtext:"This includes savings or easily liquidated assets you could deploy into a business without touching retirement funds.",
    type:"single",
    options:[
      {label:"Less than $50,000",pts:0},
      {label:"$50,000 to $100,000",pts:1},
      {label:"$100,000 to $200,000",pts:2},
      {label:"$200,000 to $350,000",pts:3},
      {label:"Over $350,000",pts:4},
    ], maxPts:4,
  },
  {
    section:"A", id:"A2b",
    text:"Do you have a Home Equity Line of Credit (HELOC) available that you could draw on as part of your franchise investment capital?",
    type:"single",
    options:[
      {label:"No, I do not have a HELOC or available home equity",pts:0},
      {label:"I have home equity but have not set up a HELOC",pts:1},
      {label:"Yes, I have a HELOC with $50,000 to $150,000 available",pts:2},
      {label:"Yes, I have a HELOC with over $150,000 available",pts:3},
    ], maxPts:3,
  },
  {
    section:"A", id:"A3",
    text:"Do you have retirement assets (401k, IRA, pension) that you would be open to using through a ROBS structure if it were the right strategic fit?",
    type:"single",
    options:[
      {label:"No retirement assets to speak of",pts:0},
      {label:"I have retirement assets but would not consider using them",pts:1},
      {label:"I have retirement assets and I am open to exploring ROBS",pts:2},
      {label:"I have retirement assets and have already researched ROBS",pts:3},
    ], maxPts:3,
  },
  {
    section:"A", id:"A4",
    text:"If you were to make a franchise investment in the next 12 months, what is the maximum total investment you would be comfortable committing, including working capital reserves?",
    type:"single",
    options:[
      {label:"Under $100,000",pts:1},
      {label:"$100,000 to $200,000",pts:2},
      {label:"$200,000 to $350,000",pts:3},
      {label:"$350,000 to $500,000",pts:4},
      {label:"Over $500,000",pts:4},
    ], maxPts:4,
  },
  {
    section:"A", id:"A5",
    text:"How comfortable are you with SBA-backed debt as part of a franchise financing structure?",
    type:"single",
    options:[
      {label:"Not comfortable. I want to avoid business debt entirely.",pts:0},
      {label:"Somewhat uncomfortable. I would only consider it as a last resort.",pts:1},
      {label:"Open to it. I understand debt is often part of the structure.",pts:2},
      {label:"Comfortable. I have used SBA or business financing before.",pts:3},
    ], maxPts:3,
  },
  {
    section:"B", sectionTitle:"Section B: Operational Fit",
    sectionIntro:"Franchise ownership is a business. The degree of your daily involvement will depend on the model, but even semi-absentee ownership requires active leadership. These questions evaluate your operational fit.",
    id:"B1",
    text:"In your current or most recent professional role, have you directly managed other people, including hiring, performance management, and day-to-day supervision?",
    type:"single",
    options:[
      {label:"No direct management experience",pts:0},
      {label:"I have managed 1 to 3 people informally",pts:1},
      {label:"I have formally managed a team of 4 to 10 people",pts:3},
      {label:"I have managed teams of 10 or more, or managed managers",pts:4},
    ], maxPts:4,
  },
  {
    section:"B", id:"B2",
    text:"How many hours per week are you realistically available to dedicate to a business in its first 12 to 18 months?",
    type:"single",
    options:[
      {label:"Fewer than 10 hours per week. I need this to be truly passive.",pts:0},
      {label:"10 to 20 hours per week, semi-involved oversight.",pts:1},
      {label:"20 to 40 hours per week, active part-time leadership.",pts:3},
      {label:"40 or more hours per week. I am prepared to be fully committed.",pts:4},
    ], maxPts:4,
  },
  {
    section:"B", id:"B3",
    text:"How would you describe your tolerance for operating within defined systems and processes, even when you disagree with specific elements?",
    type:"single",
    options:[
      {label:"Low. I prefer to build and operate my own way.",pts:0},
      {label:"Moderate. I can follow systems but need significant autonomy.",pts:2},
      {label:"High. I understand that system adherence is part of what makes franchising work.",pts:3},
      {label:"Very high. I have operated successfully within institutional or corporate systems before.",pts:4},
    ], maxPts:4,
  },
  {
    section:"B", id:"B4",
    text:"Which of the following best describes the ownership model you are most drawn to?",
    type:"single",
    options:[
      {label:"I want to be the primary operator, hands-on with day-to-day involvement.",pts:3},
      {label:"I want to hire a manager and oversee from a distance within 12 to 18 months.",pts:3},
      {label:"I want to own multiple units eventually and function as a portfolio operator.",pts:4},
      {label:"I am honestly not sure what role I want to play yet.",pts:1},
    ], maxPts:4,
  },
  {
    section:"C", sectionTitle:"Section C: Risk Psychology",
    sectionIntro:"Risk tolerance in business ownership is different from risk tolerance in investing. These questions are designed to surface your actual relationship with uncertainty, not the answer you think sounds right.",
    id:"C1",
    text:"If you invested $200,000 into a franchise and the business underperformed significantly in Year 1, how would that affect your household's financial stability?",
    type:"single",
    options:[
      {label:"It would be catastrophic. We cannot absorb that loss.",pts:0},
      {label:"It would be very difficult but survivable with major lifestyle changes.",pts:1},
      {label:"It would be a serious setback but we have other income to fall back on.",pts:2},
      {label:"It would be manageable. This investment represents less than 30% of our net worth.",pts:4},
    ], maxPts:4,
  },
  {
    section:"C", id:"C2",
    text:"How does your spouse or domestic partner view the idea of you leaving stable employment for business ownership?",
    type:"single",
    options:[
      {label:"We have not had a serious conversation about it yet.",pts:0},
      {label:"They are skeptical or opposed. This would be a significant source of conflict.",pts:0},
      {label:"They are cautiously supportive, open to it if the right opportunity is identified.",pts:2},
      {label:"They are fully aligned. We have discussed it seriously and are in agreement.",pts:4},
      {label:"This decision is mine alone. No partner to consider.",pts:3},
    ], maxPts:4,
  },
  {
    section:"C", id:"C3",
    text:"How would you describe your current relationship with your W-2 career?",
    type:"single",
    options:[
      {label:"I am actively miserable and need to leave as soon as possible.",pts:1},
      {label:"I am dissatisfied but financially dependent. I cannot leave without a plan.",pts:2},
      {label:"I am comfortable but feel something is missing. This is more about future-building than escape.",pts:4},
      {label:"I am content in my career but exploring ownership as an investment strategy alongside it.",pts:3},
    ], maxPts:4,
  },
  {
    section:"D", sectionTitle:"Section D: Financial Literacy and Unit Economics",
    sectionIntro:"Making a sound franchise investment requires understanding how franchise businesses actually make and lose money. These questions evaluate your current literacy in franchise economics.",
    id:"D1",
    text:"Are you familiar with the Franchise Disclosure Document (FDD) and what Item 19 represents?",
    type:"single",
    options:[
      {label:"I have never heard of an FDD.",pts:0},
      {label:"I know the FDD exists but have never read one.",pts:1},
      {label:"I have reviewed an FDD before.",pts:2},
      {label:"I have reviewed multiple FDDs and understand how to interpret Item 19 financial performance data.",pts:4},
    ], maxPts:4,
  },
  {
    section:"D", id:"D2",
    text:"When evaluating whether a franchise unit is financially viable, which of the following do you understand well enough to apply?",
    type:"multi",
    options:[
      {label:"Average Unit Volume (AUV)"},
      {label:"Franchisee EBITDA or net income margins"},
      {label:"Cost of goods sold as a percentage of revenue"},
      {label:"Labor cost as a percentage of revenue"},
      {label:"Royalty structure and its impact on unit economics"},
      {label:"Break-even timeline based on investment size"},
      {label:"None of these. I would need guidance on all of them."},
    ], maxPts:4,
  },
  {
    section:"E", sectionTitle:"Section E: Timing and Transition Readiness",
    sectionIntro:"The final section evaluates your timeline and transition readiness. There is no pressure implied in these questions. Honest answers produce the most useful results.",
    id:"E1",
    text:"If you identified a franchise opportunity that genuinely fit your financial profile, lifestyle, and risk tolerance, how soon would you be prepared to move forward?",
    type:"single",
    options:[
      {label:"I am not ready to move forward at any point in the next 12 months.",pts:0},
      {label:"I could see myself moving forward in 12 to 24 months with the right opportunity.",pts:2},
      {label:"I am targeting a decision within the next 6 to 12 months.",pts:3},
      {label:"I am actively evaluating and could move within 3 to 6 months.",pts:4},
    ], maxPts:4,
  },
  {
    section:"E", id:"E2",
    text:"What is your primary reason for exploring franchise ownership right now?",
    type:"single",
    options:[
      {label:"I want to build wealth and create an asset I can eventually sell.",pts:4},
      {label:"I want to replace or supplement my W-2 income with something I control.",pts:3},
      {label:"I want to escape a career that no longer fits.",pts:2},
      {label:"I want to build something that could create a legacy or family business.",pts:3},
      {label:"I am mostly curious. No specific reason is driving this.",pts:1},
    ], maxPts:4,
  },
  {
    section:"E", id:"E3",
    text:"Have you shared your interest in franchise ownership with anyone in your household or immediate personal network?",
    type:"single",
    options:[
      {label:"No. I am researching privately before involving anyone else.",pts:0},
      {label:"I have mentioned it casually but had no serious conversation.",pts:1},
      {label:"I have had one serious conversation with my spouse or a trusted advisor.",pts:2},
      {label:"My household and close advisors are aware and supportive.",pts:4},
    ], maxPts:4,
  },
];

const SECTION_META = {
  A:{ weight:0.35, count:6 },
  B:{ weight:0.20, count:4 },
  C:{ weight:0.18, count:3 },
  D:{ weight:0.11, count:2 },
  E:{ weight:0.16, count:3 },
};

function calcD2Pts(sel) {
  if (!sel || sel.length === 0) return 0;
  if (sel.includes("None of these. I would need guidance on all of them.")) return 0;
  const n = sel.length;
  if (n <= 2) return 1; if (n <= 4) return 2; if (n <= 5) return 3; return 4;
}

function computeScore(answers) {
  let total = 0;
  for (const q of QUESTIONS) {
    const ans = answers[q.id];
    if (ans === undefined || ans === null) continue;
    const pts = q.type === "multi" ? calcD2Pts(ans) : (q.options.find(o => o.label === ans)?.pts ?? 0);
    const { weight, count } = SECTION_META[q.section];
    total += (pts / q.maxPts) * (weight / count) * 100;
  }
  return Math.min(100, Math.round(total));
}

function checkHardFlags(answers) {
  const { A1, A2, A5, B2, B4, C1, C2 } = answers;
  if (A1 === "Under $80,000" && A2 === "Less than $50,000") return 0;
  if (C1 === "It would be catastrophic. We cannot absorb that loss.") return 0;
  if (B2 === "Fewer than 10 hours per week. I need this to be truly passive." && B4 === "I am honestly not sure what role I want to play yet.") return 0;
  if (C2 === "They are skeptical or opposed. This would be a significant source of conflict.") return 1;
  if (A5 === "Not comfortable. I want to avoid business debt entirely." && (A2 === "Less than $50,000" || A2 === "$50,000 to $100,000")) return 1;
  return null;
}

const TIERS = [
  {
    range:[0,34], label:"Not Positioned", color:"#B94040",
    header:"Your Evaluation Result: Not Positioned for Franchise Ownership at This Time",
    assessment:"Based on your responses, the current conditions, financial, operational, or both, do not yet support a franchise investment that would be likely to succeed. This is not a judgment about your ambition or capability. It is an honest read of where the gaps exist. The professionals who get the most out of franchise ownership are the ones who enter it from a position of financial stability and operational readiness, not from a position of urgency or scarcity. Closing the gaps identified below will put you in a significantly stronger position when the timing is right.",
    insights:[
      {title:"Capital Position", body:"The minimum realistic entry point for most viable franchise models, including working capital reserves and franchise fees, starts at $100,000 to $150,000 in accessible capital. Based on your responses, your current liquidity would constrain you to a very limited universe of lower-investment models, most of which carry higher operational risk. The priority before exploring franchise ownership further is building a capital position that gives you real options."},
      {title:"Household Alignment", body:"A franchise investment made without full household alignment is one of the highest-risk mistakes a buyer can make. Not because the business will necessarily fail, but because the personal cost of operating under sustained household tension will affect your judgment, your willingness to invest further, and your ability to make clear-headed decisions under pressure. This conversation needs to happen before evaluation, not during or after it."},
      {title:"Timing and Urgency", body:"Your responses suggest the primary driver of this exploration may be dissatisfaction with your current situation rather than a clear vision of what you are building toward. That is a legitimate starting point, but it is a poor decision-making framework for a $100,000 to $500,000 investment. The clearest franchise buyers have a specific vision of the life they are building, not just a career they are leaving. Developing that clarity first will make every subsequent evaluation step sharper."},
    ],
  },
  {
    range:[35,54], label:"Early Exploration", color:"#C07828",
    header:"Your Evaluation Result: Early Exploration Stage",
    assessment:"Your profile shows genuine interest in franchise ownership and some of the foundational conditions that make it viable. However, based on your responses, there are meaningful gaps in capital position, household alignment, operational readiness, or financial literacy that would put a current investment at elevated risk. The good news is that Early Exploration is exactly where serious buyers often start. The professionals who end up making the best franchise decisions are usually the ones who began by understanding the gaps, not by ignoring them.",
    insights:[
      {title:"Your Capital Window", body:"You are within range of some franchise opportunities, but the investment size you are currently positioned for narrows the field significantly. Most franchise models with the strongest unit economics require $150,000 to $350,000 in total investment. Spending the next 6 to 12 months focused on capital accumulation, exploring ROBS if you have retirement assets, or clarifying SBA financing comfort will expand your viable universe considerably."},
      {title:"The Due Diligence Gap", body:"Your responses indicate limited exposure to how franchise financials actually work, including the FDD, Item 19, unit-level EBITDA, and franchisee validation. This is not unusual for someone early in the process, but it is the skill set that separates buyers who make confident decisions from buyers who make emotional ones. The single most important thing you can do in the next 90 days is read two or three FDDs in categories that interest you, not to evaluate them, but to understand what you are looking at."},
      {title:"What to Do With the Next 6 Months", body:"You are not ready to buy. You are ready to learn. The most productive use of this stage is to get very clear on three things: your target investment range, your preferred ownership model, and the industry categories where your professional experience gives you an unfair advantage. Healthcare professionals often overlook the significant operational edge they carry into health and wellness, home care, and healthcare services franchises, because they discount clinical experience as a business asset. It is not. It is a genuine advantage."},
    ],
  },
  {
    range:[55,74], label:"Financially and Strategically Viable", color:"#2E7D6B",
    header:"Your Evaluation Result: Financially and Strategically Viable",
    assessment:"Your profile reflects a serious candidate for franchise ownership. Your financial position, operational background, and risk tolerance are within the range where a well-evaluated franchise investment has a reasonable probability of success. The distinction between this tier and the highest readiness level is typically one or more of the following: household alignment that is still developing, a timeline that is not yet crystallized, or gaps in franchise-specific due diligence knowledge. None of these are permanent obstacles. They are the specific things that a structured evaluation process is designed to work through.",
    insights:[
      {title:"Your Investment Range Opens Real Options", body:"Based on your capital position and debt comfort, you have access to a meaningful range of franchise models, including some of the better-performing categories in home services, B2B, and specialty services. The next step is not finding the right brand. It is identifying the right category based on your operational strengths, your available time, and the unit economics that make sense for your financial goals. Brand selection comes after category selection, not before."},
      {title:"Clarify Your Ownership Model Before You Go Further", body:"Your financial position opens real options, but the most common mistake buyers at this stage make is evaluating franchise brands before they have defined what role they actually want to play. Owner-operator, semi-absentee, and portfolio models all require different time commitments, different skill sets, and different capital structures. Getting clear on your ownership model first is not a formality. It is the filter that makes every subsequent evaluation step faster and more accurate."},
      {title:"The Readiness Factor Most Professionals Underestimate", body:"High-income W-2 professionals are often very financially positioned but operationally underestimating what franchise ownership requires in the first 18 months, particularly around team management, local marketing, and operating without the institutional support structure of an employer. Your professional background is a genuine asset. Making sure your ownership model matches your actual available time and management style is the final alignment question before moving forward."},
    ],
  },
  {
    range:[75,100], label:"Execution Ready", color:"#1D4E89",
    header:"Your Evaluation Result: Execution Ready",
    assessment:"Your profile reflects strong readiness across the factors that most predict franchise ownership success, including financial position, operational fit, household alignment, risk tolerance, and timeline. This does not mean franchise ownership is the right decision. It means you are in the position to make that determination through a rigorous, honest evaluation process rather than through wishful thinking or sales pressure. The question at this stage is not whether you can do this. It is whether you have found the right model, in the right category, with the right unit economics, in the right territory, for your specific situation. That is where serious evaluation begins.",
    insights:[
      {title:"Category Before Brand", body:"You have the capital, the timeline, and the household alignment to move deliberately. The most common mistake buyers at your readiness level make is falling in love with a brand before they have validated the category. The right process starts with identifying two or three franchise categories where your professional background gives you a genuine operational advantage, then evaluating the strongest performers within those categories, not starting with a brand you saw in a magazine or at a trade show."},
      {title:"The FDD Is Your Most Valuable Due Diligence Tool, If You Know How to Use It", body:"At your readiness level, the ability to read and interpret a Franchise Disclosure Document is not optional. It is the core competency of a sophisticated buyer. Specifically: Item 19 financial performance representations, Item 20 franchisee transfers and terminations, Item 21 financial statements, and the territory definition in Item 12. A qualified franchise attorney who reviews FDDs regularly is a non-negotiable part of this process."},
      {title:"Run a Disciplined Process, Not an Excited One", body:"At this readiness level, the biggest risk is not capability. It is speed. Buyers who are financially positioned and emotionally ready often compress their evaluation process and commit to the first brand that generates excitement. Your readiness is an asset only if your process matches it. That means category selection before brand selection, FDD review before discovery day, and a clear picture of your target unit economics before any conversations with franchisors get serious."},
    ],
  },
];

function RobsModal({ onClose }) {
  const s = {
    overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16},
    box:{background:"#fff",maxWidth:640,width:"100%",maxHeight:"90vh",overflowY:"auto",borderRadius:4,padding:"36px 32px",position:"relative"},
    close:{position:"absolute",top:16,right:20,background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#888"},
    badge:{display:"inline-block",background:"#1D2D44",color:"#fff",fontSize:10,letterSpacing:2,padding:"5px 12px",textTransform:"uppercase",marginBottom:20},
    h:{fontSize:20,fontWeight:700,lineHeight:1.4,marginBottom:6,color:"#1a1a1a"},
    sub:{fontSize:13,color:"#888",fontStyle:"italic",marginBottom:24},
    sTitle:{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#1D2D44",marginBottom:8},
    body:{fontSize:14,lineHeight:1.9,color:"#333",marginBottom:20},
    note:{background:"#F7F5F0",border:"1px solid #E0DDD6",borderRadius:3,padding:"16px 18px",fontSize:13,color:"#555",lineHeight:1.8,marginTop:8},
    ctaBtn:{display:"block",width:"100%",background:"#1D2D44",color:"#fff",padding:"14px",fontSize:14,fontWeight:700,border:"none",borderRadius:2,cursor:"pointer",textAlign:"center",marginTop:24,fontFamily:"Georgia,serif"},
  };
  return (
    <div style={s.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={s.box}>
        <button style={s.close} onClick={onClose}>x</button>
        <div style={s.badge}>Resource Guide</div>
        <h2 style={s.h}>Using Retirement Funds to Invest in Yourself: Understanding ROBS</h2>
        <p style={s.sub}>Rollovers as Business Startups, what it is, how it works, and who it is right for</p>
        <div style={s.sTitle}>What Is ROBS?</div>
        <p style={s.body}>A Rollover for Business Startups (ROBS) is a legal structure that allows you to use funds from a qualifying retirement account, a 401(k), traditional IRA, or other eligible plan, to fund a business or franchise investment without triggering early withdrawal penalties or immediate income taxes. It is not a loan. It is not a distribution. It is a restructuring of how your retirement assets are held.</p>
        <div style={s.sTitle}>How It Works</div>
        <p style={s.body}>
          1. A new C-Corporation is formed to own your business.<br /><br />
          2. The C-Corp establishes a qualified retirement plan, a new 401k.<br /><br />
          3. You roll your existing retirement funds into the new 401k, tax-free and penalty-free, because it is a rollover, not a withdrawal.<br /><br />
          4. The new 401k purchases stock in the C-Corp.<br /><br />
          5. The C-Corp now has capital from your retirement funds available to invest in the franchise or business.
        </p>
        <div style={s.sTitle}>Who It Is Right For</div>
        <p style={s.body}>ROBS works best for people who have meaningful retirement savings, typically $50,000 or more, who want to deploy capital into a business without taking on debt, and who are comfortable with the administrative requirements of maintaining a C-Corp and an active retirement plan. It is widely used by franchise buyers and is fully legal when structured correctly by a qualified ROBS provider.</p>
        <div style={s.sTitle}>What It Is Not</div>
        <p style={s.body}>ROBS is not a tax dodge. The IRS is aware of the structure and has specific compliance requirements. It requires ongoing plan administration, annual filings, and nondiscrimination testing, and must be set up by a provider experienced in ROBS. It also means your retirement assets are now tied to the performance of your business, which is a real risk to understand clearly before proceeding.</p>
        <div style={s.note}>
          <strong>A note from John Bradley:</strong> If ROBS is relevant to your situation, I can connect you with trusted providers so you can make an informed comparison. Book an intro call and we will walk through whether it makes sense for your specific capital picture.
        </div>
        <button style={s.ctaBtn} onClick={() => { trackClick("ROBS Guide, Book Call CTA"); window.open(CONFIG.links.calendar, "_blank"); }}>
          Questions About ROBS? Book an Intro Call
        </button>
      </div>
    </div>
  );
}

const S = {
  wrap:{minHeight:"100vh",background:"#F7F5F0",fontFamily:"'Georgia',serif",color:"#1a1a1a"},
  inner:{maxWidth:720,margin:"0 auto",padding:"40px 24px"},
  topBar:{display:"flex",alignItems:"center",gap:14,marginBottom:32,paddingBottom:20,borderBottom:"1px solid #E0DDD6"},
  logoImg:{height:48,width:"auto",objectFit:"contain"},
  logoText:{display:"flex",flexDirection:"column",justifyContent:"center"},
  logoTitle:{fontSize:14,fontWeight:700,letterSpacing:1,color:"#1D2D44",textTransform:"uppercase",lineHeight:1.3},
  logoSub:{fontSize:11,color:"#999",letterSpacing:0.5,textTransform:"uppercase",marginTop:2},
  h1:{fontSize:28,fontWeight:700,lineHeight:1.3,marginBottom:12},
  sub:{fontSize:16,color:"#444",marginBottom:28,lineHeight:1.6},
  bodyBox:{fontSize:15,lineHeight:1.8,color:"#333",background:"#fff",border:"1px solid #ddd",borderRadius:4,padding:"24px 28px",marginBottom:28},
  btn:{display:"inline-block",background:"#1D2D44",color:"#fff",padding:"14px 32px",fontSize:15,cursor:"pointer",border:"none",borderRadius:2,letterSpacing:0.5,fontFamily:"Georgia,serif"},
  progressBar:{background:"#E0DDD6",height:4,borderRadius:2,marginBottom:32,overflow:"hidden"},
  sectionHeader:{borderLeft:"3px solid #1D2D44",paddingLeft:16,marginBottom:28},
  sectionTitle:{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#1D2D44",marginBottom:8},
  sectionIntro:{fontSize:14,color:"#555",lineHeight:1.7,fontStyle:"italic"},
  qText:{fontSize:18,fontWeight:700,lineHeight:1.5,marginBottom:6,color:"#1a1a1a"},
  qSub:{fontSize:14,color:"#666",marginBottom:18,lineHeight:1.6},
  optBtn:(sel)=>({display:"block",width:"100%",textAlign:"left",padding:"14px 18px",marginBottom:10,
    background:sel?"#1D2D44":"#fff",color:sel?"#fff":"#1a1a1a",
    border:sel?"2px solid #1D2D44":"2px solid #D5D0C8",
    borderRadius:3,cursor:"pointer",fontSize:15,lineHeight:1.5,transition:"all 0.15s",fontFamily:"Georgia,serif"}),
  confirmBtn:{background:"#1D2D44",color:"#fff",padding:"12px 28px",fontSize:15,border:"none",borderRadius:2,cursor:"pointer",marginTop:8,fontFamily:"Georgia,serif"},
  qCounter:{fontSize:12,color:"#888",marginBottom:16,letterSpacing:1,textTransform:"uppercase"},
  divider:{borderTop:"1px solid #D5D0C8",margin:"32px 0"},
  insightCard:{borderLeft:"3px solid #D5D0C8",paddingLeft:20,marginBottom:24},
  insightTitle:{fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:"#1D2D44",marginBottom:8},
  insightBody:{fontSize:14,lineHeight:1.8,color:"#444"},
  ctaBox:{background:"#1D2D44",color:"#fff",padding:"32px 28px",borderRadius:4},
  ctaLabel:{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:16,opacity:0.7},
  ctaBody:{fontSize:14,lineHeight:1.9,marginBottom:24,opacity:0.9},
  ctaPrimary:{display:"block",width:"100%",background:"#fff",color:"#1D2D44",padding:"14px",fontSize:15,fontWeight:700,border:"none",borderRadius:2,cursor:"pointer",textAlign:"center",marginBottom:12,fontFamily:"Georgia,serif"},
  ctaSecondary:{display:"block",width:"100%",background:"transparent",color:"#fff",padding:"12px",fontSize:14,border:"1px solid rgba(255,255,255,0.4)",borderRadius:2,cursor:"pointer",textAlign:"center",marginBottom:10,fontFamily:"Georgia,serif"},
  ctaResource:{display:"block",width:"100%",background:"transparent",color:"rgba(255,255,255,0.8)",padding:"11px 14px",fontSize:13,border:"1px solid rgba(255,255,255,0.2)",borderRadius:2,cursor:"pointer",textAlign:"center",marginTop:4,fontFamily:"Georgia,serif"},
  anonNote:{fontSize:12,textAlign:"center",color:"#999",marginTop:20,fontStyle:"italic"},
  restartBtn:{background:"none",border:"1px solid #ccc",color:"#666",padding:"10px 20px",fontSize:13,cursor:"pointer",borderRadius:2,marginTop:20,fontFamily:"Georgia,serif"},
};

function TopBar() {
  return (
    <div style={S.topBar}>
      <img src={CONFIG.logo} alt="Ascent Franchise Advisors" style={S.logoImg} onError={e => e.target.style.display="none"} />
      <div style={S.logoText}>
        <span style={S.logoTitle}>Franchise Readiness Diagnostic</span>
        <span style={S.logoSub}>By Ascent Franchise Advisors</span>
      </div>
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [multiTemp, setMultiTemp] = useState([]);
  const [result, setResult] = useState(null);
  const [showRobs, setShowRobs] = useState(false);

  const q = QUESTIONS[currentQ];
  const progress = Math.round((currentQ / QUESTIONS.length) * 100);
  const isFirstInSection = currentQ === 0 || QUESTIONS[currentQ - 1].section !== q.section;

  function handleSingle(label) {
    const na = { ...answers, [q.id]: label };
    setAnswers(na); advance(na);
  }

  function handleMultiToggle(label) {
    const isNone = label === "None of these. I would need guidance on all of them.";
    setMultiTemp(prev => {
      if (isNone) return [label];
      const f = prev.filter(l => l !== "None of these. I would need guidance on all of them.");
      return f.includes(label) ? f.filter(l => l !== label) : [...f, label];
    });
  }

  function handleMultiConfirm() {
    const na = { ...answers, [q.id]: multiTemp };
    setAnswers(na); setMultiTemp([]); advance(na);
  }

  function advance(na) {
    if (currentQ + 1 < QUESTIONS.length) setCurrentQ(currentQ + 1);
    else finalize(na);
  }

  function finalize(na) {
    const score = computeScore(na);
    const override = checkHardFlags(na);
    let ti = TIERS.findIndex(t => score >= t.range[0] && score <= t.range[1]);
    if (ti < 0) ti = 0;
    if (override === 0) ti = 0;
    else if (override === 1) ti = Math.min(1, ti);
    const tier = TIERS[ti];
    setResult({ score, tier });
    trackCompletion(score, tier.label);
    setPhase("result");
  }

  function restart() { setPhase("intro"); setCurrentQ(0); setAnswers({}); setMultiTemp([]); setResult(null); }

  if (phase === "intro") return (
    <div style={S.wrap}><div style={S.inner}>
      <TopBar />
      <h1 style={S.h1}>The Franchise Ownership Readiness Diagnostic</h1>
      <p style={S.sub}>A structured evaluation for professionals considering franchise ownership as a path out of employment</p>
      <div style={S.bodyBox}>
        <p style={{marginTop:0}}>Most franchise assessments are designed to make you feel ready.</p>
        <p>This one is not.</p>
        <p>This diagnostic was built on a simple premise: franchise ownership is the right move for some people and the wrong move for many others. The difference almost never comes down to excitement or ambition. It comes down to financial position, operational fit, risk tolerance, and timing, evaluated honestly, without a sales agenda.</p>
        <p>This evaluation takes 6 to 8 minutes. It is completely anonymous. No email required. No follow-up unless you choose it.</p>
        <p style={{marginBottom:0}}>At the end, you will receive a structured assessment of where you actually stand, including the specific gaps you would need to close before a franchise investment makes strategic sense for your situation. Answer every question as accurately as you can. The more honest you are, the more useful your result will be.</p>
      </div>
      <button style={S.btn} onClick={() => setPhase("quiz")}>Begin the Evaluation</button>
      <p style={S.anonNote}>18 questions · 6 to 8 minutes · completely anonymous</p>
    </div></div>
  );

  if (phase === "quiz") return (
    <div style={S.wrap}><div style={S.inner}>
      <TopBar />
      <div style={S.progressBar}><div style={{height:"100%",background:"#1D2D44",width:`${progress}%`,transition:"width 0.3s ease"}} /></div>
      <p style={S.qCounter}>Question {currentQ + 1} of {QUESTIONS.length}</p>
      {isFirstInSection && (
        <div style={S.sectionHeader}>
          <div style={S.sectionTitle}>{q.sectionTitle}</div>
          {q.sectionIntro && <div style={S.sectionIntro}>{q.sectionIntro}</div>}
        </div>
      )}
      <div style={S.qText}>{q.text}</div>
      {q.subtext && <div style={S.qSub}>{q.subtext}</div>}
      {q.type === "single" && q.options.map(opt => (
        <button key={opt.label} style={S.optBtn(answers[q.id] === opt.label)} onClick={() => handleSingle(opt.label)}>{opt.label}</button>
      ))}
      {q.type === "multi" && <>
        <p style={{fontSize:13,color:"#777",marginBottom:12}}>Select all that apply, then click Continue.</p>
        {q.options.map(opt => (
          <button key={opt.label} style={S.optBtn(multiTemp.includes(opt.label))} onClick={() => handleMultiToggle(opt.label)}>{opt.label}</button>
        ))}
        <button style={S.confirmBtn} onClick={handleMultiConfirm} disabled={multiTemp.length === 0}>Continue</button>
      </>}
    </div></div>
  );

  if (phase === "result" && result) {
    const { score, tier } = result;
    return (
      <div style={S.wrap}>
        {showRobs && <RobsModal onClose={() => setShowRobs(false)} />}
        <div style={S.inner}>
          <TopBar />
          <div style={{borderTop:`4px solid ${tier.color}`,paddingTop:20,marginBottom:20}}>
            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:tier.color,marginBottom:8}}>{tier.label}</div>
            <h2 style={{fontSize:22,fontWeight:700,lineHeight:1.3,marginBottom:16,color:"#1a1a1a"}}>{tier.header}</h2>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
              <div style={{fontSize:52,fontWeight:700,color:tier.color,lineHeight:1}}>{score}</div>
              <div style={{fontSize:13,color:"#666",lineHeight:1.6}}>out of 100<br />Readiness Score</div>
            </div>
          </div>
          <div style={{fontSize:15,lineHeight:1.9,color:"#333",background:"#fff",border:"1px solid #ddd",padding:"24px 28px",borderRadius:4,marginBottom:32}}>{tier.assessment}</div>
          <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#888",marginBottom:16}}>Your Key Insights</div>
          {tier.insights.map((ins,i) => (
            <div key={i} style={S.insightCard}>
              <div style={S.insightTitle}>{ins.title}</div>
              <div style={S.insightBody}>{ins.body}</div>
            </div>
          ))}
          <div style={S.divider} />
          <div style={S.ctaBox}>
            <div style={S.ctaLabel}>About This Diagnostic</div>
            <div style={S.ctaBody}>
              I built this evaluation because most of the professionals I speak with have been told what they want to hear by people with a financial incentive to tell them that. I am a former pharmacist, business owner, and independent franchise consultant, and I developed this tool to give you an honest read before any conversation, not after one.
              <br /><br />
              If your results raised specific questions about your capital structure, your ownership model options, or the franchise categories that match your background, I would like to start a conversation. The intro call is the beginning of an ongoing process. I will work with you through education, brand introductions, due diligence, and every step of the evaluation journey for as long as it takes to find the right fit, or to determine there is not one.
              <br /><br />
              This process costs you nothing. My work is compensated by franchise brands when and if you decide to move forward with an investment. They reimburse me for bringing a qualified, well-prepared candidate into their system. Until that point, and even if that point never comes, there is no cost to you and no obligation of any kind.
              <br /><br />
              I have walked people away from bad fits. I have told people the timing was wrong. I will do the same for you.
            </div>
            <button style={S.ctaPrimary} onClick={() => { trackClick("Calendar, Book Intro Call"); window.open(CONFIG.links.calendar,"_blank"); }}>
              Book an Introductory Evaluation, 20 Minutes, No Cost
            </button>
            <button style={S.ctaSecondary} onClick={() => { trackClick("LinkedIn Profile"); window.open(CONFIG.links.linkedin,"_blank"); }}>
              Connect with John on LinkedIn
            </button>
            <button style={S.ctaResource} onClick={() => { trackClick("ROBS Guide Opened"); setShowRobs(true); }}>
              Resource Guide: Using Retirement Funds to Invest in Yourself, Understanding ROBS
            </button>
          </div>
          <p style={S.anonNote}>This diagnostic is completely anonymous. No data from your responses is stored or shared.</p>
          <br />
          <button style={S.restartBtn} onClick={restart}>Retake the Evaluation</button>
        </div>
      </div>
    );
  }
  return null;
}
