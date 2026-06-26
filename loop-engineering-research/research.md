# Loop Engineering — Comprehensive Research

> Compiled from primary sources: Addy Osmani, Cobus Greyling, Boris Cherny, Peter Steinberger, and the loop-engineering reference repository.

---

## 1. Core Definition

**Loop Engineering** is the shift from being the person who prompts an AI coding agent turn-by-turn to designing a system (the loop) that discovers work, hands tasks to agents, verifies results, persists state, and decides the next action — on a schedule or until a goal is met.

**Addy Osmani** (June 7, 2026):
> "Loop engineering is replacing yourself as the person who prompts the agent. You design the system that does it instead. A loop here can be thought of as a recursive goal where you define a purpose and the AI iterates until complete."

**Cobus Greyling** (June 9, 2026):
> "The harness equips a single agent run; the loop is what keeps poking agents on a schedule, spawning helpers, and feeding itself."

---

## 2. Genesis & Key Voices

### Peter Steinberger
> "You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."

### Boris Cherny (Head of Claude Code at Anthropic)
> "I don't prompt Claude anymore. I have loops running that prompt Claude and figuring out what to do. My job is to write loops."
> "A lot of my code these days is written by 'routines'. I'm not doing the prompting — I create the routines that do the prompting."

Loops was named internally at Anthropic as the feature they'd be proudest of in 10 years.

### Addy Osmani
Canonical blog post synthesising the concept. Also the originator of related concepts: Agent Harness Engineering, The Factory Model, Intent Debt, Comprehension Debt, Cognitive Surrender, Orchestration Tax, and Adversarial Code Review.

### Cobus Greyling
Created the reference repository `cobusgreyling/loop-engineering` (2.2k stars, 314 forks) with practical patterns, CLI tools, and templates. His Substack essay frames Loop Engineering as the third layer after Context Engineering and Harness Engineering.

---

## 3. The Five Building Blocks + Memory

Every unattended loop is a small system with six parts:

| # | Primitive | Job in the Loop |
|---|-----------|-----------------|
| 1 | **Automations / Scheduling** | Discovery + triage on a cadence. The heartbeat. |
| 2 | **Worktrees** | Safe parallel execution — isolated checkouts so agents don't collide. |
| 3 | **Skills** | Persistent project knowledge (SKILL.md). Conventions, build steps, why-patterns. |
| 4 | **Plugins & Connectors (MCP)** | Reach into real tools — Linear, GitHub, Slack, DBs. |
| 5 | **Sub-agents** | Maker/checker split. The implementer never grades its own work. |
| + | **Memory / State** | External durable spine — STATE.md, Linear board, DB row. Survives session restarts. |

### Cross-tool convergence

Both Claude Code and OpenAI Codex ship all five primitives. The "loop shape" is becoming tool-agnostic:

| Primitive | Codex App | Claude Code |
|-----------|-----------|-------------|
| Automations | Automations tab + /goal | /loop, /goal, cron, hooks, GitHub Actions |
| Worktrees | Built-in per thread | git worktree, --worktree, isolation:worktree |
| Skills | SKILL.md | SKILL.md, plugins |
| Connectors | MCP + plugins | MCP + plugins |
| Sub-agents | .codex/agents/ TOML | .claude/agents/ |
| State | MD or Linear via connector | MD (AGENTS.md) or Linear via MCP |

---

## 4. Related Concepts (per Addy Osmani)

- **Agent Harness Engineering**: The environment one agent runs in (tools, context, permissions). Loop sits *above* the harness — harness + schedule + state + verification.
- **The Factory Model**: The system that builds the software. Loop engineering is how you operate the factory floor.
- **Intent Debt**: Missing project intent gets filled with confident guesses. Skills pay down intent debt.
- **Comprehension Debt**: The gap between what exists and what you understand. Faster loops ship code you didn't write.
- **Cognitive Surrender**: Letting the loop run while you stop having opinions. Build loops like someone who intends to stay the engineer.
- **Orchestration Tax**: The human cost of coordinating parallel agents. Worktrees remove mechanical collisions.
- **Code Agent Orchestra / Adversarial Code Review**: Different agents with different roles (explore, implement, verify).

---

## 5. Production Patterns

The reference repo defines 7 patterns:

| Pattern | Cadence | Risk | Description |
|---------|---------|------|-------------|
| **Daily Triage** | 1d–2h | Low | Scan issues/PRs, prioritise, update STATE.md. Start here. |
| **PR Babysitter** | 5–15m | Med | Watch open PRs — CI failures, merge conflicts, staleness. |
| **CI Sweeper** | 5–15m | High | Fix failing CI. Very high token cost. L3 only after trust. |
| **Dependency Sweeper** | 6h–1d | Med | Check for outdated/vulnerable deps. Patch-only mode. |
| **Changelog Drafter** | 1d or tag | Low | Auto-generate changelogs from merged PRs. |
| **Post-Merge Cleanup** | 1d–6h | Low | Remove feature flags, stale branches, TODOs. Off-peak. |
| **Issue Triage** | 2h–1d | Low | Classify new issues, suggest labels/assignees. Propose-only. |

