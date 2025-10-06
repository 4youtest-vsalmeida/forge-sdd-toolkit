/**
 * File System Utilities
 *
 * Helper functions for file operations used throughout the CLI.
 */
import * as fs from 'fs/promises';
import * as path from 'path';
import { transformPaths, addGenerationHeader, validateTransformation } from './path-mappings.js';
/**
 * Copy and optionally transform a file
 *
 * @param sourcePath - Source file path
 * @param destPath - Destination file path
 * @param options - Copy options
 */
export async function copyFile(sourcePath, destPath, options = {}) {
    const { transform = false, addHeader = false, newExtension, sourcePath: sourcePathForHeader } = options;
    // Ensure destination directory exists
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    if (!transform && !addHeader) {
        // Simple copy
        await fs.copyFile(sourcePath, destPath);
        return;
    }
    // Read, transform, and write
    let content = await fs.readFile(sourcePath, 'utf-8');
    if (transform) {
        content = transformPaths(content);
        validateTransformation(content);
    }
    if (addHeader && sourcePathForHeader) {
        content = addGenerationHeader(content, sourcePathForHeader);
    }
    // Apply new extension if specified
    const finalDestPath = newExtension
        ? destPath.replace(/\.[^.]+$/, newExtension)
        : destPath;
    await fs.writeFile(finalDestPath, content, 'utf-8');
}
/**
 * Copy entire directory recursively
 *
 * @param sourcePath - Source directory path
 * @param destPath - Destination directory path
 * @param options - Copy options (applied to all files)
 */
export async function copyDirectory(sourcePath, destPath, options = {}) {
    await fs.mkdir(destPath, { recursive: true });
    const entries = await fs.readdir(sourcePath, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(sourcePath, entry.name);
        const dstPath = path.join(destPath, entry.name);
        if (entry.isDirectory()) {
            await copyDirectory(srcPath, dstPath, options);
        }
        else {
            await copyFile(srcPath, dstPath, options);
        }
    }
}
/**
 * Check if file exists
 *
 * @param filePath - File path to check
 * @returns True if file exists
 */
export async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Read JSON file with type safety
 *
 * @param filePath - Path to JSON file
 * @returns Parsed JSON object
 */
export async function readJSON(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
}
/**
 * Write JSON file with formatting
 *
 * @param filePath - Path to JSON file
 * @param data - Data to write
 */
export async function writeJSON(filePath, data) {
    const content = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, content, 'utf-8');
}
/**
 * Get all files in directory recursively
 *
 * @param dirPath - Directory path
 * @param extension - Optional file extension filter (e.g., '.md')
 * @returns Array of file paths
 */
export async function getFilesRecursive(dirPath, extension) {
    const files = [];
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            const subFiles = await getFilesRecursive(fullPath, extension);
            files.push(...subFiles);
        }
        else if (!extension || entry.name.endsWith(extension)) {
            files.push(fullPath);
        }
    }
    return files;
}
/**
 * Create directory if it doesn't exist
 *
 * @param dirPath - Directory path
 */
export async function ensureDirectory(dirPath) {
    await fs.mkdir(dirPath, { recursive: true });
}
/**
 * Delete file or directory recursively
 *
 * @param targetPath - Path to delete
 */
export async function remove(targetPath) {
    try {
        const stat = await fs.stat(targetPath);
        if (stat.isDirectory()) {
            await fs.rm(targetPath, { recursive: true, force: true });
        }
        else {
            await fs.unlink(targetPath);
        }
    }
    catch (error) {
        // Ignore if doesn't exist
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
}
//# sourceMappingURL=file-utils.js.map