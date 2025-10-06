#!/bin/bash
# Script para inicializar um projeto de teste do forge-sdd-toolkit
# Este script copia os arquivos para a estrutura correta para uso com GitHub Copilot

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Forge SDD Toolkit - Inicializador de Projeto de Teste${NC}"
echo "============================================================"
echo ""

# Verificar argumentos
if [ -z "$1" ]; then
    echo -e "${YELLOW}Uso: $0 <diretório-destino>${NC}"
    echo ""
    echo "Exemplo:"
    echo "  $0 ~/meu-forge-app"
    echo "  $0 /path/to/test-project"
    exit 1
fi

TARGET_DIR="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOOLKIT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${BLUE}▶${NC} Diretório de destino: $TARGET_DIR"
echo -e "${BLUE}▶${NC} Toolkit source: $TOOLKIT_ROOT"
echo ""

# Criar estrutura de diretórios
echo -e "${BLUE}▶${NC} Criando estrutura de diretórios..."
mkdir -p "$TARGET_DIR/.github/prompts"
mkdir -p "$TARGET_DIR/docs"
mkdir -p "$TARGET_DIR/schemas"
mkdir -p "$TARGET_DIR/templates/general/documents"
mkdir -p "$TARGET_DIR/templates/forge-modules"

# Copiar prompts para .github/prompts/ (para slash commands)
echo -e "${BLUE}▶${NC} Copiando prompts para .github/prompts/..."
cp -r "$TOOLKIT_ROOT/structure/prompts/base" "$TARGET_DIR/.github/prompts/"
cp -r "$TOOLKIT_ROOT/structure/prompts/commands" "$TARGET_DIR/.github/prompts/"

