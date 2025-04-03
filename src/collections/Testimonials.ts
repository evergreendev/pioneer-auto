import { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'testimonial',
      type: 'richText',
      required: true,
      label: 'Testimonial',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
  ],
}

export default Testimonials
