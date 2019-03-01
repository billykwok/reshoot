// @flow
export default function resizeImages(
  image: any,
  meta: any,
  placeholder: any,
  mime: string,
  options: any
) {
  const widthSet = new Set([placeholder.size]);
  const promises = [image.resize(placeholder.size, mime, options)];
  const sizeToWidthMap = new Map();

  if (options.shape.srcSet) {
    options.srcSet.forEach(size => {
      const width = Math.min(meta.width, size);
      sizeToWidthMap.set(size, width);
      if (width === meta.width) return;
      if (!widthSet.has(width)) {
        widthSet.add(width);
        promises.push(image.resize(width, mime, options));
      }
    });
  }

  return [promises, sizeToWidthMap];
}
