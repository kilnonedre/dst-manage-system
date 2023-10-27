import { response } from '@/util/backend'
import { writeFile } from 'fs/promises'
import fs from 'fs'
import { NextRequest } from 'next/server'
import { join } from 'path'
import compressing from 'compressing'
import { ConfigFileExtension } from './fileType.d'
import { File_PATH } from '@/config/env'
import { getFileExtension, getFilename } from '@/util/file'

export const POST = async (request: NextRequest) => {
  const formData = await request.formData()
  const file = formData.get('file') as File
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const path = join(File_PATH, 'upload')
  const filePath = join(path, file.name)
  const filename = getFilename(file)
  const fileExtension = (getFileExtension(file) as string).toLowerCase()
  await writeFile(filePath, buffer)
  await compressing[fileExtension as ConfigFileExtension].uncompress(
    filePath,
    path
  )
  await fs.unlinkSync(filePath)
  const data = {
    master: '',
    masterMod: '',
    caves: '',
    cavesMod: '',
  }
  const masterPath = join(path, filename, 'Master')
  const cavesPath = join(path, filename, 'Caves')
  data.master = await fs.readFileSync(
    join(masterPath, 'leveldataoverride.lua'),
    'utf-8'
  )
  data.masterMod = await fs.readFileSync(
    join(masterPath, 'modoverrides.lua'),
    'utf-8'
  )
  data.caves = await fs.readFileSync(
    join(cavesPath, 'leveldataoverride.lua'),
    'utf-8'
  )
  data.cavesMod = await fs.readFileSync(
    join(cavesPath, 'modoverrides.lua'),
    'utf-8'
  )
  return response(200, 200, data)
}
