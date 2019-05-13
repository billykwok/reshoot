// @flow
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.jsx',
  output: { file: 'lib/index.js', format: 'cjs', sourcemap: false },
  external: [
    '@emotion/css',
    '@emotion/serialize',
    '@emotion/unitless',
    '@emotion/utils',
    'object-assign',
    'react'
  ],
  plugins: [
    babel({
      babelrc: false,
      runtimeHelpers: true,
      exclude: '../../node_modules/**',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-flow',
        [
          '@emotion/babel-preset-css-prop',
          { hoist: true, useBuiltIns: true, throwIfNamespace: true }
        ]
      ],
      extensions: ['.js', '.jsx'],
      plugins: ['@babel/plugin-proposal-optional-chaining']
    }),
    peerDepsExternal(),
    resolve({ extensions: ['.js', '.jsx'] }),
    replace({
      ENVIRONMENT: JSON.stringify('production'),
      'process.env.NODE_ENV': () => JSON.stringify('production')
    }),
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
