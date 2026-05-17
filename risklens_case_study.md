# RISKLens

**FinTech · B2B · Risk Analysis · AI-Powered**

### Designing a workflow that helps risk analysts quickly assess borrower health without drowning in data

---

**Role**  
Product & UX Designer + Developer

**Duration**  
4 Weeks

**Tools**  
Figma, Claude AI, React, Node.js, Vercel

---

## The Problem

Most risk analysis tools in fintech are hard to skim. Large amounts of financial data need to be understood quickly, but the interfaces make it overwhelming.

[INSERT: Before screenshot - cluttered interface]

**The challenge**: Design a workflow that helps risk analysts quickly assess borrower health, identify potential risks, and investigate detailed financial information — without drowning in noise.

**My personal challenge**: I didn't know where to start design since it has overwhelming information and that should reach the user effectively to make a decision.

---

## User Context

Risk analysts review multiple borrowers regularly to monitor financial health and identify potential risk. They need to:
- Scan portfolios fast
- Spot high-risk accounts immediately  
- Investigate why a borrower is risky
- Decide whether to monitor, review, or escalate

---

## My Approach

I created a structured portfolio and analysis experience that prioritizes key risk signals, supports quick scanning, and enables deeper investigation without overwhelming the user.

I made all the information clear to have a quick skim and put it in IA and in hierarchy so that the user can just see what is important.

---

## My Process

### 01 — Research

I took a look at similar SaaS tools and tried to understand the structure of what a user wants to see in it and what to prioritize.

---

### 02 — Design System First

I came up with the design system first — color, grid, spacing, typography, buttons, and other components.

[INSERT: Design system screenshot]

**Why first**: Building the foundation before screens meant consistency from the start and cleaner code generation later.

---

### 03 — User Flow

**Scan portfolio** to identify high-risk accounts  
↓  
**Open a borrower** that needs attention  
↓  
**Investigate** financial performance and risk drivers  
↓  
**Decide** whether to monitor, review, or escalate

---

### 04 — Design Principles

**Prioritize risk visibility**  
Risk score, status, and alerts are placed prominently to support quick decision-making.

**Support fast scanning**  
Consistent card layouts allow easy comparison across borrowers.

**Progressive disclosure**  
Overview provides a summary, while detailed views support deeper investigation.

**Keep the interface calm**  
Neutral visual base with color used only for risk and status signals.

---

### 05 — Sketching

I started sketching the screens using pen and paper.

[INSERT: Sketches photo if you have]

---

### 06 — Figma Design

I used Google Stitch and Figma Make to generate but it wasn't good — rather I took inspiration from it and tried to do a low-fi in Figma, then I used all the design system and designed it in Figma.

I made the prototype work there.

[INSERT: Figma screenshot]

---

### 07 — Vibe Coding with AI

Once after finishing the prototype, I started vibe coding.

**Here's how it worked:**

I connected my Figma MCP to Claude Code, then started coding. I used React and Node.js to make it work.

First I asked Claude to just write code to my design — the output wasn't perfect in the first go, so I had to go with multiple iterations page by page. Eventually my prompt engineering skill got improved and I learned how to use tokens effectively.

[INSERT: Screenshot of Figma + Claude Code workflow]

**My prompts evolved:**

Early: "Build the portfolio overview screen"

Later: "The risk score badges need more visual weight. Increase font size to 32px, add 2px border, tighten padding to 8px vertical. The spacing between cards feels cramped — increase gap to 24px."

**The shift**: While vibe coding, my perspective shifted from designer to a design critique and my prompts were according to it and improved. While coding I changed and added elements — doing critique helped me do it.

---

### 08 — Development + Deployment

I connected my Claude with VS Code and pushed all the code to my GitHub.

I made the whole website responsive across devices.

Finally after pushing everything in GitHub, I deployed it using Vercel.

**I shipped it.**

---

## The Solution

### Screen 1: Portfolio Overview

**Goal**: Help analysts quickly identify which borrowers need attention.

[INSERT: Portfolio screenshot]

**Key Elements**
- Card layout for side-by-side comparison
- Risk score and status clearly visible
- Key financial indicators summarized
- Alerts and "Review needed" status highlighted

**Outcome**: Analysts can scan the portfolio in seconds and prioritize their work.

---

### Screen 2: Risk Analysis Workspace

**Goal**: Help analysts understand why a borrower is at risk.

[INSERT: Risk workspace screenshot]

**Key Elements**
- Prominent risk score with status indicator
- Financial health summary (revenue, cash flow, debt, liquidity)
- Performance trends across multiple periods
- Active alerts highlighting risk drivers
- Structured tabs for deeper analysis
- Context panel with notes, covenants, and documents

**Outcome**: A clear, decision-focused workflow that enables analysts to quickly identify high-risk borrowers and confidently investigate the drivers behind financial risk.

---

### Screen 3: Risk Profile Visualization

[INSERT: Risk profile screenshot]

Visual bar charts showing risk patterns across categories. Analysts can identify issues at a glance without parsing tables.

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

**Shipped in 4 weeks** — From research to deployed product

[View Live Product](https://fintech-risk-analysis-tool-th7y.vercel.app/)

© 2026 Harita Kancheepuram Sundararajan
