# 🔧 Correção: Uso de Templates Oficiais do Forge CLI

**Data**: 2025-01-06  
**Issue**: Durante testes locais, identificado que prompts estavam instruindo criação manual de estrutura  
**Prioridade**: CRÍTICA  
**Status**: ✅ Corrigido

---

## 🐛 Problema Identificado

Durante testes locais da fase de implementação, o usuário reportou que:

> "na fase de implementação ao invés de executar o comando forge create -t template-name appname ele esta tentando criar na mão a estrutura do projeto, e isso não é uma boa pratica"

### Comportamento Incorreto

O prompt `forge-implement.md` estava instruindo:

```bash
# ❌ ERRADO
forge create

# Setup directory structure per ADD
mkdir -p src/{resolvers,ui,utils,types}
mkdir -p test/{unit,integration}

npm install
```

Isso fazia com que Copilot gerasse código para criar estrutura manualmente, ao invés de usar templates oficiais.

### Por Que Isso É Problemático?

1. **Inconsistência**: Estrutura criada manualmente pode não seguir padrões
2. **Erros**: Falta de arquivos essenciais (manifest incorreto, build config)
3. **Manutenção**: Estrutura customizada dificulta debug e atualizações
4. **Comunidade**: Não segue convenções da comunidade Forge
5. **Boilerplate**: Perde exemplos e configurações dos templates oficiais

---

## ✅ Solução Implementada

### 1. Atualizado `forge-implement.md`

**Antes** (linhas 55-73):
```markdown
## Step 1: Setup Project Structure

Start with TASK-1.1.1 (usually project setup):

```bash
forge create
mkdir -p src/{resolvers,ui,utils,types}
...
```

**Depois** (linhas 55-138):
```markdown
## Step 1: Setup Project Structure

**CRITICAL**: Always use official Forge templates with `forge create`. Never create structure manually.

### 1.1 Choose Correct Template

Based on ADD Decision #2 (UI approach), select the appropriate template:

| ADD Decision | Forge Template | Command |
|--------------|----------------|---------|
| UI Kit only | `jira-issue-panel` | `forge create --template jira-issue-panel my-app` |
| Custom UI (React) | `jira-issue-panel-ui-kit-custom-ui` | `forge create --template jira-issue-panel-ui-kit-custom-ui my-app` |
...

### 1.2 Create Project from Template

```bash
forge create --template jira-issue-panel-ui-kit-custom-ui my-forge-app
```

### 1.3 Customize Generated Files
...
```

**Mudanças Principais**:
- ✅ Adicionado aviso CRITICAL no topo
- ✅ Tabela de seleção de templates baseada em ADD
- ✅ Instruções passo-a-passo claras
- ✅ Exemplo de customização pós-template
- ✅ Link para documentação oficial

### 2. Atualizado `forge-architect.md`

Adicionado **Step 3.5: Select Forge CLI Template** após decisão de UI:

```markdown
### Decision: Forge CLI Template

**Chosen Template**: `template-name`

**Template Mapping**:
| Module + UI | Template Command | Why |
|-------------|-----------------|-----|
| Issue Panel + UI Kit | `forge create --template jira-issue-panel` | Simple panels |
| Issue Panel + Custom UI | `forge create --template jira-issue-panel-ui-kit-custom-ui` | Rich interactions |
...

**Implementation Command**:
```bash
forge create --template [chosen-template] [app-name-from-spec]
```
```

**Por quê?**:
- Arquiteto deve decidir template durante fase de arquitetura
- Implementador só executa o comando documentado
- Rastreabilidade: decisão de template está no ADD

### 3. Criado ADR-004

Documentado formalmente a decisão em:
```
docs/adr/ADR-004-always-use-forge-templates.md
```

**Conteúdo**:
- Contexto e problema
- Decisão tomada (sempre usar templates)
- Matriz de seleção de templates
- Consequências positivas/negativas
- Checklist de implementação

### 4. Criado Guia de Melhores Práticas

Documento completo em:
```
docs/best-practices/forge-project-setup.md
```

**Conteúdo** (12KB, 500+ linhas):
- Por que usar templates
- Catálogo completo de templates
- Workflow recomendado
- Padrões de customização
- Troubleshooting comum
- Anti-patterns a evitar
- Flowchart de decisão

---

## 📊 Impacto da Correção

### Antes da Correção

```bash
# Usuário executa: @forge-implement

# Copilot gera:
mkdir -p src/resolvers src/ui src/utils
touch manifest.yml
npm init -y
# ... código manual de setup
```

**Problemas**:
- ❌ Estrutura incorreta
- ❌ Manifest inválido
- ❌ Sem exemplos
- ❌ Sem build config

### Depois da Correção

```bash
# Usuário executa: @forge-implement

# Copilot gera:
forge create --template jira-issue-panel-ui-kit-custom-ui my-app
cd my-app
npm install

# Customiza manifest.yml per ADD...
# Adiciona dependências per ADD...
# Implementa features...
```

**Benefícios**:
- ✅ Estrutura oficial
- ✅ Manifest válido
- ✅ Código exemplo
- ✅ Build funcional
- ✅ TypeScript configurado
- ✅ Testes prontos

---

## 🎯 Templates Disponíveis

### Jira

| Template | Quando Usar |
|----------|-------------|
| `jira-issue-panel` | Panel simples com UI Kit |
| `jira-issue-panel-ui-kit-custom-ui` | Panel complexo com React |
| `jira-custom-field` | Campo customizado |
| `jira-dashboard-gadget` | Widget de dashboard |
| `jira-global-page` | Página global/admin |
| `jira-project-page` | Página de projeto |

### Confluence

| Template | Quando Usar |
|----------|-------------|
| `confluence-hello-world` | Macro básico |
| `confluence-custom-ui` | App complexo |

### Bitbucket

| Template | Quando Usar |
|----------|-------------|
| `bitbucket-hello-world` | Hooks, PR checks |

### Multi-Product

| Template | Quando Usar |
|----------|-------------|
| `forge-ui` | Base para UI Kit |
| `forge-custom-ui` | Base para Custom UI |

---

## 📝 Checklist de Validação

### Arquivos Alterados

- [x] `structure/prompts/commands/forge-implement.md` (Step 1 completo)
- [x] `structure/prompts/commands/forge-architect.md` (Step 3.5 adicionado)
- [x] `docs/adr/ADR-004-always-use-forge-templates.md` (criado)
- [x] `docs/best-practices/forge-project-setup.md` (criado)

### Testes Necessários

- [ ] Testar `@forge-implement` com Copilot Chat
- [ ] Verificar se gera `forge create --template` corretamente
- [ ] Validar seleção de template no `@forge-architect`
- [ ] Testar fluxo completo: ideate → architect → implement
- [ ] Criar test case em projeto de exemplo

### Documentação

- [x] ADR documentado
- [x] Best practices criado
- [x] Prompts atualizados
- [ ] ROADMAP.md atualizado (mencionar correção)
- [ ] README.md atualizado (se necessário)

---

## 🚀 Próximos Passos

### Imediato (Esta Sessão)

1. ✅ Atualizar prompts ← **DONE**
2. ✅ Criar ADR-004 ← **DONE**
3. ✅ Criar best practices guide ← **DONE**
4. 🔄 Commit e push das mudanças ← **NEXT**
5. 🔄 Testar com Copilot Chat

### Curto Prazo (Próximos Dias)

1. Criar test project usando script
2. Executar `@forge-ideate` → `@forge-architect` → `@forge-implement`
3. Validar que gera `forge create --template` corretamente
4. Documentar resultado do teste
5. Ajustar se necessário

### Médio Prazo (v0.2.0)

1. Incluir exemplo de template em cada specialization
2. Documentar template usado em specializations
3. Criar decision tree visual para template selection
4. Adicionar ao TESTING.md

---

## 📚 Referências

### Documentação Oficial

- [Forge CLI Reference - create](https://developer.atlassian.com/platform/forge/cli-reference/create/)
- [Forge Templates](https://developer.atlassian.com/platform/forge/cli-reference/create/#templates)
- [Getting Started](https://developer.atlassian.com/platform/forge/getting-started/)

### Documentos Criados

- `docs/adr/ADR-004-always-use-forge-templates.md`
- `docs/best-practices/forge-project-setup.md`

### Arquivos Modificados

- `structure/prompts/commands/forge-implement.md`
- `structure/prompts/commands/forge-architect.md`

---

## 💡 Lições Aprendidas

### 1. Importância de Testes Reais

- Usuário testou localmente e encontrou problema real
- Validação com Copilot é essencial
- Prompts podem parecer corretos mas gerar comportamento errado

### 2. Seguir Padrões da Plataforma

- Forge CLI fornece templates por uma razão
- Templates oficiais são mantidos pela Atlassian
- Comunidade espera estrutura padrão

### 3. Documentação Clara

- Não basta corrigir, precisa documentar
- ADR explica POR QUÊ da decisão
- Best practices guia COMO fazer

### 4. Rastreabilidade

- Decisão de template deve estar no ADD
- Arquiteto escolhe, implementador executa
- Seguir metodologia SDD mesmo em detalhes

---

## ✅ Conclusão

**Problema**: Prompts instruíam criação manual de estrutura  
**Causa**: Falta de especificação de template no `forge create`  
**Solução**: Sempre usar `forge create --template <nome>`  
**Status**: ✅ Corrigido e documentado  
**Impacto**: Melhoria significativa na qualidade do código gerado  

**Próxima Ação**: Commit, push e teste com Copilot Chat.

---

**Atualizado em**: 2025-01-06  
**Por**: VSALMEID  
**Revisão**: Pendente após testes
