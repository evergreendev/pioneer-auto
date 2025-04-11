// src/collections/Letters.ts
import { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Letters: CollectionConfig = {
  slug: 'letters',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'senderName',
    defaultColumns: ['senderName', 'date', 'updatedAt'],
  },
  fields: [
    {
      name: 'senderName',
      type: 'text',
      required: true,
      label: 'Sender Name',
    },
    {
      name: 'date',
      type: 'date',
      label: 'Letter Date',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Letter Content',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Feature this letter',
      defaultValue: false,
    },
  ],
}
