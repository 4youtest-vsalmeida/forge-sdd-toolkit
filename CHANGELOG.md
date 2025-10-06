# Changelog

All notable changes to the forge-sdd-toolkit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned for v0.2
- Complete template library for all Forge modules
- Top 10 specializations for common use cases
- Automated manifest validation
- Enhanced code generation with templates
- Comprehensive test suite
- CI/CD integration

---

## [0.1.0] - 2025-01-05

### 🎉 Foundation Release

The first release of forge-sdd-toolkit establishes the **complete foundation** for Specification-Driven Development of Atlassian Forge apps.

### Added

#### Core Architecture
- ✨ **3-Level Architecture**: Prompts, Templates, and Specializations
- ✨ **6-Stage Lifecycle**: IDEATE → ARCHITECT → PLAN → IMPLEMENT → TEST → OPERATE
- ✨ **SDD Methodology**: Complete implementation of Specification-Driven Development

#### Prompts (Level 1)
- `forge-ideate`: Transform natural language ideas into formal specifications
- `forge-architect`: Generate Architecture Decision Documents with Forge-aware decisions
- `forge-plan`: Create implementation plans and backlogs
- `forge-implement`: Generate working code from specifications
- `forge-test`: Create test suites based on requirements
- `forge-operate`: Prepare deployment and operational documentation

#### Templates (Level 2)
- System prompt with core capabilities and rules
- Decision framework for module selection and UI choices
- Document templates: Specification, ADD, Implementation Plan
- Forge module reference templates (structure)

#### Schemas
- JSON Schema for prompt validation
- JSON Schema for manifest validation
- Specification document schema

#### CLI
- Basic CLI structure for all 6 lifecycle commands
- Command-line interface scaffolding

#### Documentation
- Comprehensive README with methodology explanation
- SDD Methodology detailed guide
- Lifecycle Stages reference
- Copilot instructions for AI-assisted development
- Contributing guidelines
- ADR structure for architectural decisions

#### Project Infrastructure
- TypeScript configuration with strict mode
- ESLint and Prettier for code quality
- Package configuration with all dependencies
- MIT License
- Git ignore configuration

### Development Notes

This release establishes the **foundation** upon which all future development will build. Every component follows the SDD methodology that the toolkit promotes.

**Philosophy**: 
> "We eat our own dog food. This toolkit was built using the same SDD principles it promotes."

### Migration Guide

N/A - First release

---

## Release Strategy

### Versioning Approach

- **v0.x.x**: Foundation and core features (current)
- **v1.0.0**: Production-ready with complete template library
- **v2.0.0**: Advanced features (multi-product, complex integrations)

### Release Cadence

- **Minor versions** (0.x): New features, expanded templates, more specializations
- **Patch versions** (0.1.x): Bug fixes, documentation improvements, small enhancements

---

## Links

- [Repository](https://github.com/vsalmeid/forge-sdd-toolkit)
- [Issues](https://github.com/vsalmeid/forge-sdd-toolkit/issues)
- [Discussions](https://github.com/vsalmeid/forge-sdd-toolkit/discussions)

---

**Legend**:
- ✨ New Feature
- 🐛 Bug Fix
- 📚 Documentation
- 🔧 Configuration
- ⚡ Performance
- 🔒 Security
- ♻️ Refactor
- 🗑️ Deprecation
