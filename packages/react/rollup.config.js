import babel from '@rollup/plugin-babel';
import linaria from '@linaria/rollup';
import nodeExternals from 'rollup-plugin-node-externals';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.tsx',
  output: [
    {
      dir: 'lib/',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      sourcemap: true,
      generatedCode: 'es2015',
      freeze: false,
      externalLiveBindings: false,
      compact: true,
      exports: 'default',
    },
    {
      dir: 'lib/es',
      entryFileNames: '[name].mjs',
      format: 'es',
      sourcemap: true,
      generatedCode: 'es2015',
      freeze: false,
      externalLiveBindings: false,
      compact: true,
      exports: 'default',
    },
  ],
  treeshake: { moduleSideEffects: false, propertyReadSideEffects: false },
  plugins: [
    nodeExternals(),
    resolve({ extensions: ['.js', '.ts'] }),
    linaria(),
    postcss({
      minimize: true,
      inject: false,
      extract: 'styles.css',
      plugins: [postcssPresetEnv()],
    }),
    babel({
      babelrc: true,
      babelHelpers: 'runtime',
      extensions: ['.ts', '.tsx'],
      exclude: [/\.test\.tsx?/i, /node_modules\//i],
    }),
    replace({
      preventAssignment: false,
      ENVIRONMENT: JSON.stringify('production'),
      'process.env.NODE_ENV': JSON.stringify('production'),
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
        pure_funcs: ['console.info', 'console.debug', 'console.warn'],
      },
    }),
  ],
};