### Phased Rollout (Readiness Levels)

| Level | Description | What's enabled |
|-------|-------------|----------------|
| L0 — Draft | Documented intent only | Just the pattern doc |
| L1 — Report | Triage → state, no auto-action | Discovery, reporting only |
| L2 — Assisted | Small auto-fixes with verifier | Code changes via sub-agents |
| L3 — Unattended | Runs without human watching | Full autonomy with guardrails |

**Rule**: Never skip L1 for a new pattern on a production repo.

---

## 6. CLI Tools (npm)

The repo publishes three tools:

- **loop-audit** (`npx @cobusgreyling/loop-audit`): Scores a project's Loop Readiness. Detects activity (STATE.md, loop-budget.md, loop-run-log.md). Supports `--suggest` and `--badge` flags.
- **loop-init** (`npx @cobusgreyling/loop-init`): Scaffolds loop starters with budget and run-log. Pattern and tool selection.
- **loop-cost** (`npx @cobusgreyling/loop-cost`): Estimates token spend for a given pattern + cadence + level.

---

## 7. Failure Modes (Incident-Style Catalog)

| Failure | Severity | Description |
|---------|----------|-------------|
| **Infinite Fix Loop** | S2 | Same PR gets 5+ fix attempts; never converges. |
| **State Rot** | S1→S2 | STATE.md references merged PRs or stale branches. |
| **Verifier Theatre** | S2 | Verifier "approves" but CI fails or bugs are obvious. |
| **Notification Fatigue** | S1→S2 | Team mutes the bot; real escalations missed. |
| **Token Burn** | S1 | Bill spikes from sub-minute cadence with heavy sub-agents. |
| **Over-Reach (Wrong Scope)** | S2→S3 | Loop refactors unrelated modules or touches denylisted paths. |
| **Comprehension Debt Spiral** | S2 | Velocity up, but no one can explain changes. |
| **Cognitive Surrender** | S2 | "The loop handles it" — no opinions on correctness. |
| **Parallel Collision** | S2 | Two sub-agents edit same files; merge conflicts. |
| **Escalation Failure** | S2 | Loop stuck retrying; human never notified. |

### Anti-Patterns (Design Time)

1. Same agent implements and verifies
2. No attempt cap (infinite fix loops)
3. Vague triage output (parsed as narrative, not structured)
4. L3 before L1 quality (auto-fix on day one)
5. Shared state without schema (loop collisions)
6. MCP with write-everything scope (blast radius too large)
7. No kill switch (24/7 with no pause criteria)
8. Fixing flakes with code (masks infra problems)
9. Auto-merge without allowlist
10. No run log (cannot debug past behaviour)

---

## 8. Safety & Guardrails

### Path Denylist
Never auto-edit without human approval: `.env`, secrets, credentials, Terraform, k8s/production, migrations, auth, payments, billing.

### Auto-Merge Policy
**Default: no auto-merge.** Allowed only for trivial changes (typos in docs, lint fixes in test files). Require explicit allowlist.

### Human Gates (Always)
- Security, auth, payments
- Infrastructure changes
- Dependency upgrades
- Changes touching >10 files
- Third failed attempt on same item

### MCP Least Privilege
- GitHub: read issues/PRs, comment/label (not merge by default)
- Linear: comment/status (not delete)
- Slack: post to #loop-escalations only
- Database: no production writes

---

## 9. Token Cost Economics

Rough estimates (assuming ~50k tokens per light triage, ~200k with implementer + verifier):

| Loop | Cadence | Runs/day | Rough daily tokens |
|------|---------|----------|-------------------|
| Daily Triage | 1d | 1 | ~50k |
| CI Sweeper (light) | 15m | 96 | ~5M (if every run is full) |
| PR Babysitter | 5m | 288 | Very high — use early exit |

**Best practice**: Cheap triage pass first → spawn sub-agents only when state says actionable. Empty watchlist → exit in <5k tokens.

---

## 10. Anatomy of a Loop (Mermaid)

```
Schedule/Automation → Triage Skill → Read/Write STATE/Memory
  → Isolated Worktree → Implementer Sub-agent → Verifier Sub-agent
  → MCP/Git/Tickets → Human Gate?
    → Safe: commit/PR
    → Risky: escalate to human
```

---

## 11. Key Sources

1. **Cobus Greyling** — [Loop Engineering (Substack)](https://cobusgreyling.substack.com/p/loop-engineering) (June 9, 2026)
2. **Addy Osmani** — [Loop Engineering (Blog)](https://addyosmani.com/blog/loop-engineering/) (June 7, 2026)
3. **Cobus Greyling** — [loop-engineering GitHub repo](https://github.com/cobusgreyling/loop-engineering) (2.2k stars)
4. **Sources & Attribution** — [resources/sources.md](https://github.com/cobusgreyling/loop-engineering/blob/main/resources/sources.md)
5. Originating X thread: https://x.com/addyosmani/status/2064127981161959567
6. Anthropic — [Effective harnesses for long-running agents](https://www.anthropic.com)
7. Anthropic — [When AI builds itself](https://www.anthropic.com)
8. Addy Osmani — Agent Harness Engineering, The Factory Model
