# 🧪 Como Testa```
projeto-teste/
├── .github/
│   └── prompts/              # ← Prompts para GitHub Copilot
│       ├── forge-ideate.prompt.md       # ← @forge-ideate
│       ├── forge-architect.prompt.md    # ← @forge-architect
│       ├── forge-plan.prompt.md         # ← @forge-plan
│       ├── forge-implement.prompt.md    # ← @forge-implement
│       ├── forge-test.prompt.md         # ← @forge-test
│       ├── forge-operate.prompt.md      # ← @forge-operate
│       └── _base/                       # ← Prompts de referência
│           ├── system-prompt.md
│           └── decision-framework.md
├── .vscode/
│   └── settings.json         # ← Instruções base do Copilot
├── docs/                     # ← Documentos gerados vão aqui
├── schemas/                  # ← Validação de documentos
├── templates/                # ← Templates disponíveis
├── specializations/          # ← Exemplos de referência
└── README.md                 # ← Guia do usuário
```t

## Problema Resolvido

Para que os **slash commands** do GitHub Copilot funcionem, os prompts precisam estar em `.github/prompts/`. 

Não podemos colocar essa estrutura no workspace de desenvolvimento do toolkit (evita conflitos), então criamos um **script de inicialização** que copia tudo para a estrutura correta em um projeto separado.

## ✅ Solução Implementada

### Script: `scripts/init-test-project.sh`

Este script cria um projeto de teste completo com:

```
projeto-teste/
├── .github/
│   └── prompts/              # ← Prompts para slash commands
│       ├── base/
│       │   ├── system-prompt.md
│       │   └── decision-framework.md
│       └── commands/
│           ├── forge-ideate.md
│           ├── forge-architect.md
│           ├── forge-plan.md
│           ├── forge-implement.md
│           ├── forge-test.md
│           └── forge-operate.md
├── .vscode/
│   └── settings.json         # ← Configuração dos slash commands
├── docs/                     # ← Documentos gerados vão aqui
├── schemas/                  # ← JSON Schemas para validação
├── templates/                # ← Templates de documentos e módulos
├── specializations/          # ← Exemplos de implementação
└── README.md                 # ← Guia do usuário final
```

## 🚀 Como Usar

### 1. Executar o Script

```bash
# Do diretório do toolkit
./scripts/init-test-project.sh ~/meu-projeto-forge
```

Ou de qualquer lugar:

```bash
/caminho/para/toolkit/scripts/init-test-project.sh /destino/projeto
```

### 2. Abrir no VS Code

```bash
code ~/meu-projeto-forge
```

### 3. Testar os Prompts do Copilot

No GitHub Copilot Chat, você terá 6 prompts disponíveis quando digitar `@`:

#### `@forge-ideate` - Criar Especificação
```
@forge-ideate

Preciso de um painel em Jira que mostre o status de PRs do GitHub
associados ao issue. Deve mostrar:
- Nome do PR
- Status (open, merged, closed)
- Aprovações
- Checks do CI/CD
```

#### `@forge-architect` - Decisões Técnicas
```
@forge-architect
```

Copilot irá:
- Analisar a especificação
- Decidir módulo Forge (jira:issuePanel)
- Escolher UI Kit vs Custom UI
- Definir APIs necessárias
- Criar `docs/architecture-decision-document.md`

#### `@forge-plan` - Criar Backlog
```
@forge-plan
```

Copilot irá:
- Quebrar em épicos
- Criar user stories
- Definir tasks com estimativas
- Criar `docs/implementation-plan.md`

#### `@forge-implement` - Gerar Código
```
@forge-implement
```

Copilot irá:
- Gerar manifest.yml
- Criar handlers (index.js)
- Criar componentes UI
- Adicionar comentários de rastreabilidade (REQ-XXX → TASK-XXX)

#### `@forge-test` - Criar Testes
```
@forge-test
```

Copilot irá:
- Criar suite de testes
- Testes unitários
- Testes de integração
- Cada teste rastreia para um requisito

#### `@forge-operate` - Deployment
```
@forge-operate
```

Copilot irá:
- Criar guia de deployment
- Configurações de ambiente
- Monitoramento
- Troubleshooting

## 📁 Estrutura de Arquivos Gerados

Após executar os comandos, você terá:

```
meu-projeto-forge/
├── .github/
│   └── prompts/              # (já copiado pelo script)
├── docs/
│   ├── specification-document.md          # ← /forge-ideate
│   ├── architecture-decision-document.md  # ← /forge-architect
│   ├── implementation-plan.md             # ← /forge-plan
│   ├── test-plan.md                       # ← /forge-test
│   └── operations-guide.md                # ← /forge-operate
├── src/
│   ├── manifest.yml                       # ← /forge-implement
│   ├── index.js                           # ← /forge-implement
│   └── components/                        # ← /forge-implement
├── tests/                                 # ← /forge-test
└── README.md
```

## 🧪 Exemplo Completo de Teste

### Cenário: Jira Issue Panel com GitHub PR Status

```bash
# 1. Criar projeto de teste
./scripts/init-test-project.sh ~/jira-pr-panel-test

