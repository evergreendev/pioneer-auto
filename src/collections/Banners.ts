import { CollectionConfig } from 'payload'
import {
  AlignFeature,
  BlocksFeature, FixedToolbarFeature,
  HeadingFeature, HorizontalRuleFeature, InlineToolbarFeature,
  lexicalEditor, OrderedListFeature,
  ParagraphFeature, UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { FormBlock } from '@/blocks/Form/config'
import { LinkBlock } from '@/blocks/LinkBlock/config'
import { HoursBlock } from '@/blocks/HoursBlock/HoursBlockConfig'

export const Banners: CollectionConfig = {
  slug: 'banners',
  admin: {
    defaultColumns: ['title','expirationDate', 'isActive', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        description: 'A descriptive title for this banner (e.g., "Summer Hours", "Holiday Hours")',
      },
    },
    {
      name: 'message',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            AlignFeature(),
            ParagraphFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [MediaBlock, FormBlock, LinkBlock, HoursBlock] }),
            OrderedListFeature(),
            UnorderedListFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            AlignFeature(),
          ]
        },
      }),
      label: 'Banner Message',
    },
    {
      name: 'expirationDate',
      type: 'date',
      required: true,
      label: 'Expiration Date',
      admin: {
        description: 'The banner will stop showing after this date',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Is Active',
      admin: {
        description: 'Uncheck to manually hide the banner',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      admin: {
        description: 'Enter a valid CSS color (e.g., #FF0000, rgb(255,0,0), red)',
      },
      defaultValue: '#f0f0f0',
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Color',
      admin: {
        description: 'Enter a valid CSS color (e.g., #000000, rgb(0,0,0), black)',
      },
      defaultValue: '#000000',
    },
  ],
}

export default Banners
