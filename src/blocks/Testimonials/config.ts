import { Block } from 'payload'

export const TestimonialBlock: Block = {
  slug: 'testimonialsBlock',
  labels: {
    singular: 'Testimonials Block',
    plural: 'Testimonials Blocks',
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
          label: 'Show specific testimonials',
          value: 'specific',
        },
      ],
      defaultValue: 'count',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'testimonialsCount',
      type: 'number',
      label: 'Number of testimonials to display',
      min: 1,
      max: 10,
      defaultValue: 3,
      admin: {
        condition: (data, siblingData) => siblingData.displayType === 'count',
      },
    },
    {
      name: 'selectedTestimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      label: 'Select testimonials',
      admin: {
        condition: (data, siblingData) => siblingData.displayType === 'specific',
      },
    },
    {
      name: 'showAsCarousel',
      type: 'checkbox',
      label: 'Display as carousel',
      defaultValue: false,
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
