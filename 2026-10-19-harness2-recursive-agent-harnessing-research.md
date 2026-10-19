# Harness² (Google Research): research for the recursive agent harnessing post (2026-10-19)

Post this feeds: `posts/harness2-google-recursive-agent-harness/index.mdx` (published 2026-10-19).

Everything below was read from the primary source on 2026-10-19: the repo at `google-research/harness2` (API plus a shallow clone), the arXiv paper `2610.14224v1`, the project site `harness2.github.io`, and a local run of the credential-free demo. Third-party material is labelled as such. Numbers from the paper are the paper's numbers, not mine.

## 1. What exists (verified 2026-10-19)

| Fact | Value | Source |
|---|---|---|
| Repo | `google-research/harness2`, Apache-2.0 | GitHub API |
| Created | 2026-10-06T21:48:11Z | GitHub API |
| Last push | 2026-10-14T02:22:51Z | GitHub API |
| Stars / forks / open issues | 10,014 / 886 / 76 | GitHub API |
| Commits on `main` | 3 (`Initial commit`, `updates`, `Fix arXiv link`) | `git log` |
| Contributors | 2 (`rux001` 2 commits, `cuizz11` 1) | GitHub API |
| Language / packaging | Python, `requires-python >=3.12,<3.14`, no runtime dependencies, extras `render` and `bridge` | `pyproject.toml` |
| Paper | "Harness²: Recursive Agent Harnessing for an Open World", arXiv 2610.14224, submitted 9 Oct 2026 | arXiv abs page |
| Authors | Ruiyao Xu (Northwestern), Yanfei Chen, Zhongying CuiZhu, Bhavana Dalvi Mishra, Yifei Ming, Han Yu, Rujun Han, Chen-Yu Lee, Tomas Pfister (Google Cloud AI Research) | arXiv abs page |
| Project site | `harness2.github.io` | live |
| Disclaimer | "not an officially supported Google product", not eligible for the OSS VRP | README |

The star count is out of proportion to the code history. 10k stars on three commits in thirteen days is a signal about the topic, not about a mature library. Treat the repo as a reference implementation of the paper, and read issues before trusting it with a budget.

## 2. What the method actually does (paper, sections 2.1 to 2.3)

Two levels of recursion, model weights frozen in both.

- **Task-level recursion** refines the execution harness for the task in front of it, through one contrastive **Propose, Probe, Compose** step. No ground-truth verifier is used.
  - Propose: run a reference execution with the current harness, then have an editor propose two candidates from the task, the harness, the reference trajectory, the history, and the library. One is **invariant** (planning, tool use, context management, delegation), one is **domain-specific** (knowledge, procedures, constraints of the domain).
  - Probe: execute both candidates on the same task under matched model and environment, and diff behavior against the reference. The paper calls the result a **behavioral contrast**. It is evidence about whether the edit changed the targeted behavior, not a verdict on correctness.
  - Compose: a composer reads the reference, both candidates, their diffs, and all task-local evidence, then merges supported changes, revises conflicts, adopts one candidate, or keeps the current harness. Every decision is tied to an observation.
- **Harnessing-level recursion** runs after the deliverable: a reflection reads the whole improvement record and appends the adopted harness plus supported lessons to a **harness improvement library**, one directory per domain. The next task still starts from the same base harness H0, but Propose can read the library.
- **Parallel recursion** and **sequential recursion** are the two ways to spend more than one step per task: `k` candidates per scope plus `k` independent compositions, or `k` chained steps that carry evidence forward. `k=1` skips selection entirely.

Library entries are executable trees plus an `EXPERIENCE.md` per entry, and an `INDEX.md`. The paper's ablation says this matters: remove the library and WorkBuddy-Bench drops 3.1 points, JobBench 1.8.

## 3. The eight components (paper Table 5, repo `core/tree.py`)

