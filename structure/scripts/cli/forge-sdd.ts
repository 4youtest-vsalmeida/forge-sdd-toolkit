#!/usr/bin/env node

/**
 * forge-sdd CLI
 * 
 * Minimalist CLI to bootstrap and validate Specification-Driven Development
 * for Atlassian Forge apps.
 * 
 * Philosophy: The CLI sets up the environment. GitHub Copilot does the work.
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import * as fs from 'fs/promises';
import * as path from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as yaml from 'yaml';
import { execSync } from 'child_process';
import { copyFile, copyDirectory as copyDir, ensureDirectory, writeJSON } from '../utils/file-utils.js';

const program = new Command();

program
  .name('forge-sdd')
  .description('Specification-Driven Development toolkit for Atlassian Forge')
  .version('0.1.0');

// ============================================================================
// COMMAND: init
// ============================================================================
program
  .command('init [project-name]')
  .description('Initialize a new SDD project structure')
  .option('-t, --template <type>', 'Project template (basic|jira|confluence)', 'basic')
  .action(async (projectName?: string, options?: { template: string }) => {
    await initCommand(projectName, options);
  });

async function initCommand(projectName?: string, _options?: { template: string }) {
  console.log(chalk.bold.cyan('\n🚀 forge-sdd-toolkit initializer\n'));

  try {
    // Step 1: Get project name
    let name = projectName;
    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          default: 'my-forge-app',
          validate: (input: string) => {
            if (!input || input.trim().length === 0) {
              return 'Project name is required';
            }
            if (!/^[a-z0-9-]+$/.test(input)) {
              return 'Project name must be lowercase letters, numbers, and hyphens only';
            }
            return true;
          }
        }
      ]);
      name = answers.projectName;
    }

    const projectPath = path.resolve(process.cwd(), name!);

    // Check if directory already exists
    try {
      await fs.access(projectPath);
      console.log(chalk.red(`\n❌ Directory "${name}" already exists\n`));
      process.exit(1);
    } catch {
      // Directory doesn't exist, continue
    }

    // Step 2: Create directory structure
    const spinner = ora('Creating project structure...').start();
    
    try {
      await createDirectoryStructure(projectPath);
      spinner.succeed('Project structure created');
    } catch (error) {
      spinner.fail('Failed to create structure');
      throw error;
    }

    // Step 3: Copy GitHub Copilot prompts
    spinner.start('Setting up GitHub Copilot prompts...');
    
    try {
      await copyGitHubPrompts(projectPath);
      spinner.succeed('GitHub Copilot prompts ready (@forge-ideate, @forge-architect, ...)');
    } catch (error) {
      spinner.fail('Failed to copy prompts');
      throw error;
    }

    // Step 4: Copy SDD templates
    spinner.start('Copying SDD templates...');
    
    try {
      await copySddTemplates(projectPath);
      spinner.succeed('SDD templates ready');
    } catch (error) {
      spinner.fail('Failed to copy templates');
      throw error;
    }

    // Step 5: Copy validation schemas
    spinner.start('Copying validation schemas...');
    
    try {
      await copySchemas(projectPath);
      spinner.succeed('Validation schemas ready');
    } catch (error) {
      spinner.fail('Failed to copy schemas');
      throw error;
    }

    // Step 6: Generate project files
    spinner.start('Generating project files...');
    
    try {
      await generateProjectFiles(projectPath, name!);
      spinner.succeed('Project files generated');
    } catch (error) {
      spinner.fail('Failed to generate files');
      throw error;
    }

    // Success!
    console.log(chalk.green.bold('\n✅ Project initialized successfully!\n'));
    
    console.log(chalk.cyan('📋 Next Steps:\n'));
    console.log(`  1. ${chalk.bold(`cd ${name}`)}`);
    console.log(`  2. ${chalk.bold('code .')} ${chalk.dim('(Open in VS Code)')}`);
    console.log(`  3. ${chalk.bold('Open GitHub Copilot Chat')}`);
    console.log(`  4. ${chalk.bold('Type: @forge-ideate')}`);
    console.log(`  5. ${chalk.bold('Describe your app idea')}\n`);
    
    console.log(chalk.dim(`📖 Read ${name}/README.md for detailed instructions\n`));

  } catch (error) {
    console.error(chalk.red('\n❌ Error initializing project:\n'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}

/**
 * Create base directory structure
 */
async function createDirectoryStructure(projectPath: string): Promise<void> {
  const directories = [
    '.github/prompts/_base',
    '.forge-sdd/templates',
    '.forge-sdd/schemas',
    'docs',
    '.vscode'
  ];

  for (const dir of directories) {
    await ensureDirectory(path.join(projectPath, dir));
  }
}

