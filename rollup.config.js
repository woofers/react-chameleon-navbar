import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
const json = require('./package.json')
const dependencies = [
  ...Object.keys(json.dependencies),
  ...Object.keys(json.peerDependencies)
]

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