| Component | File | Reaches the model |
|---|---|---|
| C1 System prompt | `systemprompt.md` | every call |
| C2 Guardrails | `guardrails.md` | every call |
| C3 Memory | `LongTermMEMORY.md` | every call |
| C6 Skills | `skills/<n>/SKILL.md` + `scripts/*` | on demand, via the skill tool |
| C4 Tool guidance | `tool_descriptions/tool_guidance.md` | every call |
| C7 Scripts | `scripts/<name>.py` | run via bash |
| C5 Subagents | `sub_agents/<n>/AGENT.md` | via the task tool, own context window |
| C8 Plugin | `plugin/<name>.ts` | inside the tool loop |

Every component is a file, so every edit is a diff that can be validated, stored, and replayed. This is the design decision the rest of the system depends on.

## 4. Results as published (paper Tables 1 and 2, mean over three streams)

WorkBuddy-Bench, macro average of Code, Web, Office:

| Executor / initial harness | Base | Harness² k=1 | + parallel k=5 |
|---|---|---|---|
| Gemini 3.5 Flash, OpenCode | 72.4 (0.9) | 77.5 (2.5) | +3.3 |
| Gemini 3.5 Flash, Codex | 74.5 (1.6) | 77.5 (2.0) | +2.9 |
| GLM-5, OpenCode | 64.2 (1.4) | 75.7 (2.2) | +3.9 |
| GLM-5, Codex | 64.4 (1.2) | 75.3 (1.3) | +3.0 |

JobBench score and LAB partial pass rate:

| Executor / harness | JobBench base | H² k=1 | +k=5 | LAB base | H² k=1 | +k=5 |
|---|---|---|---|---|---|---|
| Gemini 3.5 Flash, OpenCode | 31.5 | 36.0 | +3.0 | 79.9 | 81.9 | +2.6 |
| GLM-5, OpenCode | 20.6 | 24.2 | +4.2 | 59.6 | 71.4 | +6.7 |
| Gemini 3.5 Flash, Codex | 33.9 | 35.3 | +4.2 | 71.6 | 75.6 | +2.9 |
| GLM-5, Codex | 23.6 | 24.8 | +3.1 | 58.1 | 65.9 | +4.8 |

Read honestly:

- The headline gains (+11.5 WorkBuddy, +4.5 JobBench, +11.8 LAB) all come from **GLM-5**, the weaker executor, and the WorkBuddy one is driven by its Code domain (58.4 to 77.1). Gemini 3.5 Flash gains 5.1 on the same benchmark. A weaker model with a better harness beats a stronger model with the stock one (GLM-5 at 75.7 versus Gemini at 72.4), which is the paper's most interesting claim.
- The editor is **Claude Opus 4.8** in the main tables. The same-model experiment (editor and executor both the same model, k=2) still improves everything: Opus 5 +3.3 WB, +5.5 JB, +3.0 LAB; GLM-5 +13.7 on LAB at k=2, which is larger than its k=1 OpenCode gain.
- Baselines lose in places: ReasoningBank falls up to 6.6 points below the base on coding, Harness Scaling is below base in 7 of 12 pairs, and **Meta-Harness leads LAB partial for Gemini 3.5 Flash under Codex at k=1** (76.5 versus 75.6). Harness² wins that cell again at k=5.
- Component ablation on the already-improved harness (k=5, WorkBuddy 80.8): removing skills costs 5.3, scripts 3.7, the prompt group 1.5. Every ablated harness still beats the base.
- Cross-model transfer: a harness refined for Gemini 3.5 Flash, applied unchanged to GLM-5, moves WB Code from 58.5 to 75.8.
- Against production harnesses (CodeBuddy, OpenCode, Codex, Claude Code, each unmodified), no fixed harness wins all three domains: Claude Code wins Code and Office, Codex wins Web. Harness² from OpenCode at k=5 beats the best fixed harness by 4.6, 5.8, and 4.9.

## 5. Cost and budget (repo `core/ledger.py`)

The ledger asserts a budget identity per task per mode: **R = 4k rollouts** (`k` shared base, `2k` candidates, `k` finals) and **P = 3k improvement stages** (`k` invariant, `k` domain, `k` compositions). Reflection and selection sit outside the ledger. `BudgetError` fires when a run does not land on the identity.

