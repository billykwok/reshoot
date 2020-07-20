import notUndefined from './notUndefined';

export default notUndefined(typeof HTMLImageElement) &&
  'loading' in HTMLImageElement.prototype;
