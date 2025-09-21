# Autonomous System Roadmap

## Repository Review

- The codebase currently exposes a lightweight Node.js module that offers a `processMessage` helper for prefixing messages and a `healthCheck` utility that reports status, timestamp, and version metadata.
- Unit tests cover the message handling edge cases and health-check timestamp validation via Jest with coverage thresholds enforced through configuration in `package.json` and the Jest suite.
- CI/CD is standardized through a single `ci` workflow that runs on `pull_request` and `merge_group` events, enforcing least-privilege permissions, dynamic language detection, >=80% coverage, SBOM generation, artifact retention, and optional OpenTelemetry emission behind a feature flag.
- Repository governance documentation specifies mandatory workflow approval for outside collaborators, merge-queue usage, pinned actions, cosign verification, SBOM/SLSA evidence expectations, and observability practices, reflecting ASVS Level 2 and EU AI Act obligations.
- Supplemental governance artifacts (e.g., ruleset checklist) reinforce required approvals, status checks, and artifact handling patterns for AI-generated contributions.

## Extracted System Requirements from `research_output.json`

- **Autonomy Standard**: Agents must deliver draft PRs per task under policy-constrained controls, backed by reproducible CI producing SLSA provenance, SBOM, and optional Sigstore verification while enabling DORA metric derivation via CI/CD telemetry.
- **Benchmark Metrics**: Success is tracked through PR autonomy rate, supply-chain proof rate, evidence completeness, observability coverage, and the four DORA metrics (deployment frequency, lead time, change failure rate, MTTR).
- **Technology Inventory**: Core enablers span GitHub Copilot coding agent, OpenAI Assistants & Workflows, merge queue, artifact attestations, cosign, Syft SBOM tooling, OpenTelemetry CI/CD conventions, MCP, and alternative agents/IDEs (Replit, Cursor).
- **SDLC Role Coverage**: Responsibilities and automation feasibility are mapped for product, architecture, development, security, QA, platform, SRE, UX, technical writing, release, and privacy roles to inform orchestration design.
- **Gap Analysis**: Outstanding needs include coordinated multi-repo changes, human oversight for architecture/threat modeling, LLM safety policy enforcement, EU data residency verification, and development of an autonomy orchestrator for prompts, MCP allowlists, and artifact posting.
- **Implementation Phases**: Twelve phases define objectives, prerequisites, AI-executable steps, validation criteria, and integration touchpoints covering governance rulesets, deterministic CI, observability, task delegation, policy gates, multi-repo orchestration, MCP governance, signed commits, EU data policy, benchmarking, vendor portability, and business-case/ops readiness.
- **Success Metrics & Evidence**: Delivery must ensure ≥80% coverage, SBOM, provenance artifacts, weekly autonomy benchmarking, OTel span emission, and retention of SBOM/provenance/signature/coverage/test logs within the stated evidence window and citation policy.
- **Strategic Concerns & Validation**: Multi-repo orchestration, TCO modeling, vendor lock-in mitigation, decision authority, compliance governance, operational readiness, and change management are formalized alongside technical fixes such as citation freshness, deterministic builds, least-privilege enforcement, and EU data handling.

## Roadmap to Full System Realization

The roadmap below sequences micro-phases, dependencies, and measurable outcomes to evolve the current repository into the fully autonomous system described above. Execution readiness (Phases 1–6 immediate, 7–12 requiring added governance/legal engagement) guides parallelization choices.

1. **Phase 0 – Baseline Validation & Gap Closure**
   - **Objective**: Audit current repository against governance documentation and confirm baseline CI artifacts align with required evidence patterns.
   - **Dependencies**: Repository admin access; knowledge of existing workflows; aligns with current README/SECURITY mandates.
   - **Milestone**: Documented gap matrix covering rulesets, pinned SHAs, evidence retention, and OTEL flag status.

2. **Phase 1 – Governance Ruleset Activation**
   - **Objective**: Enforce precise rulesets requiring maintainer approvals, merge queue, status checks, and agent labeling; codify workflow approval gate for outside collaborators.
   - **Dependencies**: Phase 0 findings; org-level admin to configure repository rules/merge queue.
   - **Milestone**: Ruleset simulation shows draft PR blocked until approval; agent PR labeled `agent:coding`.

3. **Phase 2 – Deterministic CI & Evidence Manifests**
   - **Objective**: Pin action SHAs and container digests, enforce frozen dependencies, upload SBOM/provenance artifacts, and keep repository lean via index manifests.
   - **Dependencies**: Phase 1 (required checks defined); existing CI pipeline structure.
   - **Milestone**: CI run produces SBOM, coverage, and SLSA provenance artifacts with cosign verification; evidence manifest committed.

