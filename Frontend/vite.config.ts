import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
import EnvironmentPlugin from 'vite-plugin-environment';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // replace({
    //   preventAssignment: true,
    //   'process.env': JSON.stringify(process.env),
    // }),
    EnvironmentPlugin('all'),
  ],
});
