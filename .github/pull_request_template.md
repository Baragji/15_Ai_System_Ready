# Initialize CI with SBOM + SLSA provenance + cosign verification (merge_queue-ready)

## Summary
- Adds `.github/workflows/ci.yml` with:
  - Least-privilege permissions (id-token: write, attestations: write; default contents: read).
  - Events: `pull_request` and `merge_group` (required for merge queue status checks).
  - Tests with coverage ≥80%, SBOM generation (CycloneDX), SLSA provenance attestation, cosign verify-attestation.
  - Evidence uploaded as Actions artifacts (no large evidence committed).

## Outside Collaborator Gate
- Copilot coding agent is treated as an outside collaborator. Draft PR workflows do not run automatically.
- Maintainer must click “Approve and run workflows” on this PR for CI to execute.

## Required Checks (merge-queue enforced)
- `ci (required-checks)` — passes only if:
  - Tests green.
  - Coverage ≥80%.
  - SBOM policy pass (SBOM artifact present).
  - cosign verify-attestation pass.

## Notes
- Merge queue requires workflows to listen on the `merge_group` event.
- OTel CI/CD spans are guarded by `OTEL_ENABLED` for quick rollback if semconv changes.