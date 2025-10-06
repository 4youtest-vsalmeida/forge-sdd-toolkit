# Guia de Instalação - forge-sdd-toolkit

## Instalação via GitHub (Para Testes)

### Método 1: Instalação Global

```bash
npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git
```

Após a instalação, você pode usar o comando `forge-sdd` globalmente:

```bash
forge-sdd init my-forge-app
forge-sdd prompt ideate
forge-sdd validate docs/specification.md
forge-sdd template implementation-plan
```

### Método 2: Uso com npx (Sem Instalação Global)

```bash
npx git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git init my-forge-app
```

### Método 3: Instalação Local no Projeto

```bash
npm install git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git
```

Depois use via npm scripts ou npx local:

```bash
npx forge-sdd init my-forge-app
```

## Verificação da Instalação

Para verificar se a instalação foi bem-sucedida:

```bash
forge-sdd --version
# Deve exibir: 0.1.0

forge-sdd --help
# Deve exibir os 4 comandos disponíveis
```

## Passos para Publicação no GitHub

### 1. Build do Projeto

```bash
npm run build
```

Este comando compila o TypeScript para JavaScript na pasta `dist/`.

### 2. Commit dos Arquivos de Build

```bash
git add dist/
git add package.json .gitignore INSTALL.md
git commit -m "chore: prepare for GitHub installation - include dist/ folder"
```

### 3. Push para o Repositório

```bash
git push origin main
```

### 4. Criar uma Release (Opcional mas Recomendado)

```bash
git tag v0.1.0
git push origin v0.1.0
```

Ou crie via GitHub interface:
1. Acesse: https://github.com/4youtest-vsalmeida/forge-sdd-toolkit/releases
2. Clique em "Create a new release"
3. Tag: `v0.1.0`
4. Title: `v0.1.0 - Initial Release`
5. Description: "Primeira versão estável do forge-sdd-toolkit"

## Instalação de uma Release Específica

Após criar a release, você pode instalar versões específicas:

```bash
npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git#v0.1.0
```

## Testes de Instalação

### Teste 1: Instalação Global

```bash
# Limpar instalação anterior (se houver)
npm uninstall -g forge-sdd-toolkit

# Instalar via GitHub
npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git

# Verificar instalação
forge-sdd --version
forge-sdd --help

# Testar comando init
mkdir test-project
cd test-project
forge-sdd init
```

### Teste 2: Uso com npx

```bash
# Criar diretório de teste
mkdir test-npx
cd test-npx

# Usar diretamente com npx
npx git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git init my-app

# Verificar estrutura criada
ls -la my-app/
```

### Teste 3: Todos os Comandos

```bash
cd my-app

# Comando prompt
forge-sdd prompt ideate

# Comando validate (precisa de um arquivo para validar)
forge-sdd validate docs/specification.md

# Comando template
forge-sdd template implementation-plan
```

## Troubleshooting

### Erro: "Cannot find module"

**Causa**: A pasta `dist/` não foi incluída no repositório.

**Solução**:
```bash
npm run build
git add dist/
git commit -m "chore: add dist/ folder for GitHub installation"
git push
```

### Erro: "Permission denied"

**Causa**: Problemas de permissão ao instalar globalmente.

**Solução 1** (macOS/Linux):
```bash
sudo npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git
```

**Solução 2** (Recomendado - usar npx):
```bash
npx git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git init my-app
```

### Erro: "Command not found: forge-sdd"

**Causa**: O binário não está no PATH ou a instalação falhou.

**Solução**:
```bash
# Verificar onde o npm instala pacotes globais
npm root -g

# Reinstalar
npm uninstall -g forge-sdd-toolkit
npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git
```

## Comparação com npm Registry

### Instalação via GitHub (Atual)
```bash
npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git
```

### Instalação via npm Registry (Futuro - quando publicar)
```bash
npm install -g forge-sdd-toolkit
# ou
npx forge-sdd-toolkit init my-app
```

## Próximos Passos

Após validar que a instalação via GitHub funciona corretamente, considere:

1. **Publicar no npm Registry** (30 minutos):
   - Criar conta no npm: https://www.npmjs.com/signup
   - Login: `npm login`
   - Publicar: `npm publish`
   - Benefício: Comando mais simples (`npx forge-sdd-toolkit`)

2. **Automatizar Build com GitHub Actions**:
   - Build automático a cada commit
   - Releases automáticas com tags
   - Testes de instalação automatizados

3. **Criar Documentação de Uso**:
   - Exemplos práticos dos 6 estágios SDD
   - Vídeos de demonstração
   - Casos de uso reais

## Recursos Adicionais

- **Repositório**: https://github.com/4youtest-vsalmeida/forge-sdd-toolkit
- **Issues**: https://github.com/4youtest-vsalmeida/forge-sdd-toolkit/issues
- **Documentação**: Ver README.md principal
- **Atlassian Forge Docs**: https://developer.atlassian.com/platform/forge/
