import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const LinkBlock: Block = {
  slug: 'linkBlock',
  interfaceName: 'linkBlock',
  fields: [
    linkGroup({overrides: {
      required: true,
        maxRows: 1,
      },
      appearances: ['default', 'highlight'],
    }),
  ],
  labels: {
    plural: 'Links',
    singular: 'Link',
  },
}
