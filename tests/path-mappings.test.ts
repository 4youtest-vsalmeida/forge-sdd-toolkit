/**
 * Tests for path-mappings utility
 */

import { describe, it, expect } from '@jest/globals';
import { transformPaths, validateTransformation, getTransformationStats } from '../structure/scripts/utils/path-mappings';

describe('Path Transformation', () => {
  describe('transformPaths', () => {
    it('should transform base prompt references', () => {
      const input = 'See [system-prompt](../base/system-prompt.md)';
      const expected = 'See [system-prompt](_base/system-prompt.md)';
      
      expect(transformPaths(input)).toBe(expected);
    });

    it('should transform nested base prompt references', () => {
      const input = 'Context: [system](../../prompts/base/system-prompt.md)';
      const expected = 'Context: [system](_base/system-prompt.md)';
      
      expect(transformPaths(input)).toBe(expected);
    });

    it('should transform template references', () => {
      const input = 'Template: [ADD](../../templates/general/ADD-template.md)';
      const expected = 'Template: [ADD](../.forge-sdd/templates/general/ADD-template.md)';
      
      expect(transformPaths(input)).toBe(expected);
    });

    it('should transform schema references', () => {
      const input = 'Schema: [spec](../../schemas/specification-schema.json)';
      const expected = 'Schema: [spec](../.forge-sdd/schemas/specification-schema.json)';
      
      expect(transformPaths(input)).toBe(expected);
    });

    it('should transform docs references', () => {
      const input = 'Doc: [guide](../../docs/guide.md)';
      const expected = 'Doc: [guide](../docs/guide.md)';
      
      expect(transformPaths(input)).toBe(expected);
    });

    it('should handle multiple transformations in one file', () => {
      const input = `
Base: [system](../base/system-prompt.md)
Template: [ADD](../../templates/general/ADD-template.md)
Schema: [spec](../../schemas/spec-schema.json)
Docs: [readme](../../docs/README.md)
      `;
      
      const result = transformPaths(input);
      
      expect(result).toContain('_base/system-prompt.md');
      expect(result).toContain('../.forge-sdd/templates/');
      expect(result).toContain('../.forge-sdd/schemas/');
      expect(result).toContain('../docs/');
    });

    it('should not modify already transformed paths', () => {
      const input = 'Already transformed: [system](_base/system-prompt.md)';
      const expected = 'Already transformed: [system](_base/system-prompt.md)';
      
      expect(transformPaths(input)).toBe(expected);
    });

    it('should handle empty content', () => {
      expect(transformPaths('')).toBe('');
    });

    it('should handle content without paths', () => {
      const input = 'This is just regular markdown text without any paths.';
      expect(transformPaths(input)).toBe(input);
    });
  });

  describe('validateTransformation', () => {
    it('should pass validation for correctly transformed content', () => {
      const validContent = `
[System](_base/system-prompt.md)
[Template](../.forge-sdd/templates/ADD-template.md)
[Schema](../.forge-sdd/schemas/spec-schema.json)
      `;
      
      expect(() => validateTransformation(validContent)).not.toThrow();
    });

    it('should throw error if ../base/ remains', () => {
      const invalidContent = 'Still has: [system](../base/system-prompt.md)';
      
      expect(() => validateTransformation(invalidContent)).toThrow(/Invalid path reference/);
    });

    it('should throw error if ../templates/ remains', () => {
      const invalidContent = 'Still has: [template](../templates/ADD.md)';
      
      expect(() => validateTransformation(invalidContent)).toThrow(/Invalid path reference/);
    });

    it('should throw error if ../schemas/ remains', () => {
      const invalidContent = 'Still has: [schema](../schemas/spec.json)';
      
      expect(() => validateTransformation(invalidContent)).toThrow(/Invalid path reference/);
    });

    it('should throw error if ../../prompts/ remains', () => {
      const invalidContent = 'Still has: [prompt](../../prompts/base/system.md)';
      
      expect(() => validateTransformation(invalidContent)).toThrow(/Invalid path reference/);
    });
  });

  describe('getTransformationStats', () => {
    it('should count base prompt transformations', () => {
      const content = `
[One](../base/file1.md)
[Two](../base/file2.md)
      `;
      
      const stats = getTransformationStats(content);
      expect(stats['Base prompts: ../base/ → _base/']).toBe(2);
    });

    it('should count template transformations', () => {
      const content = `
[T1](../../templates/file1.md)
[T2](../../templates/file2.md)
[T3](../../templates/file3.md)
      `;
      
      const stats = getTransformationStats(content);
      expect(stats['Templates: ../../templates/ → ../.forge-sdd/templates/']).toBe(3);
    });

    it('should return zero for non-existent patterns', () => {
      const content = 'No paths here!';
      const stats = getTransformationStats(content);
      
      Object.values(stats).forEach(count => {
        expect(count).toBe(0);
      });
    });

    it('should count multiple pattern types', () => {
      const content = `
[Base](../base/system.md)
[Template](../../templates/ADD.md)
[Schema](../../schemas/spec.json)
      `;
      
      const stats = getTransformationStats(content);
      
      expect(stats['Base prompts: ../base/ → _base/']).toBe(1);
      expect(stats['Templates: ../../templates/ → ../.forge-sdd/templates/']).toBe(1);
      expect(stats['Schemas: ../../schemas/ → ../.forge-sdd/schemas/']).toBe(1);
    });
  });

  describe('Real-world scenarios', () => {
    it('should transform a complete prompt file correctly', () => {
      const promptContent = `
# Forge Architect

## Context

Refer to:
- [System Context](../base/system-prompt.md)
- [Decision Framework](../base/decision-framework.md)
- [ADD Template](../../templates/general/ADD-template.md)

## Validation

Use schema: [ADD Schema](../../schemas/ADD-schema.json)

## Documentation

See: [Best Practices](../../docs/best-practices.md)
      `;

      const transformed = transformPaths(promptContent);
      
      // Verify all transformations
      expect(transformed).toContain('_base/system-prompt.md');
      expect(transformed).toContain('_base/decision-framework.md');
      expect(transformed).toContain('../.forge-sdd/templates/general/ADD-template.md');
      expect(transformed).toContain('../.forge-sdd/schemas/ADD-schema.json');
      expect(transformed).toContain('../docs/best-practices.md');
      
      // Verify no toolkit paths remain
      expect(() => validateTransformation(transformed)).not.toThrow();
    });

    it('should handle markdown links, code blocks, and inline code', () => {
      const content = `
See [system prompt](../base/system-prompt.md) for details.

\`\`\`bash
# This is code, should still transform
cat ../../templates/ADD-template.md
\`\`\`

Inline: \`../../schemas/spec.json\`
      `;

      const transformed = transformPaths(content);
      
      // All paths should be transformed, even in code blocks
      expect(transformed).toContain('_base/system-prompt.md');
      expect(transformed).toContain('../.forge-sdd/templates/ADD-template.md');
      expect(transformed).toContain('../.forge-sdd/schemas/spec.json');
    });
  });
});
