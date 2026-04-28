import { Command, CommandError } from '@dep/command';
import { description, name, version } from './utils/jsr.ts';
import { builder } from '@/core/builder.ts';
import { watcher } from '@/core/watcher.ts';
import { loadConfig } from '@/core/config.ts';

const cmd = new Command()
  .name(name.split('/')[1] ?? 'mdx-layer')
  .version(version)
  .description(description);

cmd
  .command('build', 'Build the project from source content')
  .alias('b')
  .argument('contentDir', {
    optional: true,
    description: 'The directory containing source content (default: ./content)',
  })
  .option('docType', {
    optional: true,
    description:
      'Specific document type to filter and process (default: Content)',
    shortFlag: 'd',
  })
  .option('outDir', {
    optional: true,
    description:
      'The directory where output will be saved (default: .mdx-layer)',
    shortFlag: 'o',
  })
  .option('exclude', {
    optional: true,
    description:
      'Patterns or paths to exclude from processing (e.g. "drafts", "temp/")',
    kind: 'variadic',
    shortFlag: 'e',
  })
  .option('config', {
    optional: true,
    description:
      'Path to a custom config file (default: ./mdx-layer.config.ts)',
    shortFlag: 'c',
  })
  .option('watch', {
    description: 'Watch for file changes and rebuild automatically',
    shortFlag: 'w',
    kind: 'flag',
  })
  .handler(async ({ args, options }) => {
    const { config: configPath, watch, ...cliOptions } = options;

    const configFile = await loadConfig(configPath);

    const finalConfig = {
      ...configFile,
      ...cliOptions,
      ...args,
    };

    if (watch) {
      await watcher(finalConfig);
    } else {
      await builder(finalConfig);
    }
  });

try {
  await cmd.run();
} catch (err) {
  if (err instanceof CommandError) {
    console.error(`\nError: ${err.message}\n`);
    cmd.help();
    Deno.exit(1);
  }
  throw err;
}
