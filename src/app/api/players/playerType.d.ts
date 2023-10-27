interface ConfigGetParams {
  purview: string
  kleiId: string
  page: number
}

interface ConfigPostParams {
  kleiId: string
  purview: string
}

type ConfigPutParams = ConfigPostParams & ConfigDeleteParams

interface ConfigDeleteParams {
  id: number
}

export {
  ConfigGetParams,
  ConfigPostParams,
  ConfigPutParams,
  ConfigDeleteParams,
}
