export const isFormData = (object: object | undefined) => {
  if (Object.prototype.toString.call(object) !== '[object FormData]')
    return false
  return true
}
