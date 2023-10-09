export const deepClone = (data: Array<any> | Object) => {
  return JSON.parse(JSON.stringify(data))
}
