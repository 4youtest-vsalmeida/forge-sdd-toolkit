/**
 * Path Mapping Utilities
 *
 * Transforms relative paths in toolkit prompts to match user project structure.
 *
 * Toolkit structure:
 *   structure/prompts/commands/forge-architect.md
 *   structure/prompts/base/system-prompt.md
 *   structure/templates/general/ADD-template.md
 *
 * User project structure:
 *   .github/prompts/forge-architect.prompt.md
 *   .github/prompts/_base/system-prompt.md
 *   .forge-sdd/templates/general/ADD-template.md
 */
export interface PathMapping {
    /** Regex pattern to match in source files */
    pattern: RegExp;
    /** Replacement path for user project */
    replacement: string;
    /** Human-readable description */
    description: string;
}
/**
 * Path mappings from toolkit to user project
 */
export declare const PATH_MAPPINGS: PathMapping[];
/**
 * Transform paths in content from toolkit structure to user project structure
 *
 * @param content - File content with toolkit-relative paths
 * @returns Content with user-project-relative paths
 */
export declare function transformPaths(content: string): string;
/**
 * Add generation header to transformed file
 *
 * @param content - Transformed content
 * @param sourcePath - Original file path in toolkit
 * @returns Content with header prepended
 */
export declare function addGenerationHeader(content: string, sourcePath: string): string;
/**
 * Validate that all paths were transformed correctly
 *
 * @param content - Transformed content
 * @throws Error if any toolkit-relative paths remain
 */
export declare function validateTransformation(content: string): void;
/**
 * Get path mapping statistics for logging
 *
 * @param content - Original content
 * @returns Object with transformation counts
 */
export declare function getTransformationStats(content: string): Record<string, number>;
//# sourceMappingURL=path-mappings.d.ts.map