export function jsx(strings: any, ...values: any) {
  let out = "";
  strings.forEach((string: string, i: string | number) => {
    const value = values[i];

    // Array - Join to string and output with value
    if (Array.isArray(value)) {
      out += string + value.join("");
    }
    // String - Output with value
    else if (typeof value === "string") {
      out += string + value;
    }
    // Number - Coerce to string and output with value
    // This would happen anyway, but for clarity's sake on what's happening here
    else if (typeof value === "number") {
      out += string + String(value);
    }
    // object, undefined, null, boolean - Don't output a value.
    else {
      out += string;
    }
  });
  return out;
}

export function generateGUID() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);

  array[6] = (array[6] & 0x0f) | 0x40;
  array[8] = (array[8] & 0x3f) | 0x80;

  let guid = "";
  for (let i = 0; i < array.length; i++) {
    let value = array[i].toString(16);
    if (value.length === 1) {
      value = "0" + value;
    }
    guid += value;
    if (i === 3 || i === 5 || i === 7 || i === 9) {
      guid += "-";
    }
  }
  return guid;
}
export default { jsx, generateGUID };