/**
 * Copy GitHub Copilot prompts with transformation
 */
async function copyGitHubPrompts(projectPath: string): Promise<void> {
  const toolkitRoot = path.join(__dirname, '../../..');
  const promptsSource = path.join(toolkitRoot, 'structure/prompts');
  const promptsDest = path.join(projectPath, '.github/prompts');

  // Stage prompts (commands) - Transform and rename to .prompt.md
  const stagePrompts = [
    'forge-ideate.md',
    'forge-architect.md',
    'forge-plan.md',
    'forge-implement.md',
    'forge-test.md',
    'forge-operate.md'
  ];

  for (const filename of stagePrompts) {
    const sourcePath = path.join(promptsSource, 'commands', filename);
    const destPath = path.join(promptsDest, filename.replace('.md', '.prompt.md'));
    const relativeSourcePath = `structure/prompts/commands/${filename}`;

    await copyFile(sourcePath, destPath, {
      transform: true,
      addHeader: true,
      sourcePath: relativeSourcePath
    });
  }

  // Base prompts - Transform but keep .md extension
  const basePrompts = [
    'system-prompt.md',
    'decision-framework.md'
  ];

  for (const filename of basePrompts) {
    const sourcePath = path.join(promptsSource, 'base', filename);
    const destPath = path.join(promptsDest, '_base', filename);
    const relativeSourcePath = `structure/prompts/base/${filename}`;

    await copyFile(sourcePath, destPath, {
      transform: true,
      addHeader: true,
      sourcePath: relativeSourcePath
    });
  }
}

/**
 * Copy SDD templates (no transformation needed)
 */
async function copySddTemplates(projectPath: string): Promise<void> {
  const toolkitRoot = path.join(__dirname, '../../..');
  const templatesSource = path.join(toolkitRoot, 'structure/templates');
  const templatesDest = path.join(projectPath, '.forge-sdd/templates');

  await copyDir(templatesSource, templatesDest);
}

/**
 * Copy validation schemas (no transformation needed)
 */
async function copySchemas(projectPath: string): Promise<void> {
  const toolkitRoot = path.join(__dirname, '../../..');
  const schemasSource = path.join(toolkitRoot, 'structure/schemas');
  const schemasDest = path.join(projectPath, '.forge-sdd/schemas');

  await copyDir(schemasSource, schemasDest);
}

/**
 * Generate project files (README, .gitignore, etc.)
 */
async function generateProjectFiles(projectPath: string, projectName: string): Promise<void> {
  // Generate README.md
  await generateReadme(projectPath, projectName);
  
  // Generate .gitignore
  await generateGitignore(projectPath);
  
  // Generate .vscode/settings.json
  await generateVSCodeSettings(projectPath);
}

/**
 * Generate README.md for the project
 */
