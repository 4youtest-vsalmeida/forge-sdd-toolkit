# forge-sdd-toolkit Installation Guide# forge-sdd-toolkit Installation Guide# Guia de Instalação - forge-sdd-toolkit



## Recommended: Install via uv ⚡



### Why uv?## Recommended: Install via uv ⚡## Instalação via GitHub (Para Testes)

- **10-100x faster** than pip

- **Better dependency resolution**

- **No virtual environment needed** for CLI tools

- **Single binary** - lightweight and portable### Why uv?### Método 1: Instalação Global



### Installation- **10-100x faster** than pip



```bash- **Better dependency resolution**```bash

# Install uv if you don't have it

curl -LsSf https://astral.sh/uv/install.sh | sh- **No virtual environment needed** for CLI toolsnpm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git



# Option A: Install from GitHub- **Single binary** - lightweight and portable```

uv tool install git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit



# Option B: Install from local directory (for development)

cd forge-sdd-toolkit### InstallationApós a instalação, você pode usar o comando `forge-sdd` globalmente:

uv tool install --editable .



# Verify installation

forge-sdd --help```bash```bash

forge-sdd --version

```# Install uv if you don't have itforge-sdd init my-forge-app



**What is `--editable` mode?**curl -LsSf https://astral.sh/uv/install.sh | shforge-sdd prompt ideate

- Changes in the source code are reflected immediately

- Perfect for development and contributionsforge-sdd validate docs/specification.md

- No need to reinstall after each change

- Similar to `npm link` or `pip install -e`# Install forge-sdd-toolkit directly from GitHubforge-sdd template implementation-plan



### Usageuv tool install git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit```



```bash

# Create a new SDD project

forge-sdd init my-forge-app# Verify installation### Método 2: Uso com npx (Sem Instalação Global)



# Navigate and openforge-sdd init --help

cd my-forge-app

code .``````bash



# Get installation help anytimenpx git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git init my-forge-app

forge-sdd install

### Usage```

# Start with GitHub Copilot

# Open Copilot Chat and type: @forge-ideate

```

```bash### Método 3: Instalação Local no Projeto

---

# Create a new SDD project

## Alternative: Install via pip

forge-sdd init my-forge-app```bash

```bash

# Option A: Install from GitHubnpm install git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git

pip install git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit

# Navigate and open```

# Option B: Install from local directory (for development)

cd forge-sdd-toolkitcd my-forge-app

pip install --editable .

code .Depois use via npm scripts ou npx local:

# Verify

forge-sdd --help

```

# Start with GitHub Copilot```bash

---

# Open Copilot Chat and type: @forge-ideatenpx forge-sdd init my-forge-app

## Alternative: Install Script (Legacy)

``````

```bash

curl -fsSL https://raw.githubusercontent.com/4youtest-vsalmeida/forge-sdd-toolkit/main/install.sh | bash

```

---## Verificação da Instalação

---



## For Developers: Local Development

## Alternative: Install via pipPara verificar se a instalação foi bem-sucedida:

### Clone and Install in Editable Mode



```bash

# Clone the repository```bash```bash

git clone https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git

cd forge-sdd-toolkit# Install directly from GitHubforge-sdd --version



# Install in editable mode with uv (recommended)pip install git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit# Deve exibir: 0.1.0

uv tool install --editable .



# Or with pip

pip install --editable .# Verifyforge-sdd --help



# Test your changesforge-sdd init --help# Deve exibir os 4 comandos disponíveis

forge-sdd init test-project

cd test-project``````



# Make changes to the toolkit code...

# Changes are reflected immediately without reinstalling!

```---## Passos para Publicação no GitHub



### What is Editable Mode?



When you install in editable mode (`--editable` or `-e`):## Alternative: Install Script (Legacy)### 1. Build do Projeto

- The package is installed as a **symlink** to your source directory

- Changes to `.py` files are **reflected immediately**

- No need to reinstall after each modification

- Perfect for:```bash```bash

  - 🔧 Development and testing

  - 🐛 Debuggingcurl -fsSL https://raw.githubusercontent.com/4youtest-vsalmeida/forge-sdd-toolkit/main/install.sh | bashnpm run build

  - 🤝 Contributing to the project

  - 📚 Learning how it works``````



### Development Workflow



```bash---Este comando compila o TypeScript para JavaScript na pasta `dist/`.

# 1. Make changes to src/forge_sdd_toolkit/cli.py

vim src/forge_sdd_toolkit/cli.py



# 2. Test immediately (no reinstall needed!)## For Developers: Local Development### 2. Commit dos Arquivos de Build

forge-sdd init test-app



# 3. Commit when ready

git add .```bash```bash

git commit -m "Add new feature"

```# Clone the repositorygit add dist/



---git clone https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.gitgit add package.json .gitignore INSTALL.md



## Updatingcd forge-sdd-toolkitgit commit -m "chore: prepare for GitHub installation - include dist/ folder"



### With uv```

```bash

uv tool upgrade forge-sdd-toolkit# Install in development mode with uv



# Or for editable installationsuv tool install --force --editable .### 3. Push para o Repositório

cd forge-sdd-toolkit

git pull origin main

# Changes applied automatically!

```# Or with pip```bash



### With pippip install --editable .git push origin main

```bash

pip install --upgrade git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit```



# Or for editable installations# Test

cd forge-sdd-toolkit

