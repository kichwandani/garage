import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
<<<<<<< HEAD
  // This is the fix: It ensures assets are loaded from the /garage/ subfolder
  base: '/garage/', 
  
  plugins: [
=======
  base: '/garage/',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
>>>>>>> 18ba8f338cb149c00263ddd2fccaa17fe18b1811
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
<<<<<<< HEAD
=======
      // Alias @ to the src directory
>>>>>>> 18ba8f338cb149c00263ddd2fccaa17fe18b1811
      '@': path.resolve(__dirname, './src'),
    },
  },

<<<<<<< HEAD
=======
  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
>>>>>>> 18ba8f338cb149c00263ddd2fccaa17fe18b1811
  assetsInclude: ['**/*.svg', '**/*.csv'],
})