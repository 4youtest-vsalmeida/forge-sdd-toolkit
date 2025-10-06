# forge-sdd-toolkit# forge-sdd-toolkit# forge-sdd-toolkit# forge-sdd-toolkit



> **Specification-Driven Development** toolkit that transforms **natural language ideas** into **fully orchestrated Atlassian Forge apps** through a **6-stage lifecycle**.



[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)> **Specification-Driven Development** toolkit that transforms **natural language ideas** into **fully orchestrated Atlassian Forge apps** through a **6-stage lifecycle**.

[![Python 3.7+](https://img.shields.io/badge/python-3.7+-blue.svg)](https://www.python.org/downloads/)



## 🎯 What is SDD?

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)> **Specification-Driven Development** toolkit that transforms **natural language ideas** into **fully orchestrated Atlassian Forge apps** through a **6-stage lifecycle**.> **Specification-Driven Development Toolkit** para Atlassian Forge Apps

**Specification-Driven Development (SDD)** is a methodology where:

1. **Specifications drive everything** - Code is generated from specs, never written manually[![Python 3.7+](https://img.shields.io/badge/python-3.7+-blue.svg)](https://www.python.org/downloads/)

2. **Natural language is the source of truth** - Users describe WHAT, not HOW

3. **Six lifecycle stages must be followed sequentially** - Never skip stages

4. **Every decision traces back to requirements** - Full traceability

## 🎯 What is SDD?

## 🔄 The 6-Stage Lifecycle

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

```

IDEATE → ARCHITECT → PLAN → IMPLEMENT → TEST → OPERATE**Specification-Driven Development (SDD)** is a methodology where:

```

1. **Specifications drive everything** - Code is generated from specs, never written manually[![Python 3.7+](https://img.shields.io/badge/python-3.7+-blue.svg)](https://www.python.org/downloads/)[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

1. **IDEATE** → Transform ideas into formal specifications

2. **ARCHITECT** → Make all technical decisions (modules, UI, scopes)2. **Natural language is the source of truth** - Users describe WHAT, not HOW

3. **PLAN** → Break down into tasks and backlog

4. **IMPLEMENT** → Generate working code3. **Six lifecycle stages must be followed sequentially** - Never skip stages[![Version](https://img.shields.io/badge/version-0.1.0-orange)](./CHANGELOG.md)

5. **TEST** → Create comprehensive test suites

6. **OPERATE** → Setup deployment and monitoring4. **Every decision traces back to requirements** - Full traceability



## 🚀 Quick Start## 🎯 What is SDD?[![Install](https://img.shields.io/badge/install-npm%20|%20git-red)](./INSTALL.md)



### Installation## 🔄 The 6-Stage Lifecycle



#### Option 1: Using uv (Recommended - Fast! ⚡)



```bash```

# Install from GitHub

uv tool install git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkitIDEATE → ARCHITECT → PLAN → IMPLEMENT → TEST → OPERATE**Specification-Driven Development (SDD)** is a methodology where:Toolkit de **context engineering** que transforma a **ideação do usuário em linguagem natural** na **orquestração e execução automática** do ciclo de vida completo de apps **Atlassian Forge** — desde **especificação** até **operação** — tomando **decisões Forge-aware** de forma **autônoma**.



# Or install from local directory (for development/contribution)```

cd forge-sdd-toolkit

uv tool install --editable .1. **Specifications drive everything** - Code is generated from specs, never written manually



# Verify1. **IDEATE** → Transform ideas into formal specifications

forge-sdd --help

```2. **ARCHITECT** → Make all technical decisions (modules, UI, scopes)2. **Natural language is the source of truth** - Users describe WHAT, not HOW```bash



**Why uv?**3. **PLAN** → Break down into tasks and backlog

- ⚡ 10-100x faster than pip

- 🔒 Better dependency resolution4. **IMPLEMENT** → Generate working code3. **Six lifecycle stages must be followed sequentially** - Never skip stages# Instalação rápida via GitHub

- 🎯 No virtualenv needed for tools

- 📦 Single binary5. **TEST** → Create comprehensive test suites



#### Option 2: Using pip6. **OPERATE** → Setup deployment and monitoring4. **Every decision traces back to requirements** - Full traceabilitynpm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git



```bash

# Install from GitHub

pip install git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit## 🚀 Quick Start



# Or install from local directory (for development)

cd forge-sdd-toolkit

pip install --editable .### Installation## 🔄 The 6-Stage Lifecycle# Ou uso direto

```



#### Need help with installation?

#### Option 1: Using uv (Recommended - Fast! ⚡)npx git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git init my-app

```bash

forge-sdd install  # Shows detailed installation guide

```

```bash``````

### Usage

# Install with uv directly from GitHub

```bash

# Initialize a new projectuv tool install git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkitIDEATE → ARCHITECT → PLAN → IMPLEMENT → TEST → OPERATE

forge-sdd init my-forge-app



# Navigate to project

cd my-forge-app# Verify installation```---



# Open in VS Codeforge-sdd --help

code .

``````



### Start with GitHub Copilot



1. Open GitHub Copilot Chat (Cmd/Ctrl + I)#### Option 2: Using pip1. **IDEATE** → Transform ideas into formal specifications## 🎯 O Problema

2. Type: `@forge-ideate`

3. Describe your Forge app idea:

   ```

   I want to build a Jira app that shows GitHub PR status in issue panels```bash2. **ARCHITECT** → Make all technical decisions (modules, UI, scopes)

   ```

4. Follow the prompts through each lifecycle stage# Install with pip directly from GitHub



## 📋 Example Workflowpip install git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit3. **PLAN** → Break down into tasks and backlogDesenvolver apps Atlassian Forge é complexo:



```bash

# Stage 1: IDEATE - Transform idea into specification

@forge-ideate# Verify installation4. **IMPLEMENT** → Generate working code- ❌ **Curva de aprendizado íngreme**: Módulos, APIs, limitações da plataforma

I need an app that tracks technical debt in Confluence pages

forge-sdd --help

# Output: docs/specification-document.md

``````5. **TEST** → Create comprehensive test suites- ❌ **Decisões arquiteturais difíceis**: UI Kit vs Custom UI? Qual módulo usar?



```bash

# Stage 2: ARCHITECT - Make technical decisions

@forge-architect#### Option 3: Install Script (Legacy)6. **OPERATE** → Setup deployment and monitoring- ❌ **Falta de rastreabilidade**: Código desconectado dos requisitos originais



# Output: docs/ADD.md (Architecture Decision Document)

```

```bash- ❌ **Processo inconsistente**: Desenvolvedores pulam etapas críticas

```bash

# Stage 3: PLAN - Create implementation plan# Quick install using the install script

@forge-plan

curl -fsSL https://raw.githubusercontent.com/4youtest-vsalmeida/forge-sdd-toolkit/main/install.sh | bash## 🚀 Quick Start

# Output: docs/implementation-plan.md

``````



```bash## ✨ A Solução: SDD (Specification-Driven Development)

# Stage 4: IMPLEMENT - Generate code

@forge-implement### Usage



# Output: src/, manifest.yml, package.json### Installation

```

```bash

```bash

# Stage 5: TEST - Create test suite# Initialize a new projectO **forge-sdd-toolkit** implementa uma metodologia sistemática de **6 estágios obrigatórios**:

@forge-test

forge-sdd init my-forge-app

# Output: tests/

``````bash



```bash# Navigate to project

# Stage 6: OPERATE - Setup deployment

@forge-operatecd my-forge-app# Quick install```mermaid



# Output: .github/workflows/, monitoring configs

```

# Open in VS Codecurl -fsSL https://raw.githubusercontent.com/4youtest-vsalmeida/forge-sdd-toolkit/main/install.sh | bashgraph LR

## 🏗️ Architecture: 3-Level System

code .

### Level 1 - Prompts (Orchestrators)

High-level orchestrators that manage the complete flow through the 6 stages.```    I[🎯 IDEATE] -->|Specification| A[🏗️ ARCHITECT]

Located in `.github/prompts/*.prompt.md`



### Level 2 - Templates (Knowledge Base)

Structured knowledge base for Forge patterns, modules, and best practices.### Start with GitHub Copilot# Or manual install    A -->|ADD| P[📋 PLAN]

Located in `.forge-sdd/templates/`



### Level 3 - Specializations (Expert Implementations)

Ultra-specific expertise for each Forge module use case.1. Open GitHub Copilot Chat (Cmd/Ctrl + I)git clone https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git ~/.forge-sdd-toolkit    P -->|Backlog| IM[💻 IMPLEMENT]

Referenced from templates as needed.

2. Type: `@forge-ideate`

## 🎯 Why SDD for Forge?

3. Describe your Forge app idea:chmod +x ~/.forge-sdd-toolkit/bin/forge-sdd    IM -->|Code| T[🧪 TEST]

### Traditional Approach

```   ```

Developer → Reads docs → Writes code → Debugs → Fixes scopes → Redeploys

```   I want to build a Jira app that shows GitHub PR status in issue panelsmkdir -p ~/.local/bin    T -->|Tests| O[🚀 OPERATE]



### SDD Approach   ```

```

User → Describes idea → System generates:4. Follow the prompts through each lifecycle stageln -s ~/.forge-sdd-toolkit/bin/forge-sdd ~/.local/bin/forge-sdd    

  ✓ Specification

  ✓ Architecture decisions

  ✓ Implementation plan

  ✓ Working code## 📋 Example Workflow```    style I fill:#e8f5e9

  ✓ Test suite

  ✓ Deployment config

```

```bash    style A fill:#fff3cd

## 🔑 Key Features

# Stage 1: IDEATE - Transform idea into specification

- **Forge-First Thinking**: Aware of platform limitations (25s timeout, Node.js sandbox)

- **Smart Module Selection**: Chooses the right Forge module for your use case@forge-ideate### Usage    style P fill:#fce4ec

- **UI Kit vs Custom UI**: Makes informed decisions based on requirements

- **Scope Optimization**: Requests only minimum necessary permissionsI need an app that tracks technical debt in Confluence pages

- **Full Traceability**: Every code line traces back to requirements

- **Quality Gates**: Validation between each lifecycle stage    style IM fill:#e3f2fd



## 🔧 For Contributors# Output: docs/specification-document.md



### Development Installation``````bash    style T fill:#f3e5ff



```bash

# Clone the repository

git clone https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git```bash# Initialize a new project    style O fill:#ffe0b2

cd forge-sdd-toolkit

# Stage 2: ARCHITECT - Make technical decisions

# Install in editable mode with uv (changes reflect immediately)

uv tool install --editable .@forge-architectforge-sdd init my-forge-app```



# Or with pip

pip install --editable .

# Output: docs/ADD.md (Architecture Decision Document)

# Test your changes

forge-sdd init test-project```

```

# Navigate to project### De Ideia a App Deployado

### Project Structure

```bash

```

forge-sdd-toolkit/# Stage 3: PLAN - Create implementation plancd my-forge-app

├── src/

│   └── forge_sdd_toolkit/  # Python package@forge-plan

│       ├── __init__.py

│       └── cli.py          # CLI implementation```bash

├── structure/

│   ├── prompts/           # Stage orchestrators# Output: docs/implementation-plan.md

│   │   ├── commands/      # forge-ideate.md, forge-architect.md, etc.

│   │   └── base/          # system-prompt.md, decision-framework.md```# Open in VS Code# Input: Linguagem natural

│   ├── templates/         # Knowledge base (60+ templates)

│   └── schemas/           # Validation schemas

├── pyproject.toml         # Python package config

├── MANIFEST.in            # File inclusion rules```bashcode ."Preciso de um painel em Jira que mostre status de PRs do Bitbucket"

└── .github/

    ├── prompts/           # GitHub Copilot prompts# Stage 4: IMPLEMENT - Generate code

    └── copilot-instructions.md

```@forge-implement```



## 📚 Documentation



- [Installation Guide](INSTALL.md) - Detailed installation instructions# Output: src/, manifest.yml, package.json# Processo automático

- [Setup Guide](SETUP.md) - Development setup and contribution guide

- [SDD Methodology](.github/SDD_METHODOLOGY.md) *(coming soon)*```

- [Lifecycle Stages](.github/LIFECYCLE_STAGES.md) *(coming soon)*

### Start with GitHub Copilotforge-ideate     # → Gera especificação formal

## 🎓 Learn More

```bash

- [Atlassian Forge Platform](https://developer.atlassian.com/platform/forge/)

- [GitHub Copilot](https://github.com/features/copilot)# Stage 5: TEST - Create test suiteforge-architect  # → Decide: jira:issuePanel + Custom UI + APIs necessárias

- [uv Package Manager](https://github.com/astral-sh/uv)

- [SDD Methodology](https://github.com/4youtest-vsalmeida/forge-sdd-toolkit/wiki)@forge-test



## 📝 License1. Open GitHub Copilot Chat (Cmd/Ctrl + I)forge-plan       # → Cria backlog com tarefas priorizadas



MIT License - see [LICENSE](LICENSE) for details# Output: tests/



## 👤 Author```2. Type: `@forge-ideate`forge-implement  # → Gera código TypeScript funcional



**Vinicius Almeida (VSALMEID)**

- GitHub: [@4youtest-vsalmeida](https://github.com/4youtest-vsalmeida)

```bash3. Describe your Forge app idea:forge-test       # → Cria suite de testes

## 🌟 Status

# Stage 6: OPERATE - Setup deployment

- **Created**: 2025-01-05

- **Updated**: 2025-10-06@forge-operate   ```forge-operate    # → Prepara deployment

- **Phase**: Beta

- **Version**: 0.2.0



---# Output: .github/workflows/, monitoring configs   I want to build a Jira app that shows GitHub PR status in issue panels



**Built with ❤️ using SDD**```


   ```# Output: App Forge pronto para produção

## 🏗️ Architecture: 3-Level System

4. Follow the prompts through each lifecycle stage```

### Level 1 - Prompts (Orchestrators)

High-level orchestrators that manage the complete flow through the 6 stages.

Located in `.github/prompts/*.prompt.md`

## 📋 Example Workflow---

### Level 2 - Templates (Knowledge Base)

Structured knowledge base for Forge patterns, modules, and best practices.

Located in `.forge-sdd/templates/`

```bash## 🏗️ Arquitetura: 3 Níveis

### Level 3 - Specializations (Expert Implementations)

Ultra-specific expertise for each Forge module use case.# Stage 1: IDEATE - Transform idea into specification

Referenced from templates as needed.

@forge-ideate### Nível 1: **Prompts** (Orquestradores)

## 🎯 Why SDD for Forge?

I need an app that tracks technical debt in Confluence pagesGerenciam o fluxo através dos 6 estágios do ciclo de vida.

### Traditional Approach

```

Developer → Reads docs → Writes code → Debugs → Fixes scopes → Redeploys

```# Output: docs/specification-document.md```



### SDD Approach```structure/prompts/

```

User → Describes idea → System generates:├── base/

  ✓ Specification

  ✓ Architecture decisions```bash│   ├── system-prompt.md          # Instruções fundamentais

  ✓ Implementation plan

  ✓ Working code# Stage 2: ARCHITECT - Make technical decisions│   └── decision-framework.md     # Matrizes de decisão

  ✓ Test suite

  ✓ Deployment config@forge-architect└── commands/

```

    ├── forge-ideate.md           # Ideia → Especificação

## 🔑 Key Features

# Output: docs/ADD.md (Architecture Decision Document)    ├── forge-architect.md        # Especificação → ADD

- **Forge-First Thinking**: Aware of platform limitations (25s timeout, Node.js sandbox)

- **Smart Module Selection**: Chooses the right Forge module for your use case```    ├── forge-plan.md             # ADD → Backlog

- **UI Kit vs Custom UI**: Makes informed decisions based on requirements

- **Scope Optimization**: Requests only minimum necessary permissions    ├── forge-implement.md        # Backlog → Código

- **Full Traceability**: Every code line traces back to requirements

- **Quality Gates**: Validation between each lifecycle stage```bash    ├── forge-test.md             # Código → Testes



## 📚 Documentation# Stage 3: PLAN - Create implementation plan    └── forge-operate.md          # Testes → Deployment



- [Setup Guide](SETUP.md)@forge-plan```

- [SDD Methodology](.github/SDD_METHODOLOGY.md) *(coming soon)*

- [Lifecycle Stages](.github/LIFECYCLE_STAGES.md) *(coming soon)*

- [Contributing](CONTRIBUTING.md) *(coming soon)*

# Output: docs/implementation-plan.md### Nível 2: **Templates** (Base de Conhecimento)

## 🔧 For Contributors

```Padrões reutilizáveis para módulos, documentos e código Forge.

See [SETUP.md](SETUP.md) for development setup instructions.



The toolkit structure:

``````bash```

forge-sdd-toolkit/

├── src/# Stage 4: IMPLEMENT - Generate codestructure/templates/

│   └── forge_sdd_toolkit/  # Python package

│       ├── __init__.py@forge-implement├── general/

│       └── cli.py          # CLI implementation

├── bin/forge-sdd           # Standalone script (legacy)│   ├── documents/               # Specification, ADD, Plans

├── install.sh              # Installation script (legacy)

├── structure/# Output: src/, manifest.yml, package.json│   ├── code/                    # Padrões de código

│   ├── prompts/           # Stage orchestrators

│   ├── templates/         # Knowledge base```│   ├── manifests/               # manifest.yml templates

│   └── schemas/           # Validation schemas

├── pyproject.toml         # Python package config│   └── snippets/                # Code snippets comuns

└── .github/

    ├── prompts/           # GitHub Copilot prompts```bash└── forge-modules/

    └── copilot-instructions.md

```# Stage 5: TEST - Create test suite    ├── jira/                    # Padrões Jira-específicos



## 🎓 Learn More@forge-test    ├── confluence/              # Padrões Confluence



- [Atlassian Forge Platform](https://developer.atlassian.com/platform/forge/)    ├── bitbucket/               # Padrões Bitbucket

- [GitHub Copilot](https://github.com/features/copilot)

- [uv Package Manager](https://github.com/astral-sh/uv)# Output: tests/    └── ...                      # Outros produtos

- [SDD Methodology](https://github.com/4youtest-vsalmeida/forge-sdd-toolkit/wiki)

``````

## 📝 License



MIT License - see [LICENSE](LICENSE) for details

```bash### Nível 3: **Specializations** (Expertise Ultra-Específica)

## 👤 Author

# Stage 6: OPERATE - Setup deploymentImplementações completas para casos de uso reais.

**Vinicius Almeida (VSALMEID)**

- GitHub: [@4youtest-vsalmeida](https://github.com/4youtest-vsalmeida)@forge-operate



## 🌟 Status```



- **Created**: 2025-01-05# Output: .github/workflows/, monitoring configsstructure/specializations/

- **Phase**: Beta

- **Version**: 0.2.0```├── jira/



---│   ├── issue-panel/             # jira:issuePanel patterns



**Built with ❤️ using SDD**## 🏗️ Architecture: 3-Level System│   ├── workflow-triggers/       # Automation triggers


│   └── custom-fields/           # Custom field implementations

### Level 1 - Prompts (Orchestrators)├── confluence/

High-level orchestrators that manage the complete flow through the 6 stages.│   └── macros/

Located in `.github/prompts/*.prompt.md`│       ├── static-macros/       # Static content macros

│       └── dynamic-macros/      # Dynamic/interactive macros

### Level 2 - Templates (Knowledge Base)└── cross-product/

Structured knowledge base for Forge patterns, modules, and best practices.    └── jira-confluence-sync/    # Multi-product integrations

Located in `.forge-sdd/templates/````



### Level 3 - Specializations (Expert Implementations)---

Ultra-specific expertise for each Forge module use case.

Referenced from templates as needed.## 🚀 Quick Start



## 🎯 Why SDD for Forge?### Instalação



### Traditional Approach#### Método 1: Instalação via GitHub (Recomendado para Testes)

```

Developer → Reads docs → Writes code → Debugs → Fixes scopes → Redeploys```bash

```# Instalação global

npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git

### SDD Approach

```# Ou uso direto com npx (sem instalação)

User → Describes idea → System generates:npx git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git init my-app

  ✓ Specification```

  ✓ Architecture decisions

  ✓ Implementation plan#### Método 2: Instalação via npm (Quando publicado)

  ✓ Working code

  ✓ Test suite```bash

  ✓ Deployment config# Instalação global

```npm install -g forge-sdd-toolkit



## 🔑 Key Features# Ou uso direto com npx

npx forge-sdd-toolkit init my-app

- **Forge-First Thinking**: Aware of platform limitations (25s timeout, Node.js sandbox)```

- **Smart Module Selection**: Chooses the right Forge module for your use case

- **UI Kit vs Custom UI**: Makes informed decisions based on requirements#### Método 3: Clone e Build Local

- **Scope Optimization**: Requests only minimum necessary permissions

- **Full Traceability**: Every code line traces back to requirements```bash

- **Quality Gates**: Validation between each lifecycle stage# Clone o repositório

git clone https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git

## 📚 Documentationcd forge-sdd-toolkit



- [Setup Guide](SETUP.md)# Instale dependências e build

- [SDD Methodology](.github/SDD_METHODOLOGY.md) *(coming soon)*npm install

- [Lifecycle Stages](.github/LIFECYCLE_STAGES.md) *(coming soon)*npm run build

- [Contributing](CONTRIBUTING.md) *(coming soon)*

# Use localmente

## 🔧 For Contributorsnpm link

```

See [SETUP.md](SETUP.md) for development setup instructions.

📖 **Guia completo de instalação**: Veja [INSTALL.md](./INSTALL.md) para instruções detalhadas, troubleshooting e testes.

The toolkit structure:

```### Verificação da Instalação

forge-sdd-toolkit/

├── bin/forge-sdd           # Python CLI script```bash

├── install.sh              # Installation script# Verificar versão

├── structure/forge-sdd --version

│   ├── prompts/           # Stage orchestrators# Deve exibir: 0.1.0

│   ├── templates/         # Knowledge base

│   └── schemas/           # Validation schemas# Ver comandos disponíveis

└── .github/forge-sdd --help

    ├── prompts/           # GitHub Copilot prompts```

    └── copilot-instructions.md

```### Uso Básico



## 🎓 Learn More#### 0️⃣ **INIT**: Criar novo projeto SDD



- [Atlassian Forge Platform](https://developer.atlassian.com/platform/forge/)```bash

- [GitHub Copilot](https://github.com/features/copilot)# Criar estrutura de projeto

- [SDD Methodology](https://github.com/4youtest-vsalmeida/forge-sdd-toolkit/wiki)forge-sdd init my-forge-app

cd my-forge-app

## 📝 License

# Estrutura criada:

MIT License - see [LICENSE](LICENSE) for details# my-forge-app/

#   ├── prompts/        # Prompts dos 6 estágios SDD

## 👤 Author#   ├── templates/      # Templates de documentos

#   ├── schemas/        # JSON Schemas para validação

**Vinicius Almeida (VSALMEID)**#   ├── docs/           # Documentação do projeto

- GitHub: [@4youtest-vsalmeida](https://github.com/4youtest-vsalmeida)#   └── README.md       # Guia de uso

```

## 🌟 Status

#### 1️⃣ **IDEATE**: Transforme sua ideia em especificação

- **Created**: 2025-01-05

- **Phase**: Beta```bash

- **Version**: 0.2.0# Exibir prompt do estágio IDEATE

forge-sdd prompt ideate

---

# Copiar prompt para clipboard

**Built with ❤️ using SDD**forge-sdd prompt ideate --copy

```

**Processo**:
1. Cole o prompt no GitHub Copilot Chat
2. Descreva seu app em linguagem natural
3. Copilot gera `docs/specification-document.md`
4. Valide: `forge-sdd validate docs/specification-document.md`

#### 2️⃣ **ARCHITECT**: Receba decisões técnicas automáticas

```bash
forge-sdd prompt architect --copy
```

**Processo**:
1. Cole prompt + specification no Copilot
2. Copilot analisa requisitos e decide módulos Forge
3. Gera `docs/architecture-decision-document.md` (ADD)
4. Valide: `forge-sdd validate docs/architecture-decision-document.md`

#### 3️⃣ **PLAN**: Obtenha backlog priorizado

```bash
forge-sdd prompt plan --copy
```

**Processo**:
1. Cole prompt + specification + ADD no Copilot
2. Copilot quebra em épicos, stories e tasks
3. Gera `docs/implementation-plan.md`
4. Valide: `forge-sdd validate docs/implementation-plan.md`

#### 4️⃣ **IMPLEMENT**: Gere código funcional

```bash
forge-sdd prompt implement --copy
```

**Processo**:
1. Cole prompt + todos os documentos anteriores
2. Copilot gera código TypeScript/JavaScript
3. Cria manifest.yml, handlers, UI components
4. Código tem rastreabilidade completa (REQ-XXX → TASK-XXX)

#### 5️⃣ **TEST**: Crie suite de testes

```bash
forge-test
```

**Input**: Specification + Código  
**Output**: Testes unitários e de integração

#### 6️⃣ **OPERATE**: Prepare deployment

```bash
forge-operate
```

**Input**: App completo  
**Output**: Scripts de deployment, documentação de operação

---

## 📖 Metodologia SDD

### Princípios Fundamentais

1. **Especificação é a Fonte da Verdade**
   - Todo código rastreia até um requisito
   - Mudanças começam atualizando a especificação

2. **Ciclo de Vida Sequencial Obrigatório**
   - NUNCA pule estágios
   - Cada estágio valida o anterior

3. **Decisões Forge-Aware Automáticas**
   - Toolkit conhece limitações da plataforma
   - Sugere melhores práticas automaticamente

4. **Rastreabilidade Total**
   ```typescript
   /**
    * REQ-001: Display PR status
    * STORY-1.2: As a developer, I want to see PR checks
    * ADD-MODULE-001: Use jira:issuePanel
    * TASK-456: Implement PR status fetch
    */
   ```

### Quality Gates

Cada transição de estágio possui validações:

| Transição | Validações |
|-----------|-----------|
| IDEATE → ARCHITECT | ✓ User stories completas<br>✓ Acceptance criteria definidos<br>✓ Success metrics medíveis |
| ARCHITECT → PLAN | ✓ Todos os módulos selecionados<br>✓ Decisão UI tomada<br>✓ APIs identificadas |
| PLAN → IMPLEMENT | ✓ Todas as stories quebradas em tasks<br>✓ Dependências mapeadas |
| IMPLEMENT → TEST | ✓ Código implementado<br>✓ Documentação inline completa |
| TEST → OPERATE | ✓ Todos os testes passing<br>✓ Coverage > 80% |

---

## 🛠️ Features da v0.1

### ✅ Implementado

- [x] Estrutura de 3 níveis (Prompts, Templates, Specializations)
- [x] 6 prompts de orquestração do ciclo de vida
- [x] System prompt e decision framework
- [x] Schemas de validação JSON
- [x] Templates de documentos (Specification, ADD, Plans)
- [x] CLI básico para todos os estágios

### 🚧 Roadmap v0.2

- [ ] Templates completos para todos os módulos Forge
- [ ] Specializations para top 10 casos de uso
- [ ] Validação automática de manifests
- [ ] Geração de código com templates
- [ ] Suite de testes automatizada
- [ ] Integração CI/CD

---

## 📚 Documentação

### Essencial
- [**SDD Methodology**](./.github/SDD_METHODOLOGY.md) - Entenda a metodologia completa
- [**Lifecycle Stages**](./.github/LIFECYCLE_STAGES.md) - Detalhes de cada estágio
- [**Contributing**](./structure/docs/CONTRIBUTING.md) - Como contribuir seguindo SDD

### Referência
- [**Prompt System**](./structure/prompts/README.md) - Como os prompts funcionam
- [**Template Library**](./structure/templates/README.md) - Biblioteca de templates
- [**Specializations Guide**](./structure/specializations/README.md) - Expertise específica

### ADRs (Architecture Decision Records)
- [ADR-001: Three-Level Architecture](./structure/docs/ADR/001-three-level-architecture.md)
- [ADR-002: SDD Methodology Adoption](./structure/docs/ADR/002-sdd-methodology.md)

---

## 🎓 Exemplo Completo

### Cenário: Issue Panel com Status de PRs

```bash
# 1. Ideação
$ forge-ideate
> Descreva seu app: "Painel em Jira mostrando PRs do Bitbucket com checks"
✓ specification-document.md criado

# 2. Arquitetura
$ forge-architect
✓ Decisões tomadas:
  - Módulo: jira:issuePanel
  - UI: Custom UI (interatividade necessária)
  - APIs: Bitbucket REST + Jira Properties
  - Storage: Cache 5 minutos

# 3. Planejamento
$ forge-plan
✓ Backlog criado: 3 épicos, 12 stories, 45 tasks

# 4. Implementação
$ forge-implement
✓ Código gerado:
  - src/index.tsx (Custom UI)
  - src/api/bitbucket.ts
  - manifest.yml

# 5. Testes
$ forge-test
✓ 28 testes criados, coverage 94%

# 6. Operação
$ forge-operate
✓ Deployment scripts prontos
✓ Documentação de operação gerada
```

**Tempo total**: ~30 minutos (vs 2-3 dias manualmente)

---

## 🤝 Como Contribuir

Este projeto segue rigorosamente a metodologia SDD. Para contribuir:

1. **Leia a documentação**: [CONTRIBUTING.md](./structure/docs/CONTRIBUTING.md)
2. **Siga os 6 estágios**: Mesmo para features do toolkit
3. **Mantenha rastreabilidade**: Todo código rastreia a um requisito
4. **Documente decisões**: Use ADRs para escolhas arquiteturais

```bash
# Exemplo de contribuição seguindo SDD
1. Crie issue descrevendo o problema (IDEATE)
2. Discuta arquitetura na issue (ARCHITECT)
3. Crie PR draft com plano (PLAN)
4. Implemente seguindo o plano (IMPLEMENT)
5. Adicione testes (TEST)
6. Documente deployment/uso (OPERATE)
```

---

## 📊 Status do Projeto

**Versão Atual**: v0.1.0 (Foundation Release)

| Componente | Status | Coverage |
|-----------|--------|----------|
| Core Prompts | ✅ Complete | 100% |
| Base Templates | 🚧 In Progress | 60% |
| Jira Specializations | 🚧 In Progress | 40% |
| Confluence Specializations | 📅 Planned | 0% |
| CLI Tools | ✅ Complete | 100% |
| Validation System | 🚧 In Progress | 70% |
| Documentation | ✅ Complete | 100% |

---

## 👤 Autor

**VSALMEID**
- GitHub: [@vsalmeid](https://github.com/vsalmeid)
- Criador da metodologia SDD para Forge

---

## 📄 Licença

Este projeto é licenciado sob a [MIT License](./LICENSE).

---

## 🙏 Agradecimentos

- **Atlassian Forge Team**: Pela plataforma incrível
- **SDD Community**: Pelos insights e feedback
- **Early Adopters**: Por testarem e refinarem o toolkit

---

## 📞 Suporte

- 🐛 **Issues**: [GitHub Issues](https://github.com/vsalmeid/forge-sdd-toolkit/issues)
- 📖 **Documentação**: [GitHub Wiki](https://github.com/vsalmeid/forge-sdd-toolkit/wiki)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/vsalmeid/forge-sdd-toolkit/discussions)

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

**Made with ❤️ following Specification-Driven Development**

</div>
