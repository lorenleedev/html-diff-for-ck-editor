import { createRequire } from 'node:module';

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
const require = createRequire( import.meta.url );

export default defineConfig({
  build: {
    target: "es2018",
    lib: {
      entry: 'src/sample/sample.ts',
      name: 'sample',
      fileName: 'sample'
    },
    rollupOptions: {
      output: {
        format: 'es',
      }
    }
  },
  plugins: [
    ckeditor5( {
      theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
    }),
    dts() // d.ts를 생성하여 타입정보 유지
  ],
});