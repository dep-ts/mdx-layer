import { bold, cyan, dim, green, red } from '@std/fmt/colors';

/**
 * Logs a standard "file not found" error.
 */
export function logFilePathNotFound(filePath: string) {
  console.error(`\n  ${red(bold('Error:'))} File not found: ${cyan(filePath)}`);
  console.error(
    `  ${dim('Check your --filePath argument or ensure the file exists.')}\n`,
  );
}

/**
 * Logs a standard "directory not found" error.
 */
export function logDirNotFound(contentDir: string) {
  console.error(
    `\n  ${red(bold('Error:'))} Directory not found ${dim(`[${contentDir}]`)}`,
  );
  console.error(
    `  ${dim('Check your --contentDir argument or create the folder.')}\n`,
  );
}

/**
 * Logs a successful build action.
 */
export function logUpdate(filePath: string, duration: number) {
  const time = new Date().toLocaleTimeString([], { hour12: false });
  console.log(
    `${dim(time)} ${cyan(bold('[mdx-layer]'))} ${green('rebuilt')} ${
      dim(
        filePath,
      )
    } ${dim(`in ${duration.toFixed(0)}ms`)}`,
  );
}