async function generateReadme(projectPath: string, projectName: string): Promise<void> {
  const readme = `# ${projectName}

> Generated by [forge-sdd-toolkit](https://github.com/4youtest-vsalmeida/forge-sdd-toolkit)

## What is this?

This project follows **Specification-Driven Development (SDD)** methodology, where you describe WHAT you want to build in natural language, and GitHub Copilot orchestrates the entire Forge app lifecycle.

## Project Structure

\`\`\`
${projectName}/
├── .github/prompts/          # GitHub Copilot prompts (use @forge-ideate, etc.)
│   ├── forge-ideate.prompt.md
│   ├── forge-architect.prompt.md
│   ├── forge-plan.prompt.md
│   ├── forge-implement.prompt.md
│   ├── forge-test.prompt.md
│   ├── forge-operate.prompt.md
│   └── _base/               # Base prompts (referenced by stage prompts)
│       ├── system-prompt.md
│       └── decision-framework.md
│
├── .forge-sdd/              # SDD toolkit cache
│   ├── templates/           # Reusable patterns
│   └── schemas/             # Validation schemas
│
└── docs/                    # Your SDD documents (generated by Copilot)
    ├── specification-document.md
    ├── ADD.md
    └── implementation-plan.md
\`\`\`

## The 6-Stage SDD Lifecycle

### 1. IDEATE → Specification
\`\`\`bash
# In GitHub Copilot Chat
@forge-ideate

I want to build a Jira app that shows GitHub PR status in issue panels
\`\`\`

**Output**: \`docs/specification-document.md\`

### 2. ARCHITECT → Architecture Decisions
\`\`\`bash
@forge-architect

[Copilot reads specification and makes technical decisions]
\`\`\`

**Output**: \`docs/ADD.md\` (Architecture Decision Document)

### 3. PLAN → Implementation Plan
\`\`\`bash
@forge-plan

[Copilot breaks down architecture into tasks]
\`\`\`

**Output**: \`docs/implementation-plan.md\`

### 4. IMPLEMENT → Working Code
\`\`\`bash
@forge-implement

[Copilot generates production-ready code]
\`\`\`

**Output**: Source code, \`manifest.yml\`, \`package.json\`

### 5. TEST → Test Suite
\`\`\`bash
@forge-test

[Copilot generates comprehensive tests]
\`\`\`

**Output**: Test files

### 6. OPERATE → Deployment
\`\`\`bash
@forge-operate

[Copilot sets up CI/CD and monitoring]
\`\`\`

**Output**: Deployment configs

## CLI Commands

### Show Stage Prompt
\`\`\`bash
forge-sdd prompt ideate       # Display IDEATE prompt
forge-sdd prompt architect    # Display ARCHITECT prompt
forge-sdd prompt implement    # Display IMPLEMENT prompt
\`\`\`

### Copy Template
\`\`\`bash
forge-sdd template specification     # Copy specification template to docs/
forge-sdd template ADD              # Copy ADD template to docs/
\`\`\`

### Validate Document
\`\`\`bash
forge-sdd validate docs/specification-document.md
forge-sdd validate docs/ADD.md
\`\`\`

### Update Toolkit
\`\`\`bash
forge-sdd update                    # Update prompts/templates/schemas
\`\`\`

## Quick Start

1. **Open VS Code** with this project
2. **Open GitHub Copilot Chat** (Cmd/Ctrl + I)
3. **Type** \`@forge-ideate\`
4. **Describe** your app idea in natural language
5. **Follow** the prompts through all 6 stages

## Learn More

- [SDD Methodology](https://github.com/4youtest-vsalmeida/forge-sdd-toolkit#readme)
- [Forge Platform Docs](https://developer.atlassian.com/platform/forge/)
- [GitHub Copilot](https://github.com/features/copilot)

---

**Built with ❤️ using SDD**
`;

  await fs.writeFile(path.join(projectPath, 'README.md'), readme, 'utf-8');
}

/**
 * Generate .gitignore
 */
async function generateGitignore(projectPath: string): Promise<void> {
  const gitignore = `# SDD temporary files
*.draft.md
*.tmp.md
*.wip.md

# Node modules
node_modules/

# Forge
.forge/
.tunnel/
build/
dist/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/*
!.vscode/settings.json
.idea/

# Logs
*.log
npm-debug.log*
`;

  await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore, 'utf-8');
}

/**
 * Generate .vscode/settings.json
 */
async function generateVSCodeSettings(projectPath: string): Promise<void> {
  const settings = {
    "github.copilot.enable": {
      "*": true,
      "yaml": true,
      "markdown": true,
      "plaintext": false
    },
    "github.copilot.advanced": {},
    "files.associations": {
      "*.prompt.md": "markdown"
    },
    "markdown.validate.enabled": true
  };

  await writeJSON(path.join(projectPath, '.vscode/settings.json'), settings);
}

// ============================================================================
// COMMAND: prompt
// ============================================================================
program
  .command('prompt <stage>')
  .description('Display the prompt for a specific SDD stage')
  .option('-c, --copy', 'Copy prompt to clipboard (requires pbcopy/xclip)', false)
  .action(async (stage: string, options: { copy: boolean }) => {
    await promptCommand(stage, options);
  });

