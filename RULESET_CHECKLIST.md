# GitHub Ruleset Checklist (Governance)

## Approvals
- [ ] Require pull request approvals: 2 (at least 1 maintainer)
- [ ] Dismiss stale approvals on new commits: enabled
- [ ] Restrict who can dismiss reviews: maintainers only

## Merge Controls
- [ ] Require merge queue: enabled
- [ ] Note: Workflows must listen on the `merge_group` event for status checks to run in queue
- [ ] Block force pushes and branch deletions: enabled

## Status Checks (Required)
- [ ] `ci (required-checks)` — single job enforces all below
  - [ ] Tests green
  - [ ] Coverage ≥80%
  - [ ] SBOM policy pass (SBOM artifact present)
  - [ ] cosign verify-attestation pass (SLSA provenance verified)

## Policy & Security
- [ ] Require signed commits (if org policy requires)
- [ ] Require approval for all outside collaborators and forks (Actions setting)
- [ ] Default label for agent PRs: `agent:coding`

## Notes
- Large evidence (SBOMs, coverage reports, logs) must be uploaded as Actions artifacts only; commit indexes/manifests if needed.