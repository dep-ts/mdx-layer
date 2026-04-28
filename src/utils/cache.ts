import * as fs from '@std/fs';
import { Disk } from '@dep/cache';

export async function useCache(outDir: string) {
  if (!fs.existsSync(`${outDir}/cache/`)) {
    await Deno.mkdir(`${outDir}/cache/`, { recursive: true });
  }

  return new Disk(`${outDir}/cache/timestamp.json`);
}
