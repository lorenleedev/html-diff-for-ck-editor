import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    target: "es2018",
    lib: {
      entry: 'src/package/main.ts',
      name: 'index',
      fileName: 'index'
    }
  },
  plugins: [
    dts() // d.ts를 생성하여 타입정보 유지
  ],
});