import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      // Set security headers for development mode
      'Content-Security-Policy': mode === 'development' 
        ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* ws://localhost:* chrome-extension:* moz-extension:* 'wasm-unsafe-eval' 'inline-speculation-rules'; script-src-elem 'self' 'unsafe-inline' http://localhost:* chrome-extension:*; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; connect-src 'self' http://localhost:* ws://localhost:* wss://localhost:*; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-src 'self' http://localhost:*; child-src 'self' http://localhost:*;"
        : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https: wss: ws:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';",
      'X-Frame-Options': mode === 'development' ? 'SAMEORIGIN' : 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
