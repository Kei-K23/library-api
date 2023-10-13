export function isEmptyObj(o: Object) {
  for (let key in o) {
    if (o.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function isPropExit(o: Object, n: string) {
  for (let key in o) {
    if (key === n) {
      return true;
    }
  }
  return false;
}
