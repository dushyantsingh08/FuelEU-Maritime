import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.string().optional().default('3000'),
  DATABASE_URL: z.string().url().optional(),
  POSTGRES_HOST: z.string().optional(),
  POSTGRES_PORT: z.string().optional(),
  POSTGRES_USER: z.string().optional(),
  POSTGRES_PASSWORD: z.string().optional(),
  POSTGRES_DB: z.string().optional()
});

export type AppConfig = {
  port: number;
  databaseUrl: string;
};

export function loadConfig(): AppConfig {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid environment variables: ${parsed.error.message}`);
  }
  const env = parsed.data;

  const databaseUrl = env.DATABASE_URL ?? buildDatabaseUrlFromParts(env);
  if (!databaseUrl) {
    throw new Error('DATABASE_URL or discrete POSTGRES_* variables are required');
  }

  return {
    port: Number(env.PORT ?? '3000'),
    databaseUrl
  };
}

function buildDatabaseUrlFromParts(env: z.infer<typeof EnvSchema>): string | undefined {
  const host = env.POSTGRES_HOST;
  const port = env.POSTGRES_PORT ?? '5432';
  const user = env.POSTGRES_USER;
  const password = env.POSTGRES_PASSWORD;
  const db = env.POSTGRES_DB;
  if (!host || !user || !password || !db) return undefined;
  return `postgres://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${db}`;
}


