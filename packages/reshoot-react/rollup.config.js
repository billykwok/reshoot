// @flow
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.jsx',
  output: { file: 'lib/index.js', format: 'cjs', sourcemap: false },
  plugins: [
    babel({
      babelrc: false,
      exclude: '../../node_modules/**',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-flow'
      ],
      extensions: ['.js', '.jsx'],
      plugins: [
        ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
        '@babel/plugin-proposal-optional-chaining'
      ]
    }),
    peerDepsExternal(),
    resolve({ extensions: ['.js', '.jsx'] }),
    commonjs({
      include: '../../node_modules/**',
      extensions: ['.js', '.jsx'],
      namedExports: {
        '../../node_modules/react-js/index.js': ['useState'],
        '../../node_modules/react-waypoint/cjs/index.js': ['Waypoint']
      }
    }),
    terser({
      sourcemap: false,
      toplevel: true,
      compress: {
        arguments: true,
        booleans_as_integers: true,
        hoist_funs: true,
        passes: 3,
        toplevel: true
      }
    })
  ]
};
