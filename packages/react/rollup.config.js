import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import linaria from 'linaria/rollup';
import css from 'rollup-plugin-css-only';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'cjs',
    sourcemap: false,
    freeze: false,
    compact: true,
    exports: 'auto',
  },
  external: ['object-assign', 'react', 'linaria'],
  treeshake: { moduleSideEffects: false, propertyReadSideEffects: false },
  plugins: [
    linaria(),
    css({ output: 'lib/styles.css' }),
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      exclude: '../../node_modules/**',
      presets: [
        '@babel/preset-modules',
        [
          '@babel/preset-typescript',
          { isTSX: true, allExtensions: true, allowNamespaces: true },
        ],
        '@babel/preset-react',
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    peerDepsExternal(),
    resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    replace({
      ENVIRONMENT: JSON.stringify('production'),
      'process.env.NODE_ENV': () => JSON.stringify('production'),
    }),
    commonjs({
      include: '../../node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    terser({
      toplevel: true,
      mangle: { properties: { regex: /^__/ } },
      ecma: 2015,
      compress: {
        arguments: true,
        booleans_as_integers: true,
        hoist_funs: true,
        passes: 3,
        toplevel: true,
      },
    }),
  ],
};
