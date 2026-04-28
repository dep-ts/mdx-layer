export type ImportsMap = Record<string, Record<string, string>>;

export async function generateJsonImports(
  importsMap: ImportsMap,
  outDir: string,
): Promise<void> {
  const lines: Array<string> = [];

  for (const [group, imports] of Object.entries(importsMap)) {
    const names = Object.keys(imports);

    for (const [name, path] of Object.entries(imports)) {
      lines.push(`import ${name} from '${path}' with { type: 'json' };`);
    }

    lines.push(`export const ${group} = [${names.join(', ')}];`);
  }

  await Deno.writeTextFile(`${outDir}/main.ts`, lines.join('\n'));
}
