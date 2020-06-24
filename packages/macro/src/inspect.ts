import util from 'util';

function inspect(obj: any): string {
  return util.inspect(obj, false, null, true);
}

export default inspect;
