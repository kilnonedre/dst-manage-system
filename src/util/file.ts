export const getFilename = (file: File) => {
  return file.name.substring(0, file.name.lastIndexOf('.'))
}

export const getFileExtension = (file: File) => {
  return file.name.split('.').pop()
}
