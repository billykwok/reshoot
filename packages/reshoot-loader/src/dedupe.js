// @flow
export default function dedupe(array: Array<any>) {
  return array.filter((value, index, self) => self.indexOf(value) === index);
}