# Copiar schemas
echo -e "${BLUE}▶${NC} Copiando schemas..."
cp "$TOOLKIT_ROOT/structure/schemas"/*.json "$TARGET_DIR/schemas/"
cp "$TOOLKIT_ROOT/structure/schemas/README.md" "$TARGET_DIR/schemas/" 2>/dev/null || true

# Copiar templates
echo -e "${BLUE}▶${NC} Copiando templates..."
cp -r "$TOOLKIT_ROOT/structure/templates/general"/* "$TARGET_DIR/templates/general/"
cp -r "$TOOLKIT_ROOT/structure/templates/forge-modules"/* "$TARGET_DIR/templates/forge-modules/" 2>/dev/null || true

# Copiar specializations (como referência)
echo -e "${BLUE}▶${NC} Copiando specializations..."
mkdir -p "$TARGET_DIR/specializations"
cp -r "$TOOLKIT_ROOT/structure/specializations"/* "$TARGET_DIR/specializations/" 2>/dev/null || true

# Copiar documentação
echo -e "${BLUE}▶${NC} Copiando documentação..."
cp "$TOOLKIT_ROOT/README.md" "$TARGET_DIR/" 2>/dev/null || true
cp "$TOOLKIT_ROOT/INSTALL.md" "$TARGET_DIR/" 2>/dev/null || true

# Criar README personalizado para o projeto
cat > "$TARGET_DIR/README.md" << 'EOF'
# Forge App Project - SDD Methodology

Este projeto foi inicializado com **forge-sdd-toolkit** e segue a metodologia **Specification-Driven Development (SDD)**.

## 🎯 Metodologia SDD - 6 Estágios Obrigatórios

```
IDEATE → ARCHITECT → PLAN → IMPLEMENT → TEST → OPERATE
```

## 📁 Estrutura do Projeto

```
.
├── .github/
│   └── prompts/              # Prompts para GitHub Copilot (slash commands)
│       ├── base/             # Sistema de decisão e prompts base
│       └── commands/         # Prompts dos 6 estágios SDD
├── docs/                     # Documentos gerados (specs, ADD, plans)
├── schemas/                  # JSON Schemas para validação
├── templates/                # Templates de documentos e módulos
├── specializations/          # Exemplos específicos de implementação
└── src/                      # Código-fonte do app Forge (você criará)
```

## 🚀 Como Usar

### 1️⃣ IDEATE - Criar Especificação

No GitHub Copilot Chat, use o slash command:

```
@workspace /forge-ideate
```

Ou cole o conteúdo de `.github/prompts/commands/forge-ideate.md` e descreva seu app.

**Output**: `docs/specification-document.md`

### 2️⃣ ARCHITECT - Decisões Técnicas

```
@workspace /forge-architect
```

**Input**: Specification document  
**Output**: `docs/architecture-decision-document.md` (ADD)

### 3️⃣ PLAN - Criar Backlog

```
@workspace /forge-plan
```

**Input**: Specification + ADD  
**Output**: `docs/implementation-plan.md`

### 4️⃣ IMPLEMENT - Gerar Código

```
@workspace /forge-implement
```

**Input**: Specification + ADD + Plan  
**Output**: Código TypeScript/JavaScript em `src/`

### 5️⃣ TEST - Criar Testes

```
@workspace /forge-test
```

**Input**: Todos os documentos + código  
**Output**: Suite de testes

### 6️⃣ OPERATE - Deployment

```
@workspace /forge-operate
```

**Input**: Todos os artefatos  
**Output**: Guias de deployment e operação

## 📋 Templates Disponíveis

Copie templates de `templates/` para `docs/` conforme necessário:

- `specification-template.md` - Template de especificação
- `ADD-template.md` - Template de Architecture Decision Document
- `implementation-plan-template.md` - Template de plano de implementação
- `test-plan-template.md` - Template de plano de testes

## 🔍 Validação de Documentos

Os documentos podem ser validados contra JSON Schemas em `schemas/`:

- `specification.schema.json`
- `ADD.schema.json`
- `implementation-plan.schema.json`
- `test-plan.schema.json`

## 📚 Exemplos

Veja `specializations/` para exemplos completos de implementação:

- **Jira Issue Panel com GitHub PR Status**: Exemplo completo de integração

## 🎓 Princípios SDD

1. **Specifications drive code** - Código é gerado a partir de specs
2. **Follow the lifecycle** - Nunca pule estágios
3. **Full traceability** - Cada linha de código rastreia até requisito
4. **Context accumulation** - Cada estágio usa contexto dos anteriores
5. **Forge-aware decisions** - Decisões técnicas baseadas em conhecimento profundo de Forge

## 🔗 Recursos

- **Atlassian Forge**: https://developer.atlassian.com/platform/forge/
- **Forge SDD Toolkit**: https://github.com/4youtest-vsalmeida/forge-sdd-toolkit

---

**Próximo passo**: Execute `@workspace /forge-ideate` e descreva o app que deseja criar! 🚀
EOF

# Criar .gitignore se não existir
if [ ! -f "$TARGET_DIR/.gitignore" ]; then
    cat > "$TARGET_DIR/.gitignore" << 'EOF'
# Dependencies
node_modules/
package-lock.json

# Build
dist/
*.tsbuildinfo

# Environment
.env
.env.local

# IDE
.vscode/*
!.vscode/settings.json
.idea/

# OS
.DS_Store

# Forge
.forge/
EOF
fi

# Criar .vscode/settings.json para habilitar slash commands
echo -e "${BLUE}▶${NC} Configurando VS Code para slash commands..."
mkdir -p "$TARGET_DIR/.vscode"
cat > "$TARGET_DIR/.vscode/settings.json" << 'EOF'
{
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "file": ".github/prompts/base/system-prompt.md"
    }
  ],
  "github.copilot.chat.slashCommands": [
    {
      "command": "forge-ideate",
      "description": "IDEATE: Transform idea into formal specification",
      "prompt": ".github/prompts/commands/forge-ideate.md"
    },
    {
      "command": "forge-architect",
      "description": "ARCHITECT: Make technical decisions based on specification",
      "prompt": ".github/prompts/commands/forge-architect.md"
    },
    {
      "command": "forge-plan",
      "description": "PLAN: Create implementation backlog from architecture",
      "prompt": ".github/prompts/commands/forge-plan.md"
    },
    {
      "command": "forge-implement",
      "description": "IMPLEMENT: Generate code from plan",
      "prompt": ".github/prompts/commands/forge-implement.md"
    },
    {
      "command": "forge-test",
      "description": "TEST: Create test suite from implementation",
      "prompt": ".github/prompts/commands/forge-test.md"
    },
    {
      "command": "forge-operate",
      "description": "OPERATE: Create deployment and operations guide",
      "prompt": ".github/prompts/commands/forge-operate.md"
    }
  ]
}
EOF

# Resumo
echo ""
echo "============================================================"
echo -e "${GREEN}✓ Projeto inicializado com sucesso!${NC}"
echo "============================================================"
echo ""
echo -e "${BLUE}📁 Estrutura criada em:${NC} $TARGET_DIR"
echo ""
echo -e "${GREEN}✓${NC} Prompts copiados para .github/prompts/"
echo -e "${GREEN}✓${NC} Schemas copiados para schemas/"
echo -e "${GREEN}✓${NC} Templates copiados para templates/"
echo -e "${GREEN}✓${NC} Slash commands configurados no VS Code"
echo ""
echo -e "${BLUE}🎯 Próximos passos:${NC}"
echo ""
echo "1. Abra o projeto no VS Code:"
echo -e "   ${YELLOW}code $TARGET_DIR${NC}"
echo ""
echo "2. Inicie o GitHub Copilot Chat"
echo ""
echo "3. Use os slash commands:"
echo -e "   ${YELLOW}@workspace /forge-ideate${NC} - Criar especificação"
echo -e "   ${YELLOW}@workspace /forge-architect${NC} - Decisões técnicas"
echo -e "   ${YELLOW}@workspace /forge-plan${NC} - Criar backlog"
echo -e "   ${YELLOW}@workspace /forge-implement${NC} - Gerar código"
echo -e "   ${YELLOW}@workspace /forge-test${NC} - Criar testes"
echo -e "   ${YELLOW}@workspace /forge-operate${NC} - Deployment"
echo ""
echo "4. Ou comece descrevendo seu app:"
echo -e "   ${YELLOW}\"Preciso de um painel em Jira que mostre status de PRs\"${NC}"
echo ""
echo -e "${BLUE}📚 Documentação:${NC} Ver README.md no projeto"
echo ""
