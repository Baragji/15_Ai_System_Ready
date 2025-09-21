# Security & Compliance Framework

## OWASP ASVS 5.0 Compliance

This repository implements **Application Security Verification Standard (ASVS) Level 2** controls for web applications and development pipelines.

### Control Mapping

#### V1 - Architecture, Design and Threat Modeling
- **V1.1.1**: Implemented through branch protection rules and merge queue enforcement
- **V1.4.2**: Secure development lifecycle with automated security checks in CI/CD
- **V1.14.6**: Build and deployment processes are repeatable and secure

#### V2 - Authentication
- **V2.2.1**: GitHub OIDC integration for service-to-service authentication
- **V2.8.2**: Time-bound tokens with minimal necessary permissions

#### V7 - Error Handling and Logging  
- **V7.4.1**: Structured logging with OpenTelemetry integration
- **V7.4.3**: Correlation IDs for request tracing (PR number, commit SHA, run ID)

#### V12 - File and Resources
- **V12.1.1**: Least-privilege file access permissions in workflows
- **V12.6.1**: SBOM generation for supply chain transparency

#### V17 - API and Web Service
- **V17.1.1**: Input validation on all external tool calls
- **V17.13.1**: RESTful web services use TLS 1.2+ (GitHub API communications)

## EU AI Act Compliance

### System Classification
- **Risk Category**: **Low-risk** - Internal development tool
- **AI System Type**: Code generation and review assistance
- **GPAI Model**: **Not Applicable** - Uses external models as tools, not providing GPAI services

### Compliance Requirements
1. **Transparency** (Article 13): Clear documentation of AI agent capabilities and limitations
2. **Human Oversight** (Article 14): Maintainer approval required for AI-generated PRs
3. **Accuracy & Robustness** (Article 15): Comprehensive testing with ≥80% coverage requirements
4. **Data Governance** (Article 10): EU-resident execution when using GitHub Enterprise Cloud with data residency

### Risk Mitigation
- Outside collaborator gate prevents automated execution of AI-generated code
- Manual approval workflow ensures human oversight
- Comprehensive testing and verification before merge
- Audit trail through SLSA provenance attestations

## Security Controls Implementation

### Supply Chain Security (SLSA Level 2)
- **Build Integrity**: Pinned action SHAs prevent supply chain attacks
- **Provenance**: SLSA provenance attestations for all build artifacts
- **Verification**: Cosign signature verification as mandatory check
- **SBOM**: Complete software bill of materials in SPDX format

### Access Controls
- **Principle of Least Privilege**: Minimal job-scoped permissions
- **Multi-person Approval**: ≥1 maintainer approval (≥2 for high-risk changes)
- **Merge Queue**: Prevents merge conflicts and ensures status check integrity
- **Branch Protection**: Force push and deletion prevention

### Monitoring & Observability
- **OpenTelemetry**: Structured pipeline instrumentation
- **Correlation Tracking**: End-to-end request tracing
- **Audit Logging**: Complete history of all changes and approvals
- **Evidence Preservation**: 30-day retention of build artifacts and reports

## Compliance Validation

### Automated Checks
- [ ] All tests pass with ≥80% coverage
- [ ] SBOM generated and uploaded
- [ ] SLSA provenance attestation created
- [ ] Cosign verification successful
- [ ] No high/critical vulnerabilities in dependencies

### Manual Reviews
- [ ] Security impact assessment for significant changes
- [ ] AI-generated code review by maintainer
- [ ] Compliance checklist completion
- [ ] Risk assessment for new dependencies

## Contact & Reporting

For security issues or compliance questions:
- Create a private security advisory for vulnerabilities
- Open an issue for compliance framework questions
- Contact repository maintainers for urgent security concerns

Last Updated: 2024-12-19
Compliance Framework Version: ASVS 5.0.0, EU AI Act 2024/1689