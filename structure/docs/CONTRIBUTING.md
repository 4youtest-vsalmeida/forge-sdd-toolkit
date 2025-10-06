# Contributing to forge-sdd-toolkit

> 🙏 Obrigado por considerar contribuir para o forge-sdd-toolkit!

Este projeto segue **rigorosamente** a metodologia **Specification-Driven Development (SDD)**. Todas as contribuições devem aderir a esta filosofia.

---

## 🎯 Filosofia: Comemos Nossa Própria Comida

O forge-sdd-toolkit **pratica o que prega**:
- ✅ Toda feature segue os 6 estágios (IDEATE → ARCHITECT → PLAN → IMPLEMENT → TEST → OPERATE)
- ✅ Todo código rastreia a um requisito
- ✅ Decisões arquiteturais são documentadas em ADRs
- ✅ Nunca pulamos etapas

---

## 🚀 Processo de Contribuição SDD

### 1️⃣ IDEATE: Comece com uma Issue

**Antes de escrever código**, crie uma issue seguindo este template:

```markdown
## Problema / Oportunidade
[Descreva em linguagem natural o que você quer resolver]

## User Story
**Como** [tipo de usuário]
**Eu quero** [funcionalidade]
**Para que** [valor/benefício]

## Acceptance Criteria
- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

## Success Metrics
Como saberemos que isso funcionou?
```

**Labels**: `stage:ideate`, `type:feature|bug|enhancement`

### 2️⃣ ARCHITECT: Discuta Decisões Técnicas

Depois da issue aprovada, **comente na issue** propondo decisões arquiteturais:

```markdown
## Architectural Decisions

### Option Analysis
| Opção | Pros | Cons | Recomendação |
|-------|------|------|--------------|
| A     | ... | ...  | ⭐ Escolher |
| B     | ... | ...  | ❌ Evitar   |

### Decisions
- **Decision 1**: [Escolha] porque [razão]
- **Decision 2**: [Escolha] porque [razão]

### Impact
- Arquivos afetados: [lista]
- Breaking changes: [sim/não]
- Requer ADR: [sim/não]
```

**Aguarde aprovação** antes de prosseguir.

### 3️⃣ PLAN: Crie PR Draft com Plano

Crie um **Pull Request draft** com um plano de implementação:

```markdown
## Implementation Plan

**Issue**: #123
**Stage**: PLAN → IMPLEMENT

### Tasks
- [ ] Task 1: [descrição] (estimativa: Xh)
- [ ] Task 2: [descrição] (estimativa: Xh)
- [ ] Task 3: [descrição] (estimativa: Xh)

### Dependencies
- Depende de: #xyz
- Bloqueia: #abc

### Files to Change
- `path/to/file1.ts`: [o que será feito]
- `path/to/file2.ts`: [o que será feito]

### Testing Strategy
- Unit tests: [arquivos]
- Integration tests: [cenários]
```

**Aguarde revisão do plano** antes de implementar.

### 4️⃣ IMPLEMENT: Desenvolva Seguindo o Plano

Agora sim, **escreva código**:

#### Code Standards

```typescript
/**
 * Rastreabilidade obrigatória em funções principais
 * 
 * @requirement REQ-001 - User preference storage
 * @story STORY-1.2 - As a user, I want my filters saved
 * @decision ADD-STORAGE-001 - Use Forge Storage API
 * @task TASK-456 - Implement preference save/load
 */
export async function saveUserPreference(key: string, value: unknown): Promise<void> {
  // Implementação...
}
```

#### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(ideate): add user story validation #123
fix(architect): correct module decision matrix #124
docs(readme): update quick start guide #125
test(implement): add integration tests for storage #126
```

**Formato**: `<type>(<scope>): <description> #<issue>`

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

#### Branch Naming

```bash
feature/123-add-confluence-templates
bugfix/124-fix-validation-error
docs/125-improve-contributing-guide
```

### 5️⃣ TEST: Adicione Testes

**Todo código novo precisa de testes**:

```typescript
describe('REQ-001: User preference storage', () => {
  it('should save preferences (AC-001)', async () => {
    // Arrange
    const key = 'theme';
    const value = 'dark';
    
    // Act
    await saveUserPreference(key, value);
    
    // Assert
    const saved = await getUserPreference(key);
    expect(saved).toBe(value);
  });
  
  it('should handle errors gracefully (AC-002)', async () => {
    // Test error handling
  });
});
```

**Coverage mínimo**: 80%

#### Rodando Testes

```bash
npm run test          # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### 6️⃣ OPERATE: Documente

Antes de marcar PR como "Ready for Review":

- [ ] **README atualizado** (se aplicável)
- [ ] **CHANGELOG atualizado** com suas mudanças
- [ ] **ADR criado** (para decisões arquiteturais significativas)
- [ ] **Comentários inline** explicando "por quê", não "o quê"
- [ ] **Testes passando** e coverage adequado

#### Atualizando CHANGELOG

```markdown
## [Unreleased]

### Added
- ✨ New confluence macro templates (#123)

### Fixed
- 🐛 Validation error in architect stage (#124)

### Changed
- ♻️ Refactored storage module for better performance (#125)
```

---

## 📋 Pull Request Checklist

Antes de solicitar review, confirme:

### Processo SDD
- [ ] Issue existe e está linkada
- [ ] Decisões arquiteturais foram discutidas
- [ ] Plano foi revisado e aprovado
- [ ] Implementação segue o plano

### Qualidade de Código
- [ ] Código segue style guide (ESLint passing)
- [ ] Rastreabilidade presente em funções principais
- [ ] Sem comentários TODO/FIXME sem issues associadas
- [ ] Nomes descritivos e auto-explicativos

### Testes
- [ ] Testes unitários adicionados
- [ ] Testes de integração (se aplicável)
- [ ] Coverage ≥ 80%
- [ ] Todos os testes passing

### Documentação
- [ ] README atualizado
- [ ] CHANGELOG atualizado
- [ ] ADR criado (se decisão arquitetural)
- [ ] Comentários inline onde necessário

### Git
- [ ] Commits seguem Conventional Commits
- [ ] Branch está atualizado com main
- [ ] Sem merge conflicts

---

## 🎨 Code Style Guide

### TypeScript

```typescript
// ✅ BOM: Tipos explícitos, nomes descritivos
interface UserPreference {
  key: string;
  value: unknown;
  updatedAt: Date;
}

export async function saveUserPreference(
  preference: UserPreference
): Promise<void> {
  // Implementation
}

// ❌ RUIM: any, nomes genéricos
async function save(data: any) {
  // Implementation
}
```

### Estrutura de Arquivos

```
structure/
├── prompts/
│   ├── commands/
│   │   └── forge-{stage}.md          # Um arquivo por estágio
│   └── base/
│       └── {framework-name}.md       # Frameworks reutilizáveis
├── templates/
│   ├── general/
│   │   └── {template-type}/          # Agrupado por tipo
│   └── forge-modules/
│       └── {product}/                # Agrupado por produto
└── specializations/
    └── {product}/
        └── {use-case}/               # Agrupado por caso de uso
```

### Naming Conventions

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Arquivos | kebab-case | `forge-ideate.md` |
| Pastas | kebab-case | `issue-panel/` |
| Classes | PascalCase | `SpecificationValidator` |
| Funções | camelCase | `generateSpecification()` |
| Constantes | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Interfaces | PascalCase + `I` prefix | `IPromptMetadata` |

---

## 🐛 Reportando Bugs

### Template de Bug Report

```markdown
## Descrição do Bug
[Descrição clara do que está errado]

## Etapas para Reproduzir
1. Execute comando `forge-{stage}`
2. Forneça input: [input]
3. Observe o erro: [erro]

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que está acontecendo]

## Ambiente
- Node.js version: [version]
- OS: [Windows/macOS/Linux]
- Toolkit version: [version]

## Logs/Screenshots
[Cole logs ou adicione screenshots]

## Rastreabilidade
Se o bug está relacionado a uma feature, indique:
- Requirement: [REQ-XXX]
- Story: [STORY-X.X]
```

**Labels**: `type:bug`, `priority:high|medium|low`

---

## 💡 Propondo Features

### Template de Feature Request

```markdown
## Problema que Resolve
[Descreva o problema atual]

## Solução Proposta
[Descreva sua ideia de solução]

## Alternativas Consideradas
- **Alternativa 1**: [descrição] - [por que não]
- **Alternativa 2**: [descrição] - [por que não]

## Impacto
- **Users afetados**: [quem se beneficia]
- **Complexidade estimada**: [baixa/média/alta]
- **Breaking changes**: [sim/não]

## User Stories
**Como** [tipo de usuário]
**Eu quero** [funcionalidade]
**Para que** [benefício]
```

**Labels**: `type:feature`, `stage:ideate`

---

## 🏆 Recognition

Contribuidores serão reconhecidos:
- No README principal
- No CHANGELOG de cada release
- Em releases notes

---

## 📞 Precisa de Ajuda?

- 💬 **Discussões**: Para dúvidas gerais, use [GitHub Discussions](https://github.com/vsalmeid/forge-sdd-toolkit/discussions)
- 🐛 **Issues**: Para bugs e features, use [GitHub Issues](https://github.com/vsalmeid/forge-sdd-toolkit/issues)
- 📖 **Documentação**: Consulte [SDD Methodology](./.github/SDD_METHODOLOGY.md)

---

## ⚖️ Code of Conduct

Seja respeitoso, inclusivo e construtivo. Veja nosso [Code of Conduct](./CODE_OF_CONDUCT.md) completo.

---

<div align="center">

**Obrigado por contribuir com forge-sdd-toolkit!** 🙏

**Seguindo SDD, construímos a coisa certa, do jeito certo.** ✨

</div>
