import { bracketsVerified } from './verify'

export const iniToObj = (ini: string) => {
  const iniList: Array<string> = ini.split('\n').filter(Boolean)
  const iniObj = {} as any
  let key = ''
  iniList.map(ini => {
    if (bracketsVerified(ini)) {
      ini = ini.slice(1, -1)
      key = ini
      iniObj[ini] = {} as any
    } else {
      const kv = ini.split('=')
      iniObj[key][kv[0].trim()] = kv[1].trim()
    }
  })
  return iniObj
}

export const objToIni = (iniObj: any) => {
  const iniTitleList = Object.keys(iniObj)
  let iniStr = ''
  iniTitleList.map(title => {
    let str = ''
    for (const key in iniObj[title]) {
      str = str + `${key} = ${iniObj[title][key]}\n`
    }
    iniStr = iniStr + `\n[${title}]\n${str}`
  })
  return iniStr
}
