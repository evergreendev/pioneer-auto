// src/blocks/HoursBlock/config.ts
import { Block } from 'payload';

export const HoursBlock: Block = {
  slug: 'hoursBlock',
  labels: {
    singular: 'Hours Block',
    plural: 'Hours Blocks',
  },
  fields: [
    {
      name: 'type',
      label: 'Display Type',
      type: 'radio',
      options: [
        {
          label: 'Current Hour',
          value: 'current',
        },
        {
          label: 'All Future Hours',
          value: 'future',
        },
      ],
      defaultValue: 'future',
      admin: {
        layout: 'horizontal',
      },
      required: true,
    },
    {
      name: 'maxHoursToShow',
      label: 'Maximum Hours to Show',
      type: 'number',
      min: 1,
      max: 20,
      defaultValue: 5,
      admin: {
        condition: (data, siblingData) => siblingData?.type === 'future',
        description: 'Maximum number of future hours to display',
      },
    },
  ],
};