Paper's compute analysis: at k=1 to 5, Gemini 3.5 Flash under OpenCode goes from 4.5 to 7.5 points over base on JobBench and 5.1 to 8.4 on WorkBuddy, and both Harness² configurations sit on the empirical Pareto frontier of score against total tokens. Meta-Harness spends more compute than Harness² at k=5 for less score. Latency can be cut by running parallel proposal and composition sessions concurrently.

## 6. My own run (measured 2026-10-19, macOS 26.6.2, CPython 3.12.14 via uv)

The README asks for Linux, Python 3.12, and uv. I used macOS and it worked. Commands:

```
uv venv --python 3.12 .venv
source .venv/bin/activate
uv pip install -e .
harness2-demo --output runs/demo --k 2
```

Output: `[accounting] 1/2 ok ledger-1`, `[accounting] 2/2 ok ledger-2`, exit 0, **1.649 s** wall clock on the installed machine. `demo.json` reports `execution_count: 28` and `editor_calls: 32` for two tasks across both modes at k=2.

What the demo actually is: a two-task accounting domain. `summarize.py` sums a CSV of signed amounts but the base version filters `amount > 0`, so credits are dropped. `DemoProposer` is scripted, not a model: it deletes ` if amount > 0` from the script, writes the EXPERIENCE entry, and picks the deliverable containing the correct total. The recursion machinery, the tree writes, the library, the selection ids, the ledger, and the subprocess executions are all real code.

Answers, read from the run artifacts:

| Task | Ledger rows | Base output | Refined output | Correct |
|---|---|---|---|---|
| ledger-1 | 100.25, -20.10, 5.00 | Total: 105.25 | Total: 85.15 | 85.15 |
| ledger-2 | 35.50, -10.25, -5.00 | Total: 35.50 | Total: 20.25 | 20.25 |

Per task, both modes together: 2 base executions shared by the two modes, 6 improvement stages per mode (2 invariant proposals, 2 domain proposals, 2 compositions), 1 selection session, and 1 reflection session. That is why 32 editor sessions were logged for 2 tasks. `INDEX.md` for the domain lists both entries with the cue "When a ledger includes credits and debits", and each `EXPERIENCE.md` carries the change, the observation, and the lesson with a confidence line.

This is the smallest honest demonstration of the method that exists: a behavioral contrast on the same task, an edit supported by that contrast, a stored lesson, and the current task re-executed. It is also a demonstration that the demo proves the plumbing, not the intelligence. The scripted editor already knows the fix.

## 7. Engineering details worth stealing (repo code, not the paper)

- **Leak tripwires.** `assert_no_leak_paths` rejects benchmark-declared answer-key paths before any context reaches a model. `assert_no_grader_verdicts` scans file names and content for `GRADER_VERDICT_MARKERS` (`deterministic_eval_summary`, `"pass_rate"`, and similar) and raises with a message that says the tripwire is a leak, not a false positive to widen around. The same check runs on agent-authored harness trees before they can be rolled or stored.
- **Anonymized selection.** Candidates are mapped to `A`, `B`, ... by canonical sort plus a seeded shuffle, the selector returns an id from that map, and `adoption.json` maps it back. The selector never sees which harness produced which deliverable.
- **Validation with a bounded retry.** A harness tree with a skill missing its trigger sentence, a script that does not compile, or a skill calling an unshipped helper is retried once with the validator's message, then the stage inherits its starting tree and the fallback is recorded.
- **A guard on the working directory.** The editor's session gets evidence as files, and the guard refuses to hand over a directory containing a grader verdict, rubric, or score.
- **Resume by re-running the same command**, with a saved configuration that refuses incompatible resumes and a new `HARNESS2_RUNS_DIR` required when models or task selection change.

## 8. Where it breaks (paper Appendix E.6, F, and the issue tracker)

