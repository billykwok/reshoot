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
      exports: 'default',
    },
    {
      dir: 'lib/es',
      entryFileNames: '[name].mjs',
      format: 'es',
      sourcemap: true,
      generatedCode: 'es2015',
      freeze: false,
      compact: true,
      exports: 'default',
    },
  ],
  treeshake: { moduleSideEffects: false, propertyReadSideEffects: false },
  plugins: [
    nodeExternals(),
    peerDepsExternal(),
    resolve({ extensions: ['.js', '.ts'] }),
    babel({
      babelrc: true,
      babelHelpers: 'bundled',
      extensions: ['.ts'],
      exclude: [/\.test\.ts/i, /node_modules\//i],
    }),
    {
      name: 'retain-import-expression',
      resolveDynamicImport(specifier) {
        if (specifier === 'unist-util-visit-parents') return false;
        return null;
      },
      renderDynamicImport({ targetModuleId }) {
        if (targetModuleId === 'unist-util-visit-parents')
          return { left: 'import(', right: ')' };
      },
    },
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
        hoist_funs: true,
        passes: 3,
        toplevel: true,
        pure_funcs: ['console.info', 'console.debug', 'console.warn'],
      },
    }),
  ],
};
