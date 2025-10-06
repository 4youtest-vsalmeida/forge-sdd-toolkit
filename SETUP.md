# forge-sdd-toolkit Setup

## For Users (Installing the CLI)

### Option 1: Using uv (Recommended ⚡)

```bash
# Install directly from GitHub with uv
uv tool install git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit

# Verify installation
forge-sdd --help

# Start using
forge-sdd init my-forge-app
```

**Why uv?**
- ⚡ **10-100x faster** than pip
- 🔒 **Better dependency resolution**
- 🎯 **Simpler installation** - no virtual envs needed for tools
- 📦 **Lightweight** - single binary

### Option 2: Using pip

```bash
# Install directly from GitHub with pip
pip install git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit

# Verify installation
forge-sdd --help
```

### Option 3: Install Script (Legacy)

```bash
# Quick install
curl -fsSL https://raw.githubusercontent.com/4youtest-vsalmeida/forge-sdd-toolkit/main/install.sh | bash
```

### Option 4: Manual Install (Legacy)

```bash
# Clone repository
git clone https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git ~/.forge-sdd-toolkit

# Make CLI executable
chmod +x ~/.forge-sdd-toolkit/bin/forge-sdd

# Add to PATH
mkdir -p ~/.local/bin
ln -s ~/.forge-sdd-toolkit/bin/forge-sdd ~/.local/bin/forge-sdd

# Add ~/.local/bin to PATH (if not already)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc  # or ~/.bashrc
source ~/.zshrc
```

### Usage

```bash
# Initialize a new SDD project
forge-sdd init my-forge-app

# Navigate to project
cd my-forge-app

# Open in VS Code
code .

# Start with GitHub Copilot
# Type: @forge-ideate
# Describe your Forge app idea
```

---

## For Contributors (Development Setup)

### Directory Structure

The toolkit has the following structure:

```
forge-sdd-toolkit/
├── bin/
│   └── forge-sdd              # Python CLI script
├── install.sh                 # Installation script
├── structure/
│   ├── prompts/
│   │   ├── commands/          # Stage prompts (forge-ideate.md, etc.)
│   │   └── base/              # Base prompts (system-prompt.md, etc.)
│   ├── templates/             # Forge knowledge base
│   ├── specializations/       # Use-case specific implementations
│   └── schemas/               # JSON schemas
└── .github/
    ├── prompts/               # GitHub Copilot prompts (for development)
    └── copilot-instructions.md
```

### Testing the CLI Locally

```bash
# Clone the repository
git clone https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git
cd forge-sdd-toolkit

# Make CLI executable
chmod +x bin/forge-sdd

# Test it
python bin/forge-sdd init test-app

# Or add to PATH for local testing
mkdir -p ~/.local/bin
ln -sf $(pwd)/bin/forge-sdd ~/.local/bin/forge-sdd
forge-sdd init test-app
```

### How the CLI Works

The `bin/forge-sdd` Python script:
1. Reads toolkit files from `structure/`
2. Copies stage prompts to `.github/prompts/*.prompt.md`
3. Copies base prompts to `.github/prompts/_base/`
4. Transforms relative paths:
   - `../base/` → `_base/`
   - `../../templates/` → `../.forge-sdd/templates/`
5. Copies templates to `.forge-sdd/templates/`
6. Copies schemas to `.forge-sdd/schemas/`
7. Generates README, .gitignore, .vscode/settings.json

### Adding New Stage Prompts

1. Create file in `structure/prompts/commands/forge-{stage}.md`
2. Follow YAML frontmatter format
3. Use relative paths (`../base/`, `../../templates/`)
4. Test with `forge-sdd init test-app`
5. Verify paths transformed correctly in `.github/prompts/`

---

## Initial Directory Creation (for contributors)

```bash
# Create initial structure
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