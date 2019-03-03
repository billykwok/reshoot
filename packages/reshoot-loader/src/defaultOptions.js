// @flow
import type { Options } from './type';

export function generateDefaultOptions(env: string): Options {
  return {
    name: '[contenthash:16]-[width].[ext]',
    outputPath: null,
    publicPath: null,
    context: null,
    shape: {
      mime: 'mime',
      src: 'src',
      aspectRatio: 'aspectRatio',
      srcSet: 'srcSet',
      placeholder: 'placeholder',
      color: 'color'
    },
    srcSet: [480, 640, 840, 1080],
    quality: 80,
    background: '#fff',
    color: 'DarkMuted',
    forceFormat: false,
    placeholder: {
      size: 10,
      trimDataUrl: false
    },
    aspectRatio: {
      type: 'heightByWidth',
      format: 'percent',
      decimal: 2
    },
    disable: env === 'development',
    emitFile: true
  };
}

export default generateDefaultOptions(process.env.NODE_ENV);
