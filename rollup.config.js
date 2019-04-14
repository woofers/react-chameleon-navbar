import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
const dependencies = Object.keys(require('./package.json').dependencies)

const config = {
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      uglify()
    ],
    input: 'src/chameleon.js',
    external: dependencies,
    output: {
      format: 'cjs',
      file: 'dist/react-chameleon-status-bar.min.js',
      name: 'react-chameleon-status-bar'
    }
}
export default config
