import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? '/dell-il-doc-verification-mockup/' : '/',
  plugins: [react()],
}));