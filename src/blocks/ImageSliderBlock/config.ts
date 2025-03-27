import type { Block } from 'payload'

export const ImageSliderBlock: Block = {
  slug: 'imageSlider',
  interfaceName: 'ImageSliderBlock',
  fields: [
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
