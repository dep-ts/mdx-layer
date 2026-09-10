// deno-lint-ignore-file no-explicit-any
// import type { ObjectSchema } from '@dep/schema';
import { resolveConfigPath } from '@/utils/path.ts';
import { toFileUrl } from '@dep/path';
import { bold, red } from '@std/fmt/colors';

/**
 * Represents the standard structure of a processed MDX entry.
 */
export interface ContentEntry {
  /** The URL-friendly identifier derived from the filename. */
  _slug: string;
  /** The absolute system path to the source file. */
  _filePath: string;
  /** The raw, unparsed string content of the MDX file. */
  _raw: string;
  /** The body content of the MDX file, excluding front-matter. */
  _body: string;
  [key: string]: any;
}

/**
 * Configuration options for the MdxLayer build process.
 */
export interface MdxLayerConfig<T = any> {
  /** The directory containing source MDX content. Defaults to `./content`. */
  contentDir?: string;
  /** The directory where JSON and the main.ts index will be generated. Defaults to `.mdx-layer`. */
  outDir?: string;
  /** The base name for the exported TypeScript constants. Defaults to `Content`. */
  docType?: string;
  /** Substrings to ignore in file paths (e.g., ['_drafts', '.temp']). */
  exclude?: Array<string>;
  /** Functions to transform parsed data before it is saved to disk. */
  transforms?: Record<string, (entry: ContentEntry) => T | Promise<T>>;
  /** Validation schemas (e.g., from `@dep/schema`) to enforce structure per group. */
  schemas?: Record<
    string,
    {
      parseAsync: (data: unknown) => Promise<Record<PropertyKey, any>>;
      type: 'object';
    }
  >;
}
/**
 * Helper function to provide type-safety when defining a configuration file.
 * * @param config The MdxLayer configuration object.
 * @returns The validated configuration object.
 */
export function defineConfig<T>(config: MdxLayerConfig<T>): MdxLayerConfig<T> {
  return config;
}

/**
 * Dynamically loads the configuration file from the filesystem.
 * * @param configPath Optional explicit path to a config file.
 * If omitted, it looks for `mdx-layer.config.ts` in the current working directory.
 * @returns The loaded configuration merged with the detected config path.
 */
export async function loadConfig(
  configPath?: string,
): Promise<MdxLayerConfig & { configPath?: string; ok?: boolean }> {
  const filePath = resolveConfigPath(configPath);

  if (!filePath) {
    return {};
  }

  try {
    const fileUrl = toFileUrl(filePath);
    const modulePath = `${fileUrl.href}?update=${Date.now()}`;
    const mod = await import(modulePath);
    const config = mod.default ?? mod;

    if (config && typeof config === 'object') {
      return { ...config, configPath: filePath };
    }

    return { configPath: filePath };
  } catch (error) {
    if (error instanceof Error) {
      console.error(`\n  ${red(bold('Error:'))} ${error.message}`);
    }
    return { ok: false };
  }
}
