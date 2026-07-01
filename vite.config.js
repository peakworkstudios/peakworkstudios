import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      server: {
        historyApiFallback: true,
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (!id.includes('node_modules')) return
              if (id.includes('jspdf')) return 'pdf-tools'
              if (id.includes('react-dom') || id.includes('react-router-dom') || id.includes('/react/') || id.includes('scheduler') || id.includes('react-reconciler') || id.includes('its-fine') || id.includes('zustand') || id.includes('use-sync-external-store')) return 'react-core'
              if (id.includes('styled-components')) return 'ui-core'
              if (id.includes('lucide-react')) return 'icon-pack'
              if (id.includes('three') || id.includes('@react-three')) return '3d-engine'
            },
          },
        },
      },
      // Caching: Vite automatically hashes assets for long-term caching. Configure your hosting server to cache assets long-term and index.html short-term.
    })
