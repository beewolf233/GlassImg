import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
export default {
  input: 'src/index.ts', // 要打包的文件源路径
  output: { // 文件输出配置
    file: 'dist/glassImg.min.js',
    format: 'umd',
    name: 'GlassImg',
    sourcemap: true
  },
  plugins: [ // 使用插件
    typescript(),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}