// eslint-disable-next-line @typescript-eslint/ban-types
function omitInJsxView<T extends { toString: () => string }>(
  v: T,
  desc: string
): T {
  v.toString = () => desc;
  return v;
}

export default omitInJsxView;
