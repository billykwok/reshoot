import reshoot from '@reshoot/macro';

const data1 = reshoot('../../img/abc.png', {
  src: '',
  alt: '',
  aspectRatio: 1.4,
  blur: 5,
  color: '',
  placeholder: '',
  srcSet: '',
  extra: 123
});

export const d1: string = data1.src;
export const d2: string = data1.alt;
export const d3: number = data1.aspectRatio;
export const d4: number = data1.blur;
export const d5: string = data1.color;
export const d6: string = data1.placeholder;
export const d7: string = data1.srcSet;
export const d8: number = data1.extra;

export const e1: string = data1[0].src;
export const e2: string = data1[0].alt;
export const e3: number = data1[0].aspectRatio;
export const e4: number = data1[0].blur;
export const e5: string = data1[0].color;
export const e6: string = data1[0].placeholder;
export const e7: string = data1[0].srcSet;
export const e8: number = data1[0].extra;

const data2 = reshoot('../../img/abc.png', {
  blur: 5,
  color: '',
  placeholder: '',
  srcSet: '',
  extra: 123
});

function Img(props: { src: string; srcSet: string; aspectRatio: number }) {
  return props;
}

Img(data2);
