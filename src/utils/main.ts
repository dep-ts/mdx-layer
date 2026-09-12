import { slug } from '@dep/slug';

export type ImportsMap = Record<string, Record<string, string>>;

export async function generateJsonImports(
  importsMap: ImportsMap,
  outDir: string,
): Promise<void> {
  const lines: Array<string> = [];

  for (const [group, imports] of Object.entries(importsMap)) {
    const names = Object.keys(imports);
    const groupId = slug(group, { lowercase: false, separator: '' });

    for (const [name, path] of Object.entries(imports)) {
      lines.push(`import ${name} from '${path}' with { type: 'json' };`);
    }

    lines.push(`export const ${groupId} = [${names.join(', ')}];`);
  }

  await Deno.writeTextFile(`${outDir}/main.ts`, lines.join('\n'));
}
