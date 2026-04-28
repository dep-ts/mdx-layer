import { bold, green, red } from '@std/fmt/colors';
import { ImportsMap } from '@/utils/main.ts';

export function hasUnknown(
  kind: 'schema' | 'transform',
  obj: Record<string, unknown>,
  importsMap: ImportsMap,
) {
  const available = Object.keys(importsMap);
  const invalid = Object.keys(obj).filter((key) => !available.includes(key));

  if (invalid.length) {
    console.error(
      `\n  ${red(bold('Error:'))} Unknown ${kind} group(s): ${
        red(invalid.join(', '))
      }` +
        `\n  ${green('Allowed keys:')} ${green(available.join(', '))}\n`,
    );
    return true;
  }

  return false;
}