async function promptCommand(stage: string, options: { copy: boolean }) {
  const validStages = ['ideate', 'architect', 'plan', 'implement', 'test', 'operate'];
  
  if (!validStages.includes(stage.toLowerCase())) {
    console.error(chalk.red(`\n❌ Invalid stage: ${stage}`));
    console.error(chalk.yellow(`Valid stages: ${validStages.join(', ')}\n`));
    process.exit(1);
  }

  try {
    const promptPath = path.join(
      process.cwd(),
      `.forge-sdd/prompts/commands/forge-${stage.toLowerCase()}.md`
    );

    const promptContent = await fs.readFile(promptPath, 'utf-8');

    console.log(chalk.blue.bold(`\n📄 Prompt: ${stage.toUpperCase()} Stage\n`));
    console.log(chalk.gray('─'.repeat(80)));
    console.log(promptContent);
    console.log(chalk.gray('─'.repeat(80)));
    console.log(chalk.yellow('\n💡 Tip: Copy this prompt and use it with GitHub Copilot in your editor\n'));

    if (options.copy) {
      // Attempt to copy to clipboard (platform-specific)
      try {
        if (process.platform === 'darwin') {
          execSync('pbcopy', { input: promptContent });
          console.log(chalk.green('✅ Prompt copied to clipboard!\n'));
        } else if (process.platform === 'linux') {
          execSync('xclip -selection clipboard', { input: promptContent });
          console.log(chalk.green('✅ Prompt copied to clipboard!\n'));
        } else {
          console.log(chalk.yellow('⚠️  Clipboard copy not supported on this platform\n'));
        }
      } catch {
        console.log(chalk.yellow('⚠️  Could not copy to clipboard\n'));
      }
    }

  } catch (error) {
    console.error(chalk.red('\n❌ Error reading prompt:\n'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    console.log(chalk.yellow('\nMake sure you are in a forge-sdd project directory.\n'));
    process.exit(1);
  }
}

// ============================================================================
// COMMAND: validate
// ============================================================================
program
  .command('validate <file>')
  .description('Validate a document against its JSON Schema')
  .option('-t, --type <type>', 'Document type (specification|ADD|implementation-plan|test-plan)')
  .action(async (file: string, options: { type?: string }) => {
    await validateCommand(file, options);
  });

async function validateCommand(file: string, options: { type?: string }) {
  console.log(chalk.blue.bold('\n🔍 forge-sdd validate\n'));

  try {
    const spinner = ora('Reading document...').start();
    const filePath = path.resolve(file);
    const content = await fs.readFile(filePath, 'utf-8');
    spinner.succeed('Document loaded');

    // Auto-detect type from frontmatter if not provided
    let docType = options.type;
    if (!docType) {
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const frontmatter = yaml.parse(frontmatterMatch[1]);
        docType = frontmatter.type;
      }
    }

    if (!docType) {
      console.error(chalk.red('❌ Could not determine document type'));
      console.log(chalk.yellow('Please specify type with --type flag\n'));
      process.exit(1);
    }

    spinner.start(`Validating as ${chalk.cyan(docType)}...`);

    // Load schema
    const schemaPath = path.join(
      process.cwd(),
      `.forge-sdd/schemas/${docType}.schema.json`
    );
    const schemaContent = await fs.readFile(schemaPath, 'utf-8');
    const schema = JSON.parse(schemaContent);

    // Validate
    const ajv = new Ajv({ allErrors: true });
    addFormats(ajv);
    const validate = ajv.compile(schema);

    // Parse frontmatter for validation
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      spinner.warn('No frontmatter found - skipping validation');
      return;
    }

    const frontmatter = yaml.parse(frontmatterMatch[1]);
    
    // Basic structure validation (in production, parse full document)
    const valid = validate(frontmatter);

    if (valid) {
      spinner.succeed(chalk.green('✅ Validation passed!'));
      console.log(chalk.gray('\nDocument conforms to SDD schema\n'));
    } else {
      spinner.fail(chalk.red('❌ Validation failed'));
      console.log(chalk.red('\nErrors found:\n'));
      validate.errors?.forEach((error) => {
        console.log(chalk.red(`  • ${error.instancePath}: ${error.message}`));
      });
      console.log('');
      process.exit(1);
    }

  } catch (error) {
    console.error(chalk.red('\n❌ Error during validation:\n'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}

// ============================================================================
// COMMAND: template
// ============================================================================
program
  .command('template <type>')
  .description('Copy a template to your docs/ folder')
  .option('-o, --output <path>', 'Output path for template')
  .action(async (type: string, options: { output?: string }) => {
    await templateCommand(type, options);
  });

async function templateCommand(type: string, options: { output?: string }) {
  const validTypes = ['specification', 'ADD', 'implementation-plan', 'test-plan'];
  
  if (!validTypes.includes(type)) {
    console.error(chalk.red(`\n❌ Invalid template type: ${type}`));
    console.error(chalk.yellow(`Valid types: ${validTypes.join(', ')}\n`));
    process.exit(1);
  }

  try {
    const spinner = ora('Copying template...').start();
    
    const templatePath = path.join(
      process.cwd(),
      `.forge-sdd/templates/general/documents/${type}-template.md`
    );
    const templateContent = await fs.readFile(templatePath, 'utf-8');

    const timestamp = new Date().toISOString().split('T')[0];
    const outputPath = options.output || path.join(
      process.cwd(),
      `docs/${type}-${timestamp}.md`
    );

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, templateContent);

    spinner.succeed(`Template copied to ${chalk.cyan(outputPath)}`);
    console.log(chalk.yellow('\n💡 Tip: Use GitHub Copilot to fill in the template\n'));

  } catch (error) {
    console.error(chalk.red('\n❌ Error copying template:\n'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}

// ============================================================================
// PARSE AND RUN
// ============================================================================

program.parse();
