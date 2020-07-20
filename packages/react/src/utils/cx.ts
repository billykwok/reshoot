const cx = (...classNames: unknown[]): string =>
  classNames.filter((className) => className).join(' ');

export default cx;
