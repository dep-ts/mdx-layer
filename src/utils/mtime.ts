export async function getMtime(path: string) {
  const info = await Deno.stat(path);
  return info.mtime?.getTime();
}
