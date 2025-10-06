# 🧪 Guia de Testes - forge-sdd-toolkit v0.1.0

## ✅ Status da Publicação

- ✅ **Repositório**: https://github.com/4youtest-vsalmeida/forge-sdd-toolkit
- ✅ **Branch**: `main` (publicado)
- ✅ **Tag**: `v0.1.0` (criada)
- ✅ **Dist**: Pasta `dist/` incluída no repositório
- ✅ **Package.json**: Configurado corretamente
- ✅ **Documentação**: INSTALL.md criado

## 🚀 Testes de Instalação

### Teste Automático (Recomendado)

Execute o script de teste automático:

```bash
./TEST-INSTALLATION.sh
```

Este script irá:
1. ✅ Desinstalar versões anteriores
2. ✅ Instalar via GitHub
3. ✅ Verificar comando `forge-sdd`
4. ✅ Verificar versão (0.1.0)
5. ✅ Testar comando `init`
6. ✅ Testar comando `prompt`
7. ✅ Testar comando `template`
8. ✅ Validar estrutura criada

**Tempo estimado**: 2-3 minutos

---

### Teste Manual - Método 1: Instalação Global

```bash
# 1. Limpar instalação anterior (se houver)
npm uninstall -g forge-sdd-toolkit

# 2. Instalar via GitHub
npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git

# 3. Verificar instalação
forge-sdd --version
# Deve exibir: 0.1.0

# 4. Ver comandos disponíveis
forge-sdd --help
# Deve exibir: init, prompt, validate, template

# 5. Criar projeto de teste
mkdir ~/forge-test-global
cd ~/forge-test-global
forge-sdd init my-test-app

# 6. Verificar estrutura
ls -la my-test-app/
# Deve conter: prompts/, templates/, schemas/, docs/, README.md

# 7. Testar outros comandos
cd my-test-app
forge-sdd prompt ideate
forge-sdd template implementation-plan

# 8. Validar arquivos criados
ls -la docs/
```

**Resultado esperado**: Tudo deve funcionar sem erros.

---

### Teste Manual - Método 2: Uso com npx

```bash
# 1. Criar diretório de teste
mkdir ~/forge-test-npx
cd ~/forge-test-npx

# 2. Usar diretamente com npx (SEM instalação global)
npx git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git init my-npx-app

# 3. Verificar estrutura
ls -la my-npx-app/

# 4. Usar outros comandos
cd my-npx-app
npx git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git prompt ideate
npx git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git template specification
```

**Resultado esperado**: Funciona sem instalação global.

---

### Teste Manual - Método 3: Instalação de Tag Específica

```bash
# Instalar versão específica usando a tag
npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git#v0.1.0

# Verificar versão
forge-sdd --version
# Deve exibir: 0.1.0
```

**Resultado esperado**: Versão específica instalada corretamente.

---

## 🧪 Testes Funcionais

### Teste 1: CLI Básico

```bash
# Criar novo projeto
forge-sdd init test-functional
cd test-functional

# Verificar estrutura criada
echo "Verificando prompts..."
ls prompts/commands/
# Deve exibir: forge-ideate.md, forge-architect.md, forge-plan.md, etc.

echo "Verificando templates..."
ls templates/general/documents/
# Deve exibir: specification-template.md, ADD-template.md, etc.

echo "Verificando schemas..."
ls schemas/
# Deve exibir: specification.schema.json, ADD.schema.json, etc.
```

### Teste 2: Comando `prompt`

```bash
cd test-functional

# Testar cada estágio
forge-sdd prompt ideate > /tmp/prompt-ideate.txt
forge-sdd prompt architect > /tmp/prompt-architect.txt
forge-sdd prompt plan > /tmp/prompt-plan.txt
forge-sdd prompt implement > /tmp/prompt-implement.txt
forge-sdd prompt test > /tmp/prompt-test.txt
forge-sdd prompt operate > /tmp/prompt-operate.txt

# Verificar tamanho dos arquivos (devem ter conteúdo)
wc -l /tmp/prompt-*.txt
# Cada arquivo deve ter >100 linhas
```

