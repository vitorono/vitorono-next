import { defineField, defineType } from 'sanity';

export const proposalSchema = defineType({
  name: 'proposal',
  title: 'Proposal',
  type: 'document',
  fields: [
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Generated automatically from the project name — just click Generate.',
      options: { source: 'projectName' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      description: 'Soft gate only — never shown publicly. Do not reuse a real password.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'projectDescription',
      title: 'Project Description',
      type: 'text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'approach',
      title: 'Approach',
      type: 'text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'scope',
      title: 'Scope',
      description: 'Bullet list of what is included.',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'myWork',
      title: 'My Work',
      description: 'Links to past work shown as examples.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'url', title: 'URL', type: 'url', validation: (r) => r.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: 'investment',
      title: 'Investment',
      description: 'Free-form — line breaks are preserved as written.',
      type: 'text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      description: 'Free-form — line breaks are preserved as written.',
      type: 'text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'scheduleUrl',
      title: 'Schedule URL',
      description: 'Optional — if set, adds a "[ schedule ]" link to next steps.',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'projectName', subtitle: 'clientName' },
  },
});
