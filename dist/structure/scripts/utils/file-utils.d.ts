/**
 * File System Utilities
 *
 * Helper functions for file operations used throughout the CLI.
 */
export interface CopyOptions {
    /** Transform paths during copy */
    transform?: boolean;
    /** Add generation header */
    addHeader?: boolean;
    /** New file extension (e.g., '.prompt.md') */
    newExtension?: string;
    /** Source path for header (relative to toolkit root) */
    sourcePath?: string;
}
/**
 * Copy and optionally transform a file
 *
 * @param sourcePath - Source file path
 * @param destPath - Destination file path
 * @param options - Copy options
 */
export declare function copyFile(sourcePath: string, destPath: string, options?: CopyOptions): Promise<void>;
/**
 * Copy entire directory recursively
 *
 * @param sourcePath - Source directory path
 * @param destPath - Destination directory path
 * @param options - Copy options (applied to all files)
 */
export declare function copyDirectory(sourcePath: string, destPath: string, options?: CopyOptions): Promise<void>;
/**
 * Check if file exists
 *
 * @param filePath - File path to check
 * @returns True if file exists
 */
export declare function fileExists(filePath: string): Promise<boolean>;
/**
 * Read JSON file with type safety
 *
 * @param filePath - Path to JSON file
 * @returns Parsed JSON object
 */
export declare function readJSON<T = unknown>(filePath: string): Promise<T>;
/**
 * Write JSON file with formatting
 *
 * @param filePath - Path to JSON file
 * @param data - Data to write
 */
export declare function writeJSON(filePath: string, data: unknown): Promise<void>;
/**
 * Get all files in directory recursively
 *
 * @param dirPath - Directory path
 * @param extension - Optional file extension filter (e.g., '.md')
 * @returns Array of file paths
 */
export declare function getFilesRecursive(dirPath: string, extension?: string): Promise<string[]>;
/**
 * Create directory if it doesn't exist
 *
 * @param dirPath - Directory path
 */
export declare function ensureDirectory(dirPath: string): Promise<void>;
/**
 * Delete file or directory recursively
 *
 * @param targetPath - Path to delete
 */
export declare function remove(targetPath: string): Promise<void>;
//# sourceMappingURL=file-utils.d.ts.map