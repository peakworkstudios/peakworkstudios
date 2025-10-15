import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      server: {
        historyApiFallback: true,
      },
      // Caching: Vite automatically hashes assets for long-term caching. Configure your hosting server to cache assets long-term and index.html short-term.
    })
