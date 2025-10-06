# Initial Project Setup

## Directory Structure to Create

```bash
# Run these commands to create the initial structure

mkdir -p forge-sdd-toolkit/structure/prompts/commands
mkdir -p forge-sdd-toolkit/structure/prompts/base
mkdir -p forge-sdd-toolkit/structure/scripts/cli
mkdir -p forge-sdd-toolkit/structure/scripts/validations
mkdir -p forge-sdd-toolkit/structure/scripts/utils
mkdir -p forge-sdd-toolkit/structure/schemas
mkdir -p forge-sdd-toolkit/structure/templates/general/documents
mkdir -p forge-sdd-toolkit/structure/templates/general/code
mkdir -p forge-sdd-toolkit/structure/templates/general/manifests
mkdir -p forge-sdd-toolkit/structure/templates/general/snippets
mkdir -p forge-sdd-toolkit/structure/templates/general/references
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/automation/configs
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/automation/validations
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/automation/snippets
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/automation/examples
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/automation/references
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/bitbucket
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/common
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/compass
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/confluence
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/dashboard
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/jira
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/jira-service-management
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/jira-software
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/rovo
mkdir -p forge-sdd-toolkit/structure/templates/forge-modules/teamwork-graph
mkdir -p forge-sdd-toolkit/structure/specializations/jira/issue-panel
mkdir -p forge-sdd-toolkit/structure/specializations/jira/workflow-triggers
mkdir -p forge-sdd-toolkit/structure/specializations/jira/dashboard-gadgets
mkdir -p forge-sdd-toolkit/structure/specializations/jira/custom-fields
mkdir -p forge-sdd-toolkit/structure/specializations/jira/project-pages
mkdir -p forge-sdd-toolkit/structure/specializations/confluence/macros/static-macros
mkdir -p forge-sdd-toolkit/structure/specializations/confluence/macros/dynamic-macros
mkdir -p forge-sdd-toolkit/structure/specializations/confluence/space-pages
mkdir -p forge-sdd-toolkit/structure/specializations/confluence/content-actions
mkdir -p forge-sdd-toolkit/structure/specializations/confluence/content-byline-items
mkdir -p forge-sdd-toolkit/structure/specializations/bitbucket/pull-request-checks
mkdir -p forge-sdd-toolkit/structure/specializations/bitbucket/repository-hooks
mkdir -p forge-sdd-toolkit/structure/specializations/jira-service-management/customer-portals
mkdir -p forge-sdd-toolkit/structure/specializations/jira-service-management/automation-rules
mkdir -p forge-sdd-toolkit/structure/specializations/cross-product/jira-confluence-sync
mkdir -p forge-sdd-toolkit/structure/specializations/cross-product/unified-search
mkdir -p forge-sdd-toolkit/structure/docs/ADR
mkdir -p forge-sdd-toolkit/.github/workflows
mkdir -p forge-sdd-toolkit/.github/ISSUE_TEMPLATE
mkdir -p forge-sdd-toolkit/.github/PULL_REQUEST_TEMPLATE

# Create placeholder files
touch forge-sdd-toolkit/README.md
touch forge-sdd-toolkit/CHANGELOG.md
touch forge-sdd-toolkit/LICENSE
touch forge-sdd-toolkit/structure/docs/CONTRIBUTING.md
touch forge-sdd-toolkit/structure/schemas/prompt.schema.json
touch forge-sdd-toolkit/structure/schemas/manifest-patch.schema.json
```

## Initial README.md Content

```markdown
# forge-sdd-toolkit

Toolkit de **context engineering** que transforma a **ideação do usuário em linguagem natural** na **orquestração e execução automática** do ciclo de vida de apps **Atlassian Forge** — **especificação, arquitetura, planejamento, backlog, implementação, testes e operação** — tanto em **projetos existentes** quanto na **criação de novos**, tomando **decisões Forge-aware** (**módulos**, **UI Kit vs Custom UI**, **escopos**) de forma **autônoma**.

## 🎯 Metodologia: Specification-Driven Development (SDD)

Este toolkit segue rigorosamente o SDD, onde:
1. **Especificações dirigem tudo** - Código é gerado a partir de specs
2. **6 estágios obrigatórios** - IDEATE → ARCHITECT → PLAN → IMPLEMENT → TEST → OPERATE
3. **Rastreabilidade completa** - Todo artefato rastreia até a intenção original

## 📚 Estrutura

- **`structure/prompts/`** - Orquestradores de ciclo de vida
- **`structure/templates/`** - Base de conhecimento Forge
- **`structure/specializations/`** - Implementações ultra-específicas

## 🚀 Quick Start

1. Comece sempre com IDEATE: `forge-ideate`
2. Siga sequencialmente os estágios
3. Nunca pule etapas

## 📖 Documentação

- [SDD Methodology](.github/SDD_METHODOLOGY.md)
- [Lifecycle Stages](.github/LIFECYCLE_STAGES.md)
- [Contributing](structure/docs/CONTRIBUTING.md)

## 👤 Autor

- **VSALMEID** - Creator and Maintainer

## 📅 Status

- **Created**: 2025-01-05
- **Phase**: Initial Structure Definition
- **Version**: 0.1.0
```