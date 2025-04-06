import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Removendo a importação do lovable-tagger que é incompatível com Vite 6
// import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  optimizeDeps: {
    include: ['jspdf', 'html2canvas']
  },
  build: {
    commonjsOptions: {
      include: [/jspdf/, /node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          jspdf: ['jspdf'],
          html2canvas: ['html2canvas']
        }
      }
    }
  }
}));
