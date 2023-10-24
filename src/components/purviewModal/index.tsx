import React, { useState, useEffect } from 'react'
import NextSelect from '../nextSelect'
import mainTypes from '@/types/purviewType.d'
import { createPlayer, updatePlayer } from '@/api'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react'
import types from './purviewModalType.d'
import { purviewList } from '@/config/purview'
import { kleiIdVerified } from '@/util/verify'

const PurviewModal = (props: types.ConfigProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [kleiId, setKleiId] = useState('')
  const [purview, setPurview] = useState<mainTypes.ConfigPurview>('normal')
  const [isLoading, setIsLoading] = useState(false)
  const [isCreate, setIsCreate] = useState(true)

  useEffect(() => {
    setKleiId(props.player?.klei_id || '')
    setPurview((props.player?.purview as mainTypes.ConfigPurview) || 'normal')
    setIsCreate(!props.player)
  }, [props.player])

  const edit = async (callback: Function) => {
    console.log(kleiId, purview)
    if (!kleiIdVerified(kleiId)) {
      setErrorMessage('请输入正确的科雷ID')
      return
    }
    errorMessage !== '' && setErrorMessage('')
    const params: types.ConfigParams = {
      kleiId,
      purview,
    }
    if (!isCreate) {
      params.id = props.player?.id
    }
    setIsLoading(true)
    const response = isCreate
      ? await createPlayer(params)
      : await updatePlayer(params)
    const { code, msg } = await response.json()
    setIsLoading(false)
    if (code !== 200) {
      setErrorMessage(msg)
      return
    }
    props.reRender()
    callback()
  }

  const openChange = () => {
    setErrorMessage('')
    setIsLoading(false)
    props.onOpenChange()
  }

  return (
    <Modal isOpen={props.isOpen} onOpenChange={openChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {props.title}
            </ModalHeader>
            <ModalBody>
              <Input
                size="sm"
                isClearable
                type="text"
                onValueChange={setKleiId}
                isInvalid={!!errorMessage}
                errorMessage={errorMessage}
                defaultValue={props.player?.klei_id || ''}
                placeholder="请输入科雷ID"
              />
              <NextSelect
                placeholder="test"
                size="sm"
                list={purviewList}
                noEmpty={true}
                default={props.player?.purview || purview}
                select={(p: mainTypes.ConfigPurview) => setPurview(p)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                color="danger"
                variant="light"
                onPress={onClose}
              >
                取消
              </Button>
              <Button
                size="sm"
                color="primary"
                isLoading={isLoading}
                onPress={() => edit(onClose)}
              >
                确认
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default PurviewModal