### Teste 3: Comando `template`

```bash
cd test-functional

# Criar pasta docs se não existir
mkdir -p docs

# Copiar templates
forge-sdd template specification
forge-sdd template ADD
forge-sdd template implementation-plan
forge-sdd template test-plan
forge-sdd template issue-panel

# Verificar arquivos criados
ls -lh docs/
# Deve exibir vários arquivos .md com timestamps
```

### Teste 4: Comando `validate`

```bash
cd test-functional

# Criar um specification válido
cat > docs/test-spec.md << 'EOF'
---
schema: specification
version: 1.0.0
---

# Test Specification

## Overview
This is a test.

## User Stories
- As a user, I want to test validation

## Acceptance Criteria
- Validation passes

## Success Metrics
- 100% test coverage
EOF

# Validar arquivo
forge-sdd validate docs/test-spec.md
# Deve exibir: "✓ Validation successful"

# Testar com arquivo inválido
echo "invalid content" > docs/invalid.md
forge-sdd validate docs/invalid.md
# Deve exibir erro de validação
```

---

## 🎯 Checklist de Validação

Marque os itens conforme você testa:

### Instalação
- [ ] Script automático executou sem erros
- [ ] Instalação global funcionou
- [ ] Uso com npx funcionou
- [ ] Comando `forge-sdd` encontrado no PATH
- [ ] Versão 0.1.0 exibida corretamente
- [ ] Help exibe 4 comandos

### Comando `init`
- [ ] Cria estrutura de diretórios
- [ ] Copia todos os prompts (6 arquivos)
- [ ] Copia todos os templates (6 arquivos)
- [ ] Copia todos os schemas (5 arquivos)
- [ ] Gera README.md do projeto
- [ ] Não exibe erros

### Comando `prompt`
- [ ] `prompt ideate` exibe conteúdo
- [ ] `prompt architect` exibe conteúdo
- [ ] `prompt plan` exibe conteúdo
- [ ] `prompt implement` exibe conteúdo
- [ ] `prompt test` exibe conteúdo
- [ ] `prompt operate` exibe conteúdo
- [ ] Opção `--copy` funciona (se testado)

### Comando `template`
- [ ] `template specification` copia arquivo
- [ ] `template ADD` copia arquivo
- [ ] `template implementation-plan` copia arquivo
- [ ] `template test-plan` copia arquivo
- [ ] Arquivos têm timestamp no nome
- [ ] Conteúdo copiado está completo

### Comando `validate`
- [ ] Valida specification válido
- [ ] Valida ADD válido
- [ ] Valida implementation-plan válido
- [ ] Rejeita arquivos inválidos
- [ ] Exibe mensagens de erro claras

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"

**Causa**: Pasta `dist/` não foi incluída no repositório.

**Verificação**:
```bash
# Clone o repo e verifique
git clone https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git temp-check
cd temp-check
ls -la dist/
# Deve exibir: dist/structure/scripts/cli/forge-sdd.js
```

**Solução**: Se `dist/` não estiver presente, executar:
```bash
npm run build
git add dist/
git commit -m "chore: add dist/ for GitHub installation"
git push
```

### Erro: "Permission denied"

**Solução 1** (macOS/Linux):
```bash
sudo npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git
```

**Solução 2** (Sem sudo):
```bash
# Usar npx ao invés de instalação global
npx git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git init my-app
```

### Erro: "Command not found: forge-sdd"

**Verificação**:
```bash
# Ver onde npm instala globalmente
npm root -g
# Exemplo: /usr/local/lib/node_modules

# Ver binários instalados
npm list -g --depth=0 | grep forge
```

**Solução**:
```bash
# Reinstalar
npm uninstall -g forge-sdd-toolkit
npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git

# Ou usar npx
alias forge-sdd='npx git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git'
```

### Erro: "npm ERR! code ENOENT"

**Causa**: Arquivo `package.json` ou estrutura incorreta.

**Verificação**:
```bash
# Verificar conteúdo do repo
curl -s https://api.github.com/repos/4youtest-vsalmeida/forge-sdd-toolkit/contents/ | grep name
```

