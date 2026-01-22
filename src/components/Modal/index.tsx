import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ModalDisplay } from './ModalDisplay.client'
import { Modal as ModalType } from '@/payload-types'

export async function Modal() {
  const modal = (await getCachedGlobal('modal', 1)()) as ModalType

  if (!modal || !modal.enabled) {
    return null
  }

  return <ModalDisplay modal={modal} />
}
