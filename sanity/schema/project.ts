import { defineField, defineType } from 'sanity';

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'Display number, e.g. 001',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Generated automatically from the name — just click Generate.',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Brand / Web',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'previewVideo',
      title: 'Preview Video URL',
      type: 'url',
      description: 'MP4 URL that plays on hover (e.g. from R2 or any CDN).',
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      description: 'Fallback image if there is no video.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'url',
      title: 'Live Site URL',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Number',
      name: 'numberAsc',
      by: [{ field: 'number', direction: 'asc' }],
    },
  ],
});
