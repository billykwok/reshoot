import util from 'util';

function inspect(obj: any) {
  return util.inspect(obj, false, null, true);
}

export default inspect;
