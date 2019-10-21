import reshoot from '@reshoot/macro';

const data = reshoot('../../img/abc.png', {
  src: '',
  alt: '',
  aspectRatio: 1.4,
  blur: 5,
  color: '',
  placeholder: '',
  srcSet: ''
});

export const d1: string = data.src;
export const d2: string = data.alt;
export const d3: number = data.aspectRatio;
export const d4: number = data.blur;
export const d5: string = data.color;
export const d6: string = data.placeholder;
export const d7: string = data.srcSet;