# 2. Abrir no VS Code
code ~/jira-pr-panel-test

# 3. No Copilot Chat - IDEATE
@workspace /forge-ideate

Preciso de um Jira Issue Panel que mostre PRs do GitHub.

**Requisitos**:
- Exibir lista de PRs linkados ao issue
- Status visual (verde=merged, amarelo=open, vermelho=conflicts)
- Botão para abrir PR no GitHub
- Auto-refresh a cada 30 segundos
- Suporte a múltiplos repositórios

**Usuários**:
- Desenvolvedores: Ver status dos PRs
- PMs: Verificar progresso

**Limitações**:
- Funcionar em Jira Cloud
- Timeout de 25 segundos
- Rate limits do GitHub API

# 4. Copilot gera docs/specification-document.md

# 5. ARCHITECT
@workspace /forge-architect

# 6. Copilot analisa e decide:
# - Módulo: jira:issuePanel
# - UI: Custom UI React (para UX rica)
# - APIs: @forge/api (fetch), GitHub REST API
# - Storage: Forge Storage para cache
# Gera docs/architecture-decision-document.md

# 7. PLAN
@workspace /forge-plan

# 8. Copilot cria backlog completo em docs/implementation-plan.md

# 9. IMPLEMENT
@workspace /forge-implement

# 10. Copilot gera:
# - manifest.yml com jira:issuePanel
# - src/index.js (handlers)
# - src/components/PRPanel.jsx
# - src/services/github-api.js
# - Código completo e funcional

# 11. TEST
@workspace /forge-test

# 12. Copilot cria:
# - tests/unit/github-api.test.js
# - tests/integration/pr-panel.test.js
# - docs/test-plan.md

# 13. OPERATE
@workspace /forge-operate

# 14. Copilot cria:
# - docs/operations-guide.md
# - Instruções de deployment
# - Configuração de secrets (GitHub token)
```

## ✅ Validação

### Verificar Prompts Disponíveis

1. Abra o GitHub Copilot Chat
2. Digite `@` e comece a digitar "forge"
3. Deve ver autocomplete com:
   - `@forge-ideate`
   - `@forge-architect`
   - `@forge-plan`
   - `@forge-implement`
   - `@forge-test`
   - `@forge-operate`

**Importante**: Os prompts aparecem automaticamente porque os arquivos têm extensão `.prompt.md` e estão em `.github/prompts/`

### Verificar Estrutura de Arquivos

```bash
cd ~/meu-projeto-forge

# Verificar prompts (RAIZ com extensão .prompt.md)
ls -la .github/prompts/
# Deve ter:
# - forge-ideate.prompt.md
# - forge-architect.prompt.md
# - forge-plan.prompt.md
# - forge-implement.prompt.md
# - forge-test.prompt.md
# - forge-operate.prompt.md
# - _base/ (diretório com prompts de referência)

# Verificar VS Code config
cat .vscode/settings.json
# Deve ter github.copilot.chat.codeGeneration.instructions