**Solução**: Verificar se o commit foi feito corretamente.

---

## 📊 Resultados Esperados

### Instalação Bem-Sucedida

```bash
$ forge-sdd --version
0.1.0

$ forge-sdd --help
Usage: forge-sdd [options] [command]

Forge SDD Toolkit - Specification-Driven Development for Atlassian Forge

Options:
  -V, --version        output the version number
  -h, --help           display help for command

Commands:
  init [project-name]  Initialize a new Forge SDD project
  prompt <stage>       Display a lifecycle stage prompt
  validate <file>      Validate a document against its schema
  template <type>      Copy a template to your project
  help [command]       display help for command
```

### Estrutura de Projeto Criada

```
my-app/
├── prompts/
│   ├── base/
│   │   ├── decision-framework.md
│   │   └── system-prompt.md
│   └── commands/
│       ├── forge-ideate.md
│       ├── forge-architect.md
│       ├── forge-plan.md
│       ├── forge-implement.md
│       ├── forge-test.md
│       └── forge-operate.md
├── templates/
│   ├── general/
│   │   └── documents/
│   │       ├── specification-template.md
│   │       ├── ADD-template.md
│   │       ├── implementation-plan-template.md
│   │       └── test-plan-template.md
│   └── forge-modules/
│       └── jira/
│           └── issue-panel-template.md
├── schemas/
│   ├── specification.schema.json
│   ├── ADD.schema.json
│   ├── implementation-plan.schema.json
│   ├── test-plan.schema.json
│   └── manifest-patch.schema.json
├── docs/
│   └── (vazio - para seus documentos)
└── README.md
```

---

## 📝 Relatório de Testes

Após completar os testes, preencha:

**Data do Teste**: _______________  
**Sistema Operacional**: _______________  
**Versão Node.js**: _______________  
**Versão npm**: _______________

**Método de Instalação Testado**:
- [ ] Global (npm install -g)
- [ ] npx
- [ ] Tag específica
- [ ] Clone local

**Comandos Testados**:
- [ ] `forge-sdd --version`
- [ ] `forge-sdd --help`
- [ ] `forge-sdd init`
- [ ] `forge-sdd prompt`
- [ ] `forge-sdd template`
- [ ] `forge-sdd validate`

**Problemas Encontrados**:
```
(Descreva qualquer erro ou comportamento inesperado)
```

**Status Geral**:
- [ ] ✅ Todos os testes passaram
- [ ] ⚠️ Alguns testes falharam (ver problemas acima)
- [ ] ❌ Instalação não funcionou

---

## 🎉 Próximos Passos

Após validação bem-sucedida:

1. **Criar Release no GitHub**:
   - Acesse: https://github.com/4youtest-vsalmeida/forge-sdd-toolkit/releases
   - Clique "Create a new release"
   - Tag: `v0.1.0` (já existe)
   - Title: `v0.1.0 - Initial Release`
   - Description: Copie de INSTALL.md a seção de features
   - Publish release

2. **Publicar no npm Registry** (Opcional):
   ```bash
   npm login
   npm publish
   ```
   - Benefício: Comando mais curto (`npx forge-sdd-toolkit`)
   - Tempo: 30 minutos

3. **Documentar Uso Real**:
   - Criar exemplo completo dos 6 estágios SDD
   - Gravar vídeo de demonstração
   - Escrever tutorial passo-a-passo

4. **Automatizar Testes**:
   - Criar GitHub Actions para CI/CD
   - Testes automáticos a cada commit
   - Release automática com tag

---

## 📚 Recursos

- **Repositório**: https://github.com/4youtest-vsalmeida/forge-sdd-toolkit
- **Instalação**: Ver `INSTALL.md`
- **Documentação**: Ver `README.md`
- **Issues**: https://github.com/4youtest-vsalmeida/forge-sdd-toolkit/issues

---

**Criado em**: 2025-01-05  
**Versão Testada**: v0.1.0  
**Status**: ✅ Pronto para Testes
