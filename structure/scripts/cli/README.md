# forge-sdd CLI

> Minimalist CLI for Specification-Driven Development with Atlassian Forge

## Philosophy

The `forge-sdd` CLI is intentionally minimalist. Its job is to:

1. **Bootstrap** SDD project structure
2. **Display** prompts for GitHub Copilot
3. **Validate** documents against schemas
4. **Copy** templates for convenience

**The CLI does NOT generate code or documents.** That's GitHub Copilot's job.

## Installation

```bash
npm install -g forge-sdd-toolkit
```

Or use directly:

```bash
npx forge-sdd-toolkit init my-app
```

## Commands

### `init` - Initialize Project

Create a new SDD project structure with all prompts, templates, and schemas:

```bash
forge-sdd init my-forge-app

# With options
forge-sdd init my-forge-app --template jira
```

This creates:

```
my-forge-app/
├── .forge-sdd/
│   ├── prompts/          # 6 lifecycle prompts
│   ├── templates/        # Document templates
│   └── schemas/          # JSON Schemas
├── docs/                 # Your SDD documents go here
└── README.md            # Project guide
```

### `prompt` - Display Prompt

Show the prompt for a specific SDD stage:

```bash
# Display IDEATE prompt
forge-sdd prompt ideate

# Display ARCHITECT prompt
forge-sdd prompt architect

# Copy to clipboard (macOS)
forge-sdd prompt ideate --copy
```

**Valid stages**: `ideate`, `architect`, `plan`, `implement`, `test`, `operate`

**Usage**: Copy the prompt and use it with GitHub Copilot in your editor.

### `validate` - Validate Document

Validate a document against its JSON Schema:

```bash
# Auto-detect type from frontmatter
forge-sdd validate docs/specification-2025-10-05.md

# Specify type explicitly
forge-sdd validate docs/ADD-2025-10-05.md --type ADD
```

**Valid types**: `specification`, `ADD`, `implementation-plan`, `test-plan`

### `template` - Copy Template

Copy a blank template to your docs folder:

```bash
# Copy specification template
forge-sdd template specification

# Copy to specific path
forge-sdd template ADD --output docs/my-ADD.md
```

**Valid templates**: `specification`, `ADD`, `implementation-plan`, `test-plan`

## Workflow Example

### 1. Initialize Project

```bash
forge-sdd init my-jira-app
cd my-jira-app
```

### 2. IDEATE Stage

```bash
# Get the prompt
forge-sdd prompt ideate

# Copy the template
forge-sdd template specification

# Open docs/specification-2025-10-05.md in VS Code
# Use GitHub Copilot with the IDEATE prompt to fill it in

# Validate when done
forge-sdd validate docs/specification-2025-10-05.md
```

### 3. ARCHITECT Stage

```bash
# Get the prompt
forge-sdd prompt architect

# Copy the template
forge-sdd template ADD

# Use GitHub Copilot with the ARCHITECT prompt
# Reference your specification document

# Validate
forge-sdd validate docs/ADD-2025-10-05.md
```

### 4. Continue through stages...

```bash
forge-sdd prompt plan
forge-sdd template implementation-plan
# ... use Copilot ...
forge-sdd validate docs/implementation-plan-2025-10-05.md

forge-sdd prompt implement
# ... use Copilot to generate code ...

forge-sdd prompt test
forge-sdd template test-plan
# ... create tests ...

forge-sdd prompt operate
# ... deploy ...
```

## Design Decisions

### Why so minimalist?

**Problem**: Complex CLIs that try to do too much become hard to maintain and limit flexibility.

**Solution**: Let GitHub Copilot do the heavy lifting. The CLI just facilitates the workflow.

**Inspired by**:
- **Yeoman** - Generator framework
- **Plop.js** - Micro-generator
- **spec-kit** (GitHub) - Validation-focused CLI

### Why not integrate LLM APIs?

For **v0**, we keep it simple:
- No API keys to manage
- No rate limits to worry about
- User controls the LLM (Copilot, GPT-4, Claude, etc.)
- CLI stays fast and lightweight

**Future** (v0.2+): Optional LLM integration for automated generation.

### Why TypeScript?

- Type safety for schema validation
- Great tooling ecosystem (Commander, Inquirer, etc.)
- Easy to extend
- Familiar to Forge developers

## Architecture

```typescript
forge-sdd.ts
├── Command: init
│   ├── Create directory structure
│   ├── Copy prompts from toolkit
│   ├── Copy templates from toolkit
│   ├── Copy schemas from toolkit
│   └── Generate README
│
├── Command: prompt
│   ├── Load prompt markdown
│   └── Display to terminal
│
├── Command: validate
│   ├── Load JSON Schema
│   ├── Parse document frontmatter
│   └── Validate with AJV
│
└── Command: template
    ├── Load template markdown
    └── Copy to docs/
```

## Dependencies

```json
{
  "dependencies": {
    "ajv": "^8.12.0",           // JSON Schema validation
    "ajv-formats": "^3.0.1",    // Date/email formats
    "commander": "^11.1.0",     // CLI framework
    "inquirer": "^9.2.12",      // Interactive prompts
    "chalk": "^5.3.0",          // Terminal colors
    "ora": "^8.0.1",            // Spinners
    "yaml": "^2.3.4"            // YAML parsing
  }
}
```

## Development

```bash
# Clone the toolkit
git clone https://github.com/your-org/forge-sdd-toolkit
cd forge-sdd-toolkit

# Install dependencies
npm install

# Build
npm run build

# Test locally
node dist/scripts/cli/forge-sdd.js init test-project
```

## Future Enhancements (v0.2+)

- [ ] `forge-sdd ai --provider openai` - Optional LLM integration
- [ ] `forge-sdd status` - Show progress through lifecycle
- [ ] `forge-sdd graph` - Visualize traceability
- [ ] `forge-sdd export` - Export to Confluence/Jira
- [ ] `forge-sdd review` - AI-powered document review

## Related

- [SDD Methodology](../docs/SDD_METHODOLOGY.md)
- [Lifecycle Stages](../docs/LIFECYCLE_STAGES.md)
- [Prompts](../prompts/commands/)
- [Templates](../templates/general/documents/)
- [Schemas](../schemas/)

---

**forge-sdd v0.1.0** - Minimalist CLI for maximum flexibility
