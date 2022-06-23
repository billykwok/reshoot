import babel from '@rollup/plugin-babel';
import nodeExternals from 'rollup-plugin-node-externals';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'lib/',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      sourcemap: true,
      generatedCode: 'es2015',
      freeze: false,
      compact: true,
      exports: 'named',
    },
    {
      dir: 'lib/es',
      entryFileNames: '[name].mjs',
      format: 'es',
      sourcemap: true,
      generatedCode: 'es2015',
      freeze: false,
      compact: true,
      exports: 'named',
    },
  ],
  external: [
    /@reshoot\//i,
    /@babel\/runtime-corejs3/i,
    /stringify-object/i,
    /loader-utils/i,
  ],
  treeshake: { moduleSideEffects: false, propertyReadSideEffects: false },
  plugins: [
    resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    nodeExternals(),
    peerDepsExternal(),
    resolve(),
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
