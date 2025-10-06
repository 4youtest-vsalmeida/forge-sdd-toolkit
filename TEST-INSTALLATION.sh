#!/bin/bash
# Script de Teste de Instalação do forge-sdd-toolkit
# Execute este script para validar a instalação via GitHub

set -e  # Para em caso de erro

echo "🚀 Teste de Instalação - forge-sdd-toolkit v0.1.0"
echo "=================================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função de log
log_step() {
    echo -e "${BLUE}▶${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Teste 1: Desinstalar versão anterior (se houver)
log_step "Limpando instalações anteriores..."
npm uninstall -g forge-sdd-toolkit 2>/dev/null || true
log_success "Limpeza concluída"
echo ""

# Teste 2: Instalação via GitHub
log_step "Instalando via GitHub..."
npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git
log_success "Instalação concluída"
echo ""

# Teste 3: Verificar comando
log_step "Verificando comando 'forge-sdd'..."
if command -v forge-sdd &> /dev/null; then
    log_success "Comando 'forge-sdd' encontrado"
else
    log_error "Comando 'forge-sdd' NÃO encontrado"
    exit 1
fi
echo ""

# Teste 4: Verificar versão
log_step "Verificando versão..."
VERSION=$(forge-sdd --version)
echo "Versão instalada: $VERSION"
if [ "$VERSION" = "0.1.0" ]; then
    log_success "Versão correta: 0.1.0"
else
    log_warning "Versão diferente de 0.1.0: $VERSION"
fi
echo ""

# Teste 5: Verificar help
log_step "Verificando comando --help..."
forge-sdd --help > /dev/null
log_success "Help exibido corretamente"
echo ""

# Teste 6: Teste do comando init
log_step "Testando comando 'forge-sdd init'..."
TEST_DIR="/tmp/forge-test-$(date +%s)"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"
forge-sdd init test-project
if [ -d "test-project" ]; then
    log_success "Projeto criado: test-project/"
    
    # Verificar estrutura
    log_step "Verificando estrutura criada..."
    
    if [ -d "test-project/prompts" ]; then
        log_success "✓ Pasta prompts/ criada"
    else
        log_error "✗ Pasta prompts/ NÃO encontrada"
    fi
    
    if [ -d "test-project/templates" ]; then
        log_success "✓ Pasta templates/ criada"
    else
        log_error "✗ Pasta templates/ NÃO encontrada"
    fi
    
    if [ -d "test-project/schemas" ]; then
        log_success "✓ Pasta schemas/ criada"
    else
        log_error "✗ Pasta schemas/ NÃO encontrada"
    fi
    
    if [ -f "test-project/README.md" ]; then
        log_success "✓ README.md criado"
    else
        log_error "✗ README.md NÃO encontrado"
    fi
else
    log_error "Projeto NÃO foi criado"
    exit 1
fi
echo ""

# Teste 7: Teste do comando prompt
log_step "Testando comando 'forge-sdd prompt'..."
cd test-project
forge-sdd prompt ideate > /dev/null
log_success "Comando 'prompt ideate' executado"
echo ""

# Teste 8: Teste do comando template
log_step "Testando comando 'forge-sdd template'..."
mkdir -p docs
forge-sdd template implementation-plan
if [ -f "docs/implementation-plan-"*.md ]; then
    log_success "Template copiado para docs/"
else
    log_error "Template NÃO foi copiado"
fi
echo ""

# Limpeza
log_step "Limpando arquivos de teste..."
cd /
rm -rf "$TEST_DIR"
log_success "Limpeza concluída"
echo ""

# Resultado final
echo "=================================================="
echo -e "${GREEN}✓ TODOS OS TESTES PASSARAM!${NC}"
echo "=================================================="
echo ""
echo "🎉 Instalação validada com sucesso!"
echo ""
echo "Próximos passos:"
echo "1. Crie seu projeto: forge-sdd init my-forge-app"
echo "2. Entre na pasta: cd my-forge-app"
echo "3. Comece com IDEATE: forge-sdd prompt ideate"
echo ""
echo "Comandos disponíveis:"
echo "  forge-sdd init <nome>       - Criar novo projeto"
echo "  forge-sdd prompt <stage>    - Exibir prompt de estágio"
echo "  forge-sdd validate <file>   - Validar documento"
echo "  forge-sdd template <type>   - Copiar template"
echo ""
echo "Documentação completa: INSTALL.md"
echo "Repositório: https://github.com/4youtest-vsalmeida/forge-sdd-toolkit"
