import { extractYaml } from '@std/front-matter';
import { WalkEntry } from '@std/fs';
import { slug } from '@dep/slug';

export async function parseMDX(file: WalkEntry) {
  const _slug = slug(file.name.split(/\.mdx|\.md/)[0]);
  const _filePath = file.path;
  const _raw = await Deno.readTextFile(_filePath);
  const { attrs, body } = extractYaml(_raw);

  const entry = {
    ...(attrs as Record<string, PropertyKey>),
    _body: body,
    _slug,
    _filePath,
    _raw,
  };

  return entry;
}
