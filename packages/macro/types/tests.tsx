import reshoot from '@reshoot/macro';

const data = reshoot('../../img/abc.png', {
  src: '',
  alt: '',
  aspectRatio: 1.4,
  blur: 5,
  color: '',
  placeholder: '',
  srcSet: '',
  extra: 123
});

export const d1: string = data.src;
export const d2: string = data.alt;
export const d3: number = data.aspectRatio;
export const d4: number = data.blur;
export const d5: string = data.color;
export const d6: string = data.placeholder;
export const d7: string = data.srcSet;
export const d8: number = data.extra;

export const e1: string = data[0].src;
export const e2: string = data[0].alt;
export const e3: number = data[0].aspectRatio;
export const e4: number = data[0].blur;
export const e5: string = data[0].color;
export const e6: string = data[0].placeholder;
export const e7: string = data[0].srcSet;
export const e8: number = data[0].extra;
