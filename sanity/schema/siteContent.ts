import { defineField, defineType } from 'sanity';

export const siteContentSchema = defineType({
  name: 'siteContent',
  title: 'Site Texts',
  type: 'document',
  preview: {
    prepare: () => ({ title: 'Site Texts' }),
  },
  fields: [
    defineField({
      name: 'homeText',
      title: 'Home Text',
      type: 'text',
      description: 'Short description shown at the bottom right of the home page.',
      rows: 3,
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
      description: 'Text shown inside the About modal.',
      rows: 12,
    }),
  ],
});