- Selection can prefer a weaker candidate: on WB Code an output scoring 55 was chosen over one scoring 95; on LAB narrower coverage took a task from 54 to 26.
- An incorrect premise propagates across candidates: a literal-key requirement or an unchecked cache assumption cost 2 to 11 points.
- The release does not restrict network access, and one Codex rollout on JobBench downloaded its own task rubric without being asked. The docs tell you to block `huggingface.co`, `hf.co`, `github.com`, and `raw.githubusercontent.com` at the network level during evaluation.
- Bugs found by early users, both with reproductions: `harness2-report` undercounts improver spend on resumed tasks (issue 50), and `judge_one` trusts `all_pass` / `n_passed` from a payload, so a passing LAB task can read as a failure and a null `n_passed` breaks the report (issue 80). There is an open request for a `--max-usd` spend limit (issue 4).
- The paper's own limitations: refinement costs extra inference on top of execution, and behavioral contrasts are sensitive to execution variance and shared model bias, so an adopted change is not guaranteed to transfer.

## 9. Keyword read (Google autocomplete via HTTPS, 2026-10-19)

| Seed | Google suggests |
|---|---|
| harness2 | harness 2, harness 2.0, harness 2 stokke, harness 2 booster seat britax, harness 2 tripp trapp, harness 2 2jz |
| recursive agent harnessing | nothing on topic (recursive triggers, recursiveaction java) |
| agent harness | agent harness meaning, agent harness pi, agent harness engineering, agent harness benchmark, agent harness ai, agent harness skills, agent harness claude, agent harness anthropic, agent harness hermes, agent harness opencode |
| harness engineering | harness engineering ai, harness engineering anthropic, harness engineering github, harness engineering course, harness engineering for coding agent users, harness engineering example, harness engineering google, harness engineering concept, harness engineering pdf |
| google harness | google harness engineering, google harness ai, google harness agent, google harness paper, google harness for gemini |

Two conclusions:

1. The literal token "harness 2" is contaminated by car seats (Stokke, Britax, Tripp Trapp) and the 2JZ engine. A post titled only "Harness²" competes with strollers. The post has to carry "agent harness" and "recursive" in the title, description, headings, and slug, and let the brand token ride along.
2. "Agent harness" and "harness engineering" are live, expanding clusters with no strong owner in this niche yet. GSC shows **zero** harness queries in the top 500 queries of the last 90 days, so this post opens a cluster rather than defending one.

GSC context (90 days to 2026-10-19, `sc-domain:ntorres.dev`): 14,646 impressions and 19 clicks across the top 500 queries. Demand is concentrated in schema lookups (cursor hooks, 89,780 impressions at position 5.5) and product explainers (jev 5,118 at 7.7; clef 1,416 at 7.7). The loop-engineering series earns 11 to 89 impressions per page, so it is the right internal link target and the wrong traffic assumption.

## 10. Post outline (shipped)

1. What a harness is, and why tuning it beats swapping the model.
2. The two loops: task-level refinement and the improvement harness.
3. Propose, Probe, Compose without a verifier: behavioral contrasts instead of scores.
4. The eight components, and why every one of them is a file.
5. The demo: 1.6 seconds, one bug, two totals, one stored lesson.
6. The published numbers, with the weaker-executor caveat and the cell Meta-Harness wins.
7. Cost: the 4k and 3k budget identity, and where the compute goes.
8. The details worth copying: leak tripwires, anonymized selection, bounded retries.
9. Where it breaks, including the network access problem and the two open bugs.
10. What to take into your own loop.

## 11. Left unverified, on purpose

- Star growth over time. The stargazer endpoint needs authentication for `starred_at`, and `gh api` returned 404 for the dated listing, so the 10,014 figure has no curve behind it. The post does not claim a growth rate.
- Costs in dollars for a real benchmark run. The paper reports compute relative to baselines, not a price sheet, and I did not run a model-backed benchmark. The demo has no model calls and costs nothing.
- HN reaction beyond the numbers: one thread on 2026-10-19 with 30 points and 4 comments, plus two earlier duplicate submissions with 5 points. No technical criticism in the threads, so there is nothing to cite as independent review.
- Whether the paper's LAB split (100 test tasks from a 1,251-task stream) is representative of legal work. The split comes from another study (`Niklaus, 2026`) and is stated, not defended, in this paper.
- Third-party explainers exist (`cldnavi.com`, `datastudios.org`, a DAIR academy page). They are summaries of the same paper with no independent measurement, so nothing from them is used in the post.
