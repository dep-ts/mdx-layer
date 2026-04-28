export function formatPathIdentifier(input: string) {
  if (input === '.') return 'Root';
  return input
    .split(/[\\/]/)
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join('');
}
