/* eslint-disable @typescript-eslint/no-explicit-any */
export const swapKeysAndValues = (obj: {
  [key: string]: any
}): { [key: string]: any } => {
  const swappedObj: { [key: string]: any } = {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      swappedObj[obj[key]] = key
    }
  }
  return swappedObj
}
