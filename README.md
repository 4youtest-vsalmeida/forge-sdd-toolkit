# forge-sdd-toolkit

> **Specification-Driven Development** toolkit that transforms **natural language ideas** into **fully orchestrated Atlassian Forge apps** through a **6-stage lifecycle**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Copilot](https://img.shields.io/badge/GitHub-Copilot-blue.svg)](https://copilot.github.com/)

## 🎯 What is SDD?

**Specification-Driven Development (SDD)** is a methodology where:

1. **Specifications drive everything** - Code is generated from specs, never written manually
2. **Natural language is the source of truth** - Users describe WHAT, not HOW
3. **Six lifecycle stages must be followed sequentially** - Never skip stages
4. **Every decision traces back to requirements** - Full traceability

## 🔄 The 6-Stage Lifecycle

```
IDEATE → ARCHITECT → PLAN → IMPLEMENT → TEST → OPERATE
```

1. **IDEATE** → Transform ideas into formal specifications
2. **ARCHITECT** → Make all technical decisions (modules, UI, scopes)
3. **PLAN** → Break down into tasks and backlog
4. **IMPLEMENT** → Generate working code
5. **TEST** → Create comprehensive test suites
6. **OPERATE** → Setup deployment and monitoring

## 🚀 Quick Start

### Using GitHub Copilot

1. Clone this repository to your workspace
2. Open GitHub Copilot Chat (Cmd/Ctrl + I)
3. Start with: `@forge-ideate`
4. Describe your Forge app idea:
   ```
   I want to build a Jira app that shows GitHub PR status in issue panels
   ```
5. Follow the prompts through each lifecycle stage

## 📋 Example Workflow

```bash
# Stage 1: IDEATE - Transform idea into specification
@forge-ideate
I need an app that tracks technical debt in Confluence pages
# Output: docs/specification-document.md

# Stage 2: ARCHITECT - Make technical decisions
@forge-architect
# Output: docs/ADD.md (Architecture Decision Document)

# Stage 3: PLAN - Create implementation plan
@forge-plan
# Output: docs/implementation-plan.md

# Stage 4: IMPLEMENT - Generate code
@forge-implement
# Output: src/, manifest.yml, package.json

# Stage 5: TEST - Create test suite
@forge-test  
# Output: tests/

# Stage 6: OPERATE - Setup deployment
@forge-operate
# Output: .github/workflows/, monitoring configs
```

## 🏗️ Architecture: 3-Level System

### Level 1 - Prompts (Orchestrators)
High-level orchestrators that manage the complete flow through the 6 stages.
Located in `.github/prompts/*.prompt.md`

### Level 2 - Templates (Knowledge Base)
Structured knowledge base for Forge patterns, modules, and best practices.
Located in `structure/templates/`

### Level 3 - Specializations (Expert Implementations)
Ultra-specific expertise for each Forge module use case.
Referenced from templates as needed.

## 🎯 Why SDD for Forge?

### Traditional Approach
```
Developer → Reads docs → Writes code → Debugs → Fixes scopes → Redeploys
```

### SDD Approach
```
User → Describes idea → System generates:
  ├── Specification
  ├── Architecture decisions
  ├── Implementation plan
  ├── Working code
  ├── Test suite
  └── Deployment config
```

**Result**: From idea to deployed app in minutes, not days.

## 🔧 Project Structure

```
forge-sdd-toolkit/
├── structure/
│   ├── prompts/           # Stage orchestrators
│   │   ├── commands/      # forge-ideate.md, forge-architect.md, etc.
│   │   └── base/          # system-prompt.md, decision-framework.md
│   ├── templates/         # Knowledge base (60+ templates)
│   └── schemas/           # Validation schemas
├── .github/
│   ├── prompts/           # GitHub Copilot prompts
│   └── copilot-instructions.md
└── pyproject.toml         # Python package config
```

## 🎓 Core Principles

- **Forge-First Thinking**: Always consider platform limitations and best practices
- **Three-Level Structure**: Orchestration → Knowledge → Specialization
- **Decision Matrices**: Clear criteria for architectural choices
- **Real-World Focus**: Working code with proper error handling
- **Full Traceability**: Every artifact traces back to requirements

## 📚 Documentation

- [Setup Guide](SETUP.md) - Development setup and contribution guide
- [SDD Methodology](.github/SDD_METHODOLOGY.md) *(coming soon)*
- [Lifecycle Stages](.github/LIFECYCLE_STAGES.md) *(coming soon)*

## 🎓 Learn More

- [Atlassian Forge Platform](https://developer.atlassian.com/platform/forge/)
- [GitHub Copilot](https://github.com/features/copilot)
- [SDD Methodology](https://github.com/4youtest-vsalmeida/forge-sdd-toolkit/wiki)

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 👤 Author

**Vinicius Almeida (VSALMEID)**
- GitHub: [@4youtest-vsalmeida](https://github.com/4youtest-vsalmeida)

## 🌟 Status

- **Created**: 2025-01-05
- **Updated**: 2025-01-05  
- **Phase**: Beta
- **Version**: 0.1.0

---

**Built with ❤️ using SDD**