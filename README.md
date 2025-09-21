# 15 AI System Ready

An AI-ready autonomous coding system with comprehensive CI/CD, security, and observability features.

## Architecture

This repository implements a robust CI/CD pipeline with:
- Automated testing with ≥80% coverage requirements
- SBOM (Software Bill of Materials) generation using SPDX format
- SLSA provenance attestations for supply chain security
- Cosign signature verification
- OpenTelemetry instrumentation for observability

## Outside Collaborator Gate

**Important for AI Coding Agents (including GitHub Copilot):**

This repository treats AI coding agents as outside collaborators for security purposes. When an AI agent creates a pull request:

1. **Workflows do not run automatically** - The CI/CD pipeline will not execute immediately
2. **Manual approval required** - A maintainer must click "Approve and run workflows" in the PR interface before the CI checks will execute
3. **Security by design** - This prevents potentially malicious code from executing in our CI environment without human oversight

### For Maintainers

When you see a PR from an AI coding agent:
1. Review the code changes carefully
2. If the changes look safe, click "Approve and run workflows" in the PR
3. The CI pipeline will then execute all required checks
4. Only merge after all checks pass

### Required Checks

The following checks must pass before a PR can be merged:
- ✅ Tests pass with ≥80% code coverage
- ✅ SBOM policy validation (SBOM artifact generated)
- ✅ SLSA provenance attestation created
- ✅ Cosign verification of attestations passes

## Repository Variables

The following repository variable must be configured manually via GitHub UI:
- `OTEL_FEATURE_CICD=true` - Enables OpenTelemetry instrumentation in CI/CD pipeline

**To configure this variable:**
1. Go to repository Settings → Secrets and variables → Actions
2. Click on the "Variables" tab
3. Click "New repository variable"
4. Name: `OTEL_FEATURE_CICD`
5. Value: `true`
6. Click "Add variable"

## Observability

The CI pipeline includes minimal OpenTelemetry emission that captures:
- Commit SHA
- Pull Request number (when applicable)
- Workflow run ID
- Repository metadata

This observability data can be correlated with downstream systems for comprehensive pipeline monitoring.

## Security & Compliance

This repository follows security best practices:
- Minimal job-scoped permissions in GitHub Actions
- Pinned action SHAs for supply chain security
- SLSA provenance generation for build artifacts
- Cosign-based attestation verification
- SBOM generation for vulnerability scanning

## Contributing

All contributions should follow the established patterns:
1. Create feature branches from `main`
2. Ensure tests pass with ≥80% coverage
3. Verify SBOM and attestation generation works
4. Wait for maintainer approval of workflows (if from outside collaborator)
5. Address any CI/CD pipeline failures