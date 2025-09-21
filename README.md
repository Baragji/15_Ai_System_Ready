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

## Repository Governance

### Branch Protection & Merge Queue Configuration

**Manual Configuration Required (Repository Settings):**

1. **Branch Protection Rules** (Settings → Branches → Add rule for `main`):
   - ✅ Require pull request reviews: **≥1 maintainer approval**
   - ✅ For high-risk paths: **≥2 maintainer approvals**  
   - ✅ Dismiss stale reviews when new commits are pushed
   - ✅ Restrict who can dismiss reviews: **maintainers only**
   - ✅ Require status checks: `ci (required-checks)`
   - ✅ Require branches to be up to date before merging
   - ✅ Block force pushes and deletions

2. **Merge Queue** (Settings → General → Merge queue):
   - ✅ Enable merge queue for `main` branch
   - ✅ Merge method: **Squash and merge**
   - ✅ Maximum queue size: **5**
   - ✅ Merge queue status checks timeout: **30 minutes**

3. **Actions Security** (Settings → Actions → General):
   - ✅ Require approval for outside collaborators and forks
   - ✅ Default workflow permissions: **Read repository contents**

### Required Status Checks

The `ci (required-checks)` workflow enforces:
- ✅ **Tests**: All tests must pass
- ✅ **Coverage**: Code coverage ≥80%
- ✅ **SBOM Policy**: SBOM artifact generated and present
- ✅ **Cosign Verify**: SLSA provenance attestation verified

### Least Privilege Permissions

The CI workflow uses minimal job-scoped permissions:
- `contents: read` - Access repository code
- `id-token: write` - Generate OIDC tokens for attestations
- `attestations: write` - Create SLSA provenance attestations

**Note**: Additional permissions are not granted unless specifically needed:
- `packages: write` - Only if attesting/pushing container images
- `pull-requests: write` - Only if posting PR comments
- `security-events: write` - Only if uploading SARIF files

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

This repository follows security best practices and compliance frameworks:

### Security Framework Compliance
- **OWASP ASVS 5.0**: Application Security Verification Standard Level 2 compliance for web applications
  - V1 (Architecture & Design): Branch protection and merge queue enforcement
  - V2 (Authentication): GitHub OIDC integration for attestations
  - V7 (Cryptography): TLS 1.2+ for all API communications
  - V12 (Files/Resources): Least-privilege GitHub App tokens
  - V17 (API): Input validation on workflow tool calls

### EU AI Act Compliance
- **Classification**: Low-risk internal AI system for code generation and review
- **GPAI Applicability**: Not applicable - internal development tool with limited scope
- **Data Protection**: EU-resident execution when using GitHub Enterprise Cloud with data residency

### Security Controls
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