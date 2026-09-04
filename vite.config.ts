import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api': {
          target: 'https://skillswap-server-monirujjaman.vercel.app',
          changeOrigin: true,
          secure: false,
          headers: {
            Origin: 'https://skillswap-client-monirujjaman.vercel.app',
          },
          configure: (proxy, _options) => {
            proxy.on('proxyRes', (proxyRes) => {
              const sc = proxyRes.headers['set-cookie'];
              if (sc) {
                // Ensure cookies work seamlessly on localhost by stripping Secure and using SameSite=Lax
                proxyRes.headers['set-cookie'] = sc.map((cookie: string) =>
                  cookie
                    .replace(/;\s*Secure/gi, '')
                    .replace(/;\s*SameSite=None/gi, '; SameSite=Lax')
                );
              }
            });
          },
        },
      },
    },
  };
});
