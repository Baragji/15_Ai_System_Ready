# GitHub Ruleset Checklist (Governance)

## Approvals
- [ ] Require pull request approvals: ≥1 maintainer (≥2 for high-risk paths)
- [ ] Dismiss stale approvals on new commits: enabled
- [ ] Restrict who can dismiss reviews: maintainers only

## Merge Controls
- [ ] Require merge queue: enabled
- [x] Note: Workflows must listen on the `merge_group` event for status checks to run in queue
- [ ] Block force pushes and branch deletions: enabled

## Status Checks (Required)
- [x] `ci (required-checks)` — single job enforces all below
  - [x] Tests green
  - [x] Coverage ≥80%
  - [x] SBOM policy pass (SBOM artifact present)
  - [x] cosign verify-attestation pass (SLSA provenance verified)

## Policy & Security
- [ ] Require signed commits (if org policy requires)
- [ ] Require approval for all outside collaborators and forks (Actions setting)
- [x] Default label for agent PRs: `agent:coding`

## Compliance & Security Framework
- [x] OWASP ASVS 5.0 Level 2 alignment documented
- [x] EU AI Act compliance assessment (Low-risk internal)
- [x] Least privilege permissions (contents:read, id-token:write, attestations:write)

## Notes
- Large evidence (SBOMs, coverage reports, logs) must be uploaded as Actions artifacts only; commit indexes/manifests if needed.
- Manual configuration required for branch protection, merge queue, and Actions security settings via GitHub UI.