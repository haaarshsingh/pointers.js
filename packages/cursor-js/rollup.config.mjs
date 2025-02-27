import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.js', format: 'umd', name: 'AnimatedCursor' },
    { file: 'dist/index.esm.js', format: 'es' },
  ],
  plugins: [resolve(), commonjs(), typescript()],
}
