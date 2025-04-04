import { CollectionConfig } from 'payload';

// Define the Hours collection
const Hours: CollectionConfig = {
  slug: 'hours',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'hoursStart', 'hoursEnd'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Label',
      required: true,
      admin: {
        description: 'A descriptive label for this hours entry (e.g., "Summer Hours", "Holiday Hours")',
      },
    },
    {
      name: 'hoursStart',
      type: 'date',
      label: 'Hours Start Date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MM/DD',
        },
        description: 'Select the start date',
      },
    },
    {
      name: 'hoursEnd',
      type: 'date',
      label: 'Hours End Date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MM/DD',
        },
        description: 'Select the end date',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      admin: {
        description: 'The detailed information about these hours',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        description: 'Check this to make these hours visible on the site',
        position: 'sidebar',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sort Order',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
        position: 'sidebar',
      },
    },
  ],
};

export default Hours;
