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
    .action(async (projectName, options) => {
    await initCommand(projectName, options);
});
async function initCommand(projectName, options) {
    console.log(chalk.blue.bold('\n🎯 forge-sdd init\n'));
    try {
        // Get project name
        let name = projectName;
        if (!name) {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'Project name:',
                    default: 'my-forge-app',
                    validate: (input) => input.length > 0 || 'Project name is required'
                }
            ]);
            name = answers.projectName;
        }
        const projectPath = path.resolve(process.cwd(), name);
        const spinner = ora(`Creating project structure at ${chalk.cyan(projectPath)}`).start();
        // Create directory structure
        await fs.mkdir(projectPath, { recursive: true });
        await fs.mkdir(path.join(projectPath, '.forge-sdd'), { recursive: true });
        await fs.mkdir(path.join(projectPath, '.forge-sdd', 'prompts'), { recursive: true });
        await fs.mkdir(path.join(projectPath, '.forge-sdd', 'templates'), { recursive: true });
        await fs.mkdir(path.join(projectPath, '.forge-sdd', 'schemas'), { recursive: true });
        await fs.mkdir(path.join(projectPath, 'docs'), { recursive: true });
        spinner.text = 'Copying SDD prompts...';
        // Copy prompts
        const toolkitRoot = path.join(__dirname, '../../..');
        const promptsSource = path.join(toolkitRoot, 'structure/prompts');
        const promptsDest = path.join(projectPath, '.forge-sdd/prompts');
        await copyDirectory(promptsSource, promptsDest);
        spinner.text = 'Copying templates...';
        // Copy templates
        const templatesSource = path.join(toolkitRoot, 'structure/templates');
        const templatesDest = path.join(projectPath, '.forge-sdd/templates');
        await copyDirectory(templatesSource, templatesDest);
        spinner.text = 'Copying schemas...';
        // Copy schemas
        const schemasSource = path.join(toolkitRoot, 'structure/schemas');
        const schemasDest = path.join(projectPath, '.forge-sdd/schemas');
        await copyDirectory(schemasSource, schemasDest);
        spinner.text = 'Creating README...';
        // Create project README
        const readmeContent = generateProjectReadme(name, options?.template || 'basic');
        await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent);
        // Create .gitignore
        const gitignoreContent = `# SDD artifacts
docs/*.draft.md
*.tmp.md

# Node modules
node_modules/

# Forge
.forge/
.tunnel/

# OS
.DS_Store
Thumbs.db
`;
        await fs.writeFile(path.join(projectPath, '.gitignore'), gitignoreContent);
        spinner.succeed(chalk.green('Project initialized successfully!'));
        // Display next steps
        console.log(chalk.blue('\n📋 Next Steps:\n'));
        console.log(chalk.gray(`  1. cd ${name}`));
        console.log(chalk.gray('  2. Open the project in VS Code with GitHub Copilot'));
        console.log(chalk.gray('  3. Run: forge-sdd prompt ideate'));
        console.log(chalk.gray('  4. Follow the 6-stage SDD lifecycle\n'));
        console.log(chalk.yellow('📖 Read README.md for detailed instructions\n'));
    }
    catch (error) {
        console.error(chalk.red('\n❌ Error initializing project:\n'));
        console.error(chalk.red(error instanceof Error ? error.message : String(error)));
        process.exit(1);
    }
}
// ============================================================================
// COMMAND: prompt
// ============================================================================
program
    .command('prompt <stage>')
    .description('Display the prompt for a specific SDD stage')
    .option('-c, --copy', 'Copy prompt to clipboard (requires pbcopy/xclip)', false)
    .action(async (stage, options) => {
    await promptCommand(stage, options);
});
async function promptCommand(stage, options) {
    const validStages = ['ideate', 'architect', 'plan', 'implement', 'test', 'operate'];
    if (!validStages.includes(stage.toLowerCase())) {
        console.error(chalk.red(`\n❌ Invalid stage: ${stage}`));
        console.error(chalk.yellow(`Valid stages: ${validStages.join(', ')}\n`));
        process.exit(1);
    }
    try {
        const promptPath = path.join(process.cwd(), `.forge-sdd/prompts/commands/forge-${stage.toLowerCase()}.md`);
        const promptContent = await fs.readFile(promptPath, 'utf-8');
        console.log(chalk.blue.bold(`\n📄 Prompt: ${stage.toUpperCase()} Stage\n`));
        console.log(chalk.gray('─'.repeat(80)));
        console.log(promptContent);
        console.log(chalk.gray('─'.repeat(80)));
        console.log(chalk.yellow('\n💡 Tip: Copy this prompt and use it with GitHub Copilot in your editor\n'));
        if (options.copy) {
            // Attempt to copy to clipboard (platform-specific)
            const { execSync } = require('child_process');
            try {
                if (process.platform === 'darwin') {
                    execSync('pbcopy', { input: promptContent });
                    console.log(chalk.green('✅ Prompt copied to clipboard!\n'));
                }
                else if (process.platform === 'linux') {
                    execSync('xclip -selection clipboard', { input: promptContent });
                    console.log(chalk.green('✅ Prompt copied to clipboard!\n'));
                }
                else {
                    console.log(chalk.yellow('⚠️  Clipboard copy not supported on this platform\n'));
                }
            }
            catch {
                console.log(chalk.yellow('⚠️  Could not copy to clipboard\n'));
            }
        }
    }
    catch (error) {
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
    .action(async (file, options) => {
    await validateCommand(file, options);
});
async function validateCommand(file, options) {
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
        const schemaPath = path.join(process.cwd(), `.forge-sdd/schemas/${docType}.schema.json`);
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
        }
        else {
            spinner.fail(chalk.red('❌ Validation failed'));
            console.log(chalk.red('\nErrors found:\n'));
            validate.errors?.forEach((error) => {
                console.log(chalk.red(`  • ${error.instancePath}: ${error.message}`));
            });
            console.log('');
            process.exit(1);
        }
    }
    catch (error) {
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
    .action(async (type, options) => {
    await templateCommand(type, options);
});
async function templateCommand(type, options) {
    const validTypes = ['specification', 'ADD', 'implementation-plan', 'test-plan'];
    if (!validTypes.includes(type)) {
        console.error(chalk.red(`\n❌ Invalid template type: ${type}`));
        console.error(chalk.yellow(`Valid types: ${validTypes.join(', ')}\n`));
        process.exit(1);
    }
    try {
        const spinner = ora('Copying template...').start();
        const templatePath = path.join(process.cwd(), `.forge-sdd/templates/general/documents/${type}-template.md`);
        const templateContent = await fs.readFile(templatePath, 'utf-8');
        const timestamp = new Date().toISOString().split('T')[0];
        const outputPath = options.output || path.join(process.cwd(), `docs/${type}-${timestamp}.md`);
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, templateContent);
        spinner.succeed(`Template copied to ${chalk.cyan(outputPath)}`);
        console.log(chalk.yellow('\n💡 Tip: Use GitHub Copilot to fill in the template\n'));
    }
    catch (error) {
        console.error(chalk.red('\n❌ Error copying template:\n'));
        console.error(chalk.red(error instanceof Error ? error.message : String(error)));
        process.exit(1);
    }
}
// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
async function copyDirectory(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            await copyDirectory(srcPath, destPath);
        }
        else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}
