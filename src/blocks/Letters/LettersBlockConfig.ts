// src/blocks/Letters/config.ts
import { Block } from 'payload'

export const LettersBlock: Block = {
  slug: 'lettersBlock',
  labels: {
    singular: 'Letters Block',
    plural: 'Letters Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'displayType',
      type: 'radio',
      options: [
        {
          label: 'Show by count',
          value: 'count',
        },
        {
          label: 'Show specific letters',
          value: 'specific',
        },
      ],
      defaultValue: 'count',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'lettersCount',
      type: 'number',
      label: 'Number of letters to display',
      min: 1,
      max: 10,
      defaultValue: 3,
      admin: {
        condition: (data, siblingData) => siblingData.displayType === 'count',
      },
    },
    {
      name: 'selectedLetters',
      type: 'relationship',
      relationTo: 'letters',
      hasMany: true,
      label: 'Select letters',
      admin: {
        condition: (data, siblingData) => siblingData.displayType === 'specific',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      options: [
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Light Gray',
          value: 'lightGray',
        },
        {
          label: 'Brand Primary',
          value: 'brandPrimary',
        },
      ],
      defaultValue: 'white',
    },
  ],
}