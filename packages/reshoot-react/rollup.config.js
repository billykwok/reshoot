import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import linaria from 'linaria/rollup';
import css from 'rollup-plugin-css-only';

export default {
  input: 'src/index.ts',
  output: { file: 'lib/index.js', format: 'cjs', sourcemap: false },
  external: ['object-assign', 'react'],
  plugins: [
    linaria(),
    css({ output: 'lib/styles.css' }),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      exclude: '../../node_modules/**',
      presets: [
        '@babel/preset-env',
        [
          '@babel/preset-typescript',
          { isTSX: true, allExtensions: true, allowNamespaces: true }
        ],
        '@babel/preset-react'
      ],
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
      plugins: ['@babel/plugin-proposal-optional-chaining']
    }),
    peerDepsExternal(),
    resolve({ extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'] }),
    replace({
      ENVIRONMENT: JSON.stringify('production'),
      'process.env.NODE_ENV': () => JSON.stringify('production')
    }),
    commonjs({
      include: '../../node_modules/**',
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
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
        /* eslint-disable @typescript-eslint/camelcase */
        booleans_as_integers: true,
        hoist_funs: true,
        /* eslint-enable @typescript-eslint/camelcase */
        passes: 3,
        toplevel: true
      }
    })
  ]
};
