import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import handler from './api/state.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.MONGODB_URI) process.env.MONGODB_URI = env.MONGODB_URI;
  if (env.MONGODB_DB) process.env.MONGODB_DB = env.MONGODB_DB;

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-state-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/state', async (req: any, res: any) => {
            const currentEnv = loadEnv(mode, process.cwd(), '');
            if (currentEnv.MONGODB_URI) process.env.MONGODB_URI = currentEnv.MONGODB_URI;
            if (currentEnv.MONGODB_DB) process.env.MONGODB_DB = currentEnv.MONGODB_DB;

            const wrapRes = (rawRes: any) => {
              rawRes.status = (code: number) => { rawRes.statusCode = code; return rawRes; };
              rawRes.json = (data: any) => {
                rawRes.setHeader('Content-Type', 'application/json');
                rawRes.end(JSON.stringify(data));
                return rawRes;
              };
              return rawRes;
            };

            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk: any) => { body += chunk; });
              req.on('end', async () => {
                try {
                  req.body = JSON.parse(body || '{}');
                } catch {
                  req.body = {};
                }
                await handler(req, wrapRes(res));
              });
            } else {
              await handler(req, wrapRes(res));
            }
          });
        }
      }
    ],
    server: {
      port: 3000,
      open: true
    }
  };
});