# Verificar schemas
ls -la schemas/
# Deve ter 5 .json files

# Verificar templates
ls -la templates/
# Deve ter general/ e forge-modules/
```

## 🐛 Troubleshooting

### Prompts não aparecem no Copilot Chat

**Causa**: Arquivos não têm extensão `.prompt.md` ou não estão na raiz de `.github/prompts/`

**Verificação**:
```bash
# Os prompts DEVEM estar assim:
ls -la .github/prompts/forge-*.prompt.md
# Devem existir 6 arquivos
```

**Solução**: Se os arquivos estão em subdiretórios ou sem extensão correta, mova-os:
```bash
cd .github/prompts/
mv commands/forge-ideate.md ./forge-ideate.prompt.md
# Repetir para todos os prompts
```

### Documentos não são validados

**Causa**: Schemas não foram copiados

**Solução**:
```bash
# Copiar schemas manualmente
cp ~/Desktop/files/structure/schemas/*.json ~/meu-projeto-forge/schemas/
```

## 📊 Diferença: Toolkit vs Projeto Final

| Aspecto | Toolkit (Development) | Projeto Final (User) |
|---------|----------------------|---------------------|
| **Localização dos Prompts** | `structure/prompts/` | `.github/prompts/` |
| **Slash Commands** | ❌ Não configurados | ✅ Configurados |
| **Propósito** | Desenvolver o toolkit | Usar o toolkit para criar apps |
| **Estrutura** | Complexa (dev) | Simplificada (user) |
| **Documentação** | Para contributors | Para usuários finais |

## 🎯 Casos de Uso

### Caso 1: Testar Novos Prompts

```bash
# 1. Editar prompt no toolkit
vim structure/prompts/commands/forge-ideate.md

# 2. Recriar projeto de teste
rm -rf ~/forge-test-app
./scripts/init-test-project.sh ~/forge-test-app

# 3. Testar no VS Code
code ~/forge-test-app
# Use @workspace /forge-ideate
```

### Caso 2: Demonstração para Cliente

```bash
# 1. Criar projeto demo
./scripts/init-test-project.sh ~/demo-forge-sdd

# 2. Preparar exemplo
cd ~/demo-forge-sdd
code .

# 3. Na demonstração, mostrar:
# - Slash commands no Copilot Chat
# - Geração automática de specs
# - Geração automática de código
```

### Caso 3: Desenvolvimento Real

```bash
# 1. Criar projeto real
./scripts/init-test-project.sh ~/my-real-forge-app

# 2. Inicializar git
cd ~/my-real-forge-app
git init
git add .
git commit -m "chore: initialize with forge-sdd-toolkit"

# 3. Seguir 6 estágios SDD
# - IDEATE → spec
# - ARCHITECT → ADD
# - PLAN → backlog
# - IMPLEMENT → código
# - TEST → testes
# - OPERATE → deployment

# 4. Deploy no Forge
forge register
forge deploy
```

## 📝 Próximos Passos

Após validar que tudo funciona:

1. **Melhorar o CLI** (se necessário):
   - Adicionar comando `forge-sdd init` que usa este script
   - Publicar no npm
   - Simplificar instalação

2. **Automatizar Testes**:
   - CI/CD que roda este script
   - Valida slash commands
   - Testa geração de documentos

3. **Criar Tutorial em Vídeo**:
   - Gravar demonstração completa
   - Mostrar os 6 estágios
   - Exemplo real do início ao fim

4. **Publicar Exemplos**:
   - Criar repositório de exemplos
   - Apps completos gerados com toolkit
   - Diferentes casos de uso

## 🔗 Recursos

- **Script**: `scripts/init-test-project.sh`
- **Toolkit**: https://github.com/4youtest-vsalmeida/forge-sdd-toolkit
- **Atlassian Forge**: https://developer.atlassian.com/platform/forge/

---

**Criado**: 2025-01-05  
**Atualizado**: 2025-01-05  
**Versão**: 1.0.0
