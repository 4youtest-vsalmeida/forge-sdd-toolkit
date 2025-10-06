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

# Copiar prompts para .github/prompts/ (RAIZ, com extensão .prompt.md)
echo -e "${BLUE}▶${NC} Copiando prompts para .github/prompts/..."

# Copiar cada prompt renomeando para .prompt.md
for prompt_file in "$TOOLKIT_ROOT/structure/prompts/commands"/*.md; do
    filename=$(basename "$prompt_file" .md)
    cp "$prompt_file" "$TARGET_DIR/.github/prompts/${filename}.prompt.md"
done

# Copiar prompts base (para referência interna, não são slash commands)
mkdir -p "$TARGET_DIR/.github/prompts/_base"
cp "$TOOLKIT_ROOT/structure/prompts/base"/*.md "$TARGET_DIR/.github/prompts/_base/"

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
      "file": ".github/prompts/_base/system-prompt.md"
    }
  ]
}
EOF

# Nota: Slash commands personalizados não são mais suportados no VS Code.
# O GitHub Copilot agora usa automaticamente arquivos .prompt.md em .github/prompts/
# quando você digita @ no chat. Basta ter os arquivos com extensão .prompt.md
# na raiz de .github/prompts/ e eles aparecerão automaticamente.

# Resumo
echo ""
echo "============================================================"
echo -e "${GREEN}✓ Projeto inicializado com sucesso!${NC}"
echo "============================================================"
echo ""
echo -e "${BLUE}📁 Estrutura criada em:${NC} $TARGET_DIR"
echo ""
echo -e "${GREEN}✓${NC} Prompts copiados para .github/prompts/ (com extensão .prompt.md)"
echo -e "${GREEN}✓${NC} Schemas copiados para schemas/"
echo -e "${GREEN}✓${NC} Templates copiados para templates/"
echo -e "${GREEN}✓${NC} VS Code configurado"
echo ""
echo -e "${BLUE}🎯 Próximos passos:${NC}"
echo ""
echo "1. Abra o projeto no VS Code:"
echo -e "   ${YELLOW}code $TARGET_DIR${NC}"
echo ""
echo "2. Abra o GitHub Copilot Chat"
echo ""
echo "3. Digite @ para ver os prompts disponíveis:"
echo -e "   ${YELLOW}@forge-ideate${NC} - Criar especificação"
echo -e "   ${YELLOW}@forge-architect${NC} - Decisões técnicas"
echo -e "   ${YELLOW}@forge-plan${NC} - Criar backlog"
echo -e "   ${YELLOW}@forge-implement${NC} - Gerar código"
echo -e "   ${YELLOW}@forge-test${NC} - Criar testes"
echo -e "   ${YELLOW}@forge-operate${NC} - Deployment"
echo ""
echo "4. Ou comece descrevendo seu app diretamente:"
echo -e "   ${YELLOW}\"Preciso de um painel em Jira que mostre status de PRs\"${NC}"
echo ""
echo -e "${BLUE}💡 Dica:${NC} Os arquivos .prompt.md aparecem automaticamente quando você"
echo "    digita @ no Copilot Chat. Não precisa configurar slash commands!"
echo ""
echo -e "${BLUE}📚 Documentação:${NC} Ver README.md no projeto"
echo ""
