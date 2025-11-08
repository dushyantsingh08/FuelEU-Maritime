import { createServer } from './infrastructure/web/createServer.js';
import { loadConfig } from './config/env.js';

async function main(): Promise<void> {
  const config = loadConfig();
  const server = await createServer(config);
  await server.listen({ port: config.port, host: '0.0.0.0' });
  server.log.info({ port: config.port }, 'HTTP server started');
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});