git pull origin mainforge-sdd init test-project### 4. Criar uma Release (Opcional mas Recomendado)

# Changes applied automatically!

``````



---```bash



## Uninstalling---git tag v0.1.0



### With uvgit push origin v0.1.0

```bash

uv tool uninstall forge-sdd-toolkit## Updating```

```



### With pip

```bash### With uvOu crie via GitHub interface:

pip uninstall forge-sdd-toolkit

``````bash1. Acesse: https://github.com/4youtest-vsalmeida/forge-sdd-toolkit/releases



---uv tool upgrade forge-sdd-toolkit2. Clique em "Create a new release"



## Troubleshooting```3. Tag: `v0.1.0`



### Command not found after installation4. Title: `v0.1.0 - Initial Release`



Make sure `~/.local/bin` is in your PATH:### With pip5. Description: "Primeira versão estável do forge-sdd-toolkit"



```bash```bash

# For zsh (macOS default)

echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrcpip install --upgrade git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit## Instalação de uma Release Específica

source ~/.zshrc

```

# For bash

echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrcApós criar a release, você pode instalar versões específicas:

source ~/.bashrc

---

# Verify

echo $PATH | grep ".local/bin"```bash

which forge-sdd

```## Uninstallingnpm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git#v0.1.0



### Permission denied```



Make sure the script has execute permissions:### With uv



```bash```bash## Testes de Instalação

chmod +x ~/.local/bin/forge-sdd

```uv tool uninstall forge-sdd-toolkit



### Files not found after init```### Teste 1: Instalação Global



This usually means the package wasn't installed correctly. Try:



```bash### With pip```bash

# Uninstall

uv tool uninstall forge-sdd-toolkit```bash# Limpar instalação anterior (se houver)



# Reinstall with forcepip uninstall forge-sdd-toolkitnpm uninstall -g forge-sdd-toolkit

uv tool install --force git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit

```

# Verify

forge-sdd --version# Instalar via GitHub

```

---npm install -g git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git

### Editable mode not working



Make sure you're in the correct directory:

## Troubleshooting# Verificar instalação

```bash

cd forge-sdd-toolkitforge-sdd --version

uv tool install --force --editable .

### Command not found after installationforge-sdd --help

# Verify it's editable

uv tool list | grep forge-sdd

```

Make sure `~/.local/bin` is in your PATH:# Testar comando init

### Module not found errors

mkdir test-project

This usually happens when the `structure/` directory is not included. Check:

```bashcd test-project

```bash

# Verify structure exists# For zsh (macOS default)forge-sdd init

ls -la ~/.local/share/uv/tools/forge-sdd-toolkit/*/site-packages/forge_sdd_toolkit/structure

echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc```

# If not, reinstall

uv tool install --force --reinstall git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkitsource ~/.zshrc

```

### Teste 2: Uso com npx

---

# For bash

## Installation Verification Checklist

echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc```bash

After installation, verify everything works:

source ~/.bashrc# Criar diretório de teste

```bash

# 1. Check command is available```mkdir test-npx

which forge-sdd

# Should show: ~/.local/bin/forge-sddcd test-npx



# 2. Check version### Permission denied

forge-sdd --version

# Should show: forge-sdd-toolkit version 0.2.0# Usar diretamente com npx



# 3. Check helpMake sure the script has execute permissions:npx git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkit.git init my-app

forge-sdd --help

# Should show: Usage instructions



# 4. Test init```bash# Verificar estrutura criada

cd /tmp

forge-sdd init test-verifychmod +x ~/.local/bin/forge-sddls -la my-app/

cd test-verify

``````

# 5. Verify structure

ls -la .github/prompts/

# Should show: forge-*.prompt.md files and _base/ directory

### Files not found after init### Teste 3: Todos os Comandos

# 6. Cleanup

cd ..

rm -rf test-verify

```This usually means the package wasn't installed correctly. Try:```bash



---cd my-app



## Next Steps```bash



After successful installation:# Uninstall# Comando prompt



1. **Create your first project**:uv tool uninstall forge-sdd-toolkitforge-sdd prompt ideate

   ```bash

   forge-sdd init my-forge-app

   cd my-forge-app

   code .# Reinstall with force# Comando validate (precisa de um arquivo para validar)

   ```

uv tool install --force git+https://github.com/4youtest-vsalmeida/forge-sdd-toolkitforge-sdd validate docs/specification.md

2. **Start with GitHub Copilot**:

   - Open GitHub Copilot Chat (Cmd/Ctrl + I)```

   - Type: `@forge-ideate`

   - Describe your Forge app idea# Comando template



3. **Follow the SDD lifecycle**:---forge-sdd template implementation-plan

   ```

   IDEATE → ARCHITECT → PLAN → IMPLEMENT → TEST → OPERATE```

   ```

## Next Steps

4. **Learn more**:

   - Read the [README.md](README.md)## Troubleshooting

   - Check the [SETUP.md](SETUP.md) for development

   - Explore the `.github/prompts/` directory in your projectAfter installation:



**Happy building! 🚀**### Erro: "Cannot find module"


1. Run `forge-sdd init my-app`

2. Open the project in VS Code**Causa**: A pasta `dist/` não foi incluída no repositório.

3. Start GitHub Copilot Chat

4. Type `@forge-ideate` and describe your Forge app idea**Solução**:

5. Follow the 6-stage SDD lifecycle```bash

npm run build

**Happy building! 🚀**git add dist/

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