4. **Phase 3 – Observability Enablement**
   - **Objective**: Toggle `OTEL_FEATURE_CICD`, emit minimal spans with stable attributes, and implement rollback guard if semantic conventions shift.
   - **Dependencies**: Phases 1–2 (CI stable); availability of OTLP endpoint and secrets.
   - **Milestone**: Traces correlated to PRs appear in telemetry backend; feature flag toggle documented.

5. **Phase 4 – Autonomous Task Loop Validation**
   - **Objective**: Run agent-driven draft PR workflow with explicit prompts, enforce approval gate, and route merges through queue once checks pass.
   - **Dependencies**: Phases 1–3; trained maintainers for approvals.
   - **Milestone**: Sample agent PR proceeds from draft to merged via queue without human code edits.

6. **Phase 5 – Policy Gates & Secret Hygiene**
   - **Objective**: Integrate SBOM license policy enforcement, secret scanning/push protection, dependency review, and package provenance hooks.
   - **Dependencies**: Phase 2 artifacts; security tooling access.
   - **Milestone**: CI fails on disallowed licenses or missing provenance; secret scanning blocks unsafe pushes.

7. **Phase 6 – Multi-Repo Orchestration Pilot**
   - **Objective**: Build composite GitHub Action for dependent PRs, use tracking issues for ordering, and enforce merge sequence via queue checks.
   - **Dependencies**: Phases 1–5; additional repositories and org-level permissions.
   - **Milestone**: Coordinated API/client change merges across repos with enforced dependency order.

8. **Phase 7 – MCP Governance & Prompt Hygiene**
   - **Objective**: Introduce `.github/copilot/mcp.json`, validate against allowlists in CI, and update prompts to leverage MCP context while avoiding sensitive data.
   - **Dependencies**: Security review; Phase 4 loop operational.
   - **Milestone**: CI fails on unauthorized MCP entries; agent runs reference managed context sources only.

9. **Phase 8 – Signed Commit Compliance**
   - **Objective**: Choose and document strategy for aligning agent contributions with signed-commit policy and validate via test PR.
   - **Dependencies**: Branch protections; coordination with maintainers (Phase 1).
   - **Milestone**: Merged agent PR produces compliant signed commit history per policy update in SECURITY.md.

10. **Phase 9 – EU Data Matrix & Compliance Gate**
    - **Objective**: Produce EU data-handling matrix, embed CI check for vendor residency/logging compliance, and integrate GDPR checklist into PR templates.
    - **Dependencies**: Legal/DPO engagement; security documentation updates.
    - **Milestone**: CI gate blocks configurations lacking EU-compliant settings; DPO sign-off recorded.

11. **Phase 10 – Autonomy Benchmarking (SWE-bench)**
    - **Objective**: Mirror benchmark tasks, automate nightly runs producing PRs and metrics, and publish autonomy dashboard.
    - **Dependencies**: Phases 4–5 (stable loop); telemetry infrastructure (Phase 3).
    - **Milestone**: Weekly report showing pass rate and human-edit deltas for benchmark tasks.

12. **Phase 11 – Vendor Portability & Lock-In Mitigation**
    - **Objective**: Abstract CI supply-chain steps and prove parity on GitLab/Azure pipelines with migration checklist and artifact export plan.
    - **Dependencies**: Mature phases 1–6; access to alternate CI environments.
    - **Milestone**: Pilot run demonstrating equivalent SBOM/provenance/signature checks on alternate platform.

13. **Phase 12 – Business Case, TCO, and Operational Readiness**
    - **Objective**: Model three-year ROI/TCO, develop training modules, produce incident/DR runbooks, and establish regulatory change tracker.
    - **Dependencies**: Benchmark/telemetry data (Phase 10); compliance framework (Phase 9).
    - **Milestone**: Executive-ready ROI report, completed training logs, and validated runbook drill outcomes.

14. **Ongoing Success Monitoring**
    - **Objective**: Continuously evaluate success metrics (coverage, SBOM, provenance, autonomy pass rate, DORA metrics) and maintain evidence bundles per policy.
    - **Dependencies**: Completion of Phases 1–12; operational observability stack.
    - **Milestone**: Weekly metrics dashboard with alerts on stop-ship gate regressions and archival of required artifacts within evidence window.
