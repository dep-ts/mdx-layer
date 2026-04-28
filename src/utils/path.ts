import { logFilePathNotFound } from '@/utils/log.ts';
import { useCwd } from '@dep/path';
import * as fs from '@std/fs';

export function resolveConfigPath(configPath?: string) {
  let resolvedPath: string | undefined;

  if (configPath) {
    const customPath = useCwd(configPath);
    if (fs.existsSync(customPath)) {
      resolvedPath = customPath;
    } else {
      logFilePathNotFound(customPath);
    }
  } else {
    const defaultPath = useCwd('mdx-layer.config.ts');
    if (fs.existsSync(defaultPath)) {
      resolvedPath = defaultPath;
    }
  }

  return resolvedPath;
}