function generateProjectReadme(projectName, template) {
    return `# ${projectName}

> Specification-Driven Development project for Atlassian Forge

## 🎯 SDD Methodology

This project follows the **6-stage SDD lifecycle**:

\`\`\`
IDEATE → ARCHITECT → PLAN → IMPLEMENT → TEST → OPERATE
\`\`\`

Each stage produces a formal document that feeds into the next stage.

## 🚀 Getting Started

### Stage 1: IDEATE

Create your specification document:

\`\`\`bash
# Display the IDEATE prompt
forge-sdd prompt ideate

# Copy the template
forge-sdd template specification

# Use GitHub Copilot to fill in docs/specification-[date].md
\`\`\`

### Stage 2: ARCHITECT

Make technical decisions:

\`\`\`bash
# Display the ARCHITECT prompt
forge-sdd prompt architect

# Copy the template
forge-sdd template ADD

# Use GitHub Copilot with your specification
\`\`\`

### Stage 3: PLAN

Create implementation backlog:

\`\`\`bash
forge-sdd prompt plan
forge-sdd template implementation-plan
\`\`\`

### Stage 4: IMPLEMENT

Generate code:

\`\`\`bash
forge-sdd prompt implement
# Use Copilot to generate code based on your plan
\`\`\`

### Stage 5: TEST

Create test suite:

\`\`\`bash
forge-sdd prompt test
forge-sdd template test-plan
\`\`\`

### Stage 6: OPERATE

Deploy and operate:

\`\`\`bash
forge-sdd prompt operate
\`\`\`

## 📁 Project Structure

\`\`\`
${projectName}/
├── .forge-sdd/          # SDD toolkit (prompts, templates, schemas)
├── docs/                # SDD documents (spec, ADD, plans)
├── src/                 # Forge app source code
├── manifest.yml         # Forge app manifest
└── README.md           # This file
\`\`\`

## ✅ Validation

Validate your documents at any time:

\`\`\`bash
forge-sdd validate docs/specification-2025-10-05.md
forge-sdd validate docs/ADD-2025-10-05.md --type ADD
\`\`\`

## 📖 Documentation

- **Prompts**: \`.forge-sdd/prompts/commands/\`
- **Templates**: \`.forge-sdd/templates/general/documents/\`
- **Schemas**: \`.forge-sdd/schemas/\`

## 🔗 Resources

- [SDD Methodology](https://github.com/your-org/forge-sdd-toolkit)
- [Atlassian Forge Docs](https://developer.atlassian.com/platform/forge/)
- [GitHub Copilot](https://github.com/features/copilot)

---

**Generated by forge-sdd v0.1.0**
`;
}
// ============================================================================
// PARSE AND RUN
// ============================================================================
program.parse();
//# sourceMappingURL=forge-sdd.js.map