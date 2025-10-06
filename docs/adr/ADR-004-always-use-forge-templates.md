# ADR-004: Always Use Official Forge Templates

**Date**: 2025-01-06  
**Status**: ✅ Accepted  
**Priority**: Critical  
**Impact**: Implementation Stage (forge-implement)

---

## Context

During local testing, we discovered that the `forge-implement.md` prompt was instructing Copilot to create Forge app structure manually with commands like:

```bash
forge create
mkdir -p src/{resolvers,ui,utils,types}
mkdir -p test/{unit,integration}
```

This is **NOT a best practice** for Forge development because:

1. **Forge CLI provides official templates** that include:
   - Correct directory structure
   - Pre-configured manifest.yml
   - Sample code for each module type
   - Proper build configuration
   - TypeScript/JavaScript setup
   - Testing boilerplate

2. **Manual structure creation is error-prone**:
   - Missing required files
   - Incorrect manifest format
   - Wrong module configurations
   - No starting examples

3. **Templates follow platform conventions**:
   - Consistent across community
   - Updated by Atlassian
   - Include latest best practices
   - Validated structures

## Problem

The original prompt showed:
```bash
forge create  # Without template specification
mkdir -p src/{...}  # Manual directory creation
```

This led Copilot to generate manual setup code instead of using proper templates.

## Decision

**We will ALWAYS use official Forge templates via `forge create --template`**

### Template Selection Matrix

Based on ADD Decision #2 (UI approach), use:

| Module Type | UI Approach | Template Command |
|-------------|-------------|------------------|
| Issue Panel | UI Kit | `forge create --template jira-issue-panel` |
| Issue Panel | Custom UI | `forge create --template jira-issue-panel-ui-kit-custom-ui` |
| Dashboard Gadget | UI Kit | `forge create --template jira-dashboard-gadget` |
| Custom Field | UI Kit | `forge create --template jira-custom-field` |
| Confluence Macro | UI Kit | `forge create --template confluence-hello-world` |
| Global Page | Custom UI | `forge create --template jira-global-page` |

### Implementation in Prompts

The `forge-implement.md` prompt now includes:

1. **Template selection guide** based on ADD decisions
2. **Explicit warning** against manual structure creation
3. **Step-by-step instructions** for using templates
4. **Customization guidance** for generated files

### Example Corrected Flow

```bash
# ✅ CORRECT: Use official template
forge create --template jira-issue-panel-ui-kit-custom-ui my-app
cd my-app
npm install

# Customize manifest.yml per ADD
# Add dependencies per ADD
# Implement features in generated structure

# ❌ WRONG: Manual creation
forge create
mkdir -p src/...  # DON'T DO THIS
```

## Consequences

### Positive

- ✅ **Faster development**: Template provides 80% of boilerplate
- ✅ **Correct structure**: Guaranteed to work with Forge platform
- ✅ **Best practices**: Templates follow official conventions
- ✅ **Less errors**: No manual configuration mistakes
- ✅ **Better examples**: Starting code shows patterns
- ✅ **Consistency**: All apps follow same structure

### Negative

- ⚠️ **Template limitations**: May need to reorganize for complex apps
- ⚠️ **Learning curve**: Developers need to understand template options
- ⚠️ **Template updates**: Need to stay current with Forge releases

### Mitigation

1. **Document template customization** in specializations
2. **Create template selection guide** in forge-architect prompt
3. **Update all examples** to show template-based flow
4. **Add template list** to documentation

## Validation

### Testing
- [x] Updated `forge-implement.md` with template instructions
- [ ] Test with Copilot Chat to verify correct behavior
- [ ] Validate with real project creation
- [ ] Document in specializations

### Documentation
- [x] Created this ADR
- [ ] Update ROADMAP.md to mention template usage
- [ ] Add to best practices guide
- [ ] Include in all specializations

## References

- [Forge CLI Templates](https://developer.atlassian.com/platform/forge/cli-reference/create/)
- [Forge Getting Started](https://developer.atlassian.com/platform/forge/getting-started/)
- Original issue: User testing feedback (2025-01-06)
- Updated file: `structure/prompts/commands/forge-implement.md`

## Related Decisions

- **ADR-001**: Three-Level Architecture (affects template selection)
- **ADR-002**: SDD Methodology (templates in IMPLEMENT stage)
- **Future**: Template customization patterns (TBD)

---

## Implementation Checklist

- [x] Update `forge-implement.md` prompt
- [ ] Update `forge-architect.md` with template selection criteria
- [ ] Create template decision matrix in `structure/prompts/base/decision-framework.md`
- [ ] Add template examples to all specializations
- [ ] Document in TESTING.md
- [ ] Update README with template guidance

---

**Decision Made By**: Development Team  
**Implemented By**: VSALMEID  
**Review Date**: After v0.2.0 specializations complete
