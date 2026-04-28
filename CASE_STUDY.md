# RiskLens: Financial Risk Assessment SaaS

**B2B · SaaS · Fintech · Enterprise · Data-heavy**

Designing a workflow that helps risk analysts quickly assess borrower health without drowning in data

---

**Role**  
Product & UX Designer + Developer

**Duration**  
2 Weeks

**Tools**  
Figma, Claude AI, Vercel

---

## Scope

UX Research  
Interaction Design  
Visual Design  
Information Architecture  
AI-Assisted Development

---

## Introduction

Most fintech risk analysis tools bury critical signals under overwhelming data layers, forcing analysts to hunt for insights instead of making confident decisions.

I designed a scannable risk workflow that prioritizes key signals through information hierarchy and progressive disclosure — then built it using AI-assisted development, turning Figma designs directly into production code and shipping a responsive SaaS product in 2 weeks.

---

## The Problem

Most risk analysis tools in fintech are hard to skim. Large amounts of financial data need to be understood quickly, but the interfaces make it overwhelming.

**Key challenge**: Large amounts of financial data need to be understood quickly.

---

## User Context

Risk analysts review multiple borrowers regularly to monitor financial health and identify potential risk. They need to:

- Scan portfolios fast
- Spot high-risk accounts immediately
- Investigate why a borrower is risky
- Decide whether to monitor, review, or escalate

---

## My Approach

### 01 — Research

I took a look at similar SaaS tools and tried to understand the structure of what a user wants to see in it and what to prioritize.

---

### 02 — User Flow

1. Scan portfolio to identify high-risk accounts
2. Open a borrower that needs attention
3. Investigate financial performance and risk drivers
4. Decide whether to monitor, review, or escalate

---

### 03 — Design Principles

**Prioritize risk visibility**  
Risk score, status, and alerts are placed prominently to support quick decision-making.

**Support fast scanning**  
Consistent card layouts allow easy comparison across borrowers.

**Progressive disclosure**  
Overview provides a summary, while detailed views support deeper investigation.

**Keep the interface calm**  
Neutral visual base with color used only for risk and status signals.

---

### 04 — Sketching

I started sketching the screens using pen and paper.

---

### 05 — Figma Design

I used Google Stitch and Figma Make to generate but it wasn't good — rather I took inspiration from it and tried to do a low-fi in Figma, then I used all the design system and designed it in Figma.

I made the prototype work there.

---

### 06 — Vibe Coding with AI

Once after finishing the prototype, I started vibe coding.

**Here's how it worked:**

I connected my Figma MCP to Claude Code, then started coding. I used React and Node.js to make it work.

First I asked Claude to just write code to my design — the output wasn't perfect in the first go, so I had to go with multiple iterations page by page. Eventually my prompt engineering skill got improved and I learned how to use tokens effectively.

**My prompts evolved:**

**Early**: "Build the portfolio overview screen"

**Later**: "The risk score badges need more visual weight. Increase font size to 32px, add 2px border, tighten padding to 8px vertical. The spacing between cards feels cramped — increase gap to 24px."

**The shift**: While vibe coding, my perspective shifted from designer to a design critique and my prompts were according to it and improved. While coding I changed and added elements — doing critique helped me do it.

---

### 07 — Development + Deployment

I connected my Claude with VS Code and pushed all the code to my GitHub.

I made the whole website responsive across devices.

Finally after pushing everything in GitHub, I deployed it using Vercel.

**I shipped it.**

---

## The Solution

### Screen 1: Portfolio Overview

**Goal**: Help analysts quickly identify which borrowers need attention.


**Key Elements**
- Card layout for side-by-side comparison
- Risk score and status clearly visible
- Key financial indicators summarized
- Alerts and "Review needed" status highlighted

**Outcome**: Analysts can scan the portfolio in seconds and prioritize their work.

---

### Screen 2: Risk Analysis Workspace

**Goal**: Help analysts understand why a borrower is at risk.


**Key Elements**
- Prominent risk score with status indicator
- Financial health summary (revenue, cash flow, debt, liquidity)
- Performance trends across multiple periods
- Active alerts highlighting risk drivers
- Structured tabs for deeper analysis
- Context panel with notes, covenants, and documents

**Outcome**: A clear, decision-focused workflow that enables analysts to quickly identify high-risk borrowers and confidently investigate the drivers behind financial risk.

---

## What I Focused On

While doing design and vibe coding I was clear that:

**Assumptions**
- Analysts review multiple borrowers daily
- Most interactions are read-heavy and analysis-focused
- The interface should scale for larger portfolios and additional data

**Focus Areas**
- Clear hierarchy over visual complexity
- Fast decision support
- Realistic enterprise SaaS patterns
- Scalable structure for operational use

---

## What I Learned

**Prompt engineering is a design skill**  
The better I understood design details (spacing, hierarchy, color theory), the better my prompts became — and the better the output.

**AI didn't replace design thinking**  
I still made every decision about what to prioritize, how to structure information, and what users needed to see first. AI just accelerated execution.

**Design systems first saves time**  
Every component, color token, and spacing rule was defined before any screen — which meant consistent AI-generated code.

**Iteration is everything**  
The output wasn't perfect in the first go. I had to go with multiple iterations page by page. But each iteration made my prompts sharper.

---

## Reflection

**What worked**: Building the design system first. It saved massive time and kept everything consistent.

**What surprised me**: How much my role shifted during vibe coding — from designer to design critic. I was reviewing AI output like I'd review another designer's work.

**What I'd do differently**: Test with real analysts earlier. I relied on competitor analysis and assumptions. User feedback in week 2 would have validated my hierarchy decisions sooner.

---

**Shipped in 2 weeks** — From research to deployed product

[View Live Product](https://fintech-risk-analysis-tool-th7y.vercel.app/)

---

© 2026 Harita Kancheepuram Sundararajan
