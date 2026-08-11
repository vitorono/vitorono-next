import { defineField, defineType } from 'sanity';

const PROCESS_DEFAULT = [
  { title: 'Kickoff', description: 'Scope is fixed and the timeline is set.' },
  {
    title: 'Direction',
    description:
      'I design the home page first. You review type, layout, motion, and art direction here, because this decision carries across the whole site.',
  },
  { title: 'Build', description: 'The full site goes up with your content in place. You review how it coheres.' },
  { title: 'Launch', description: 'A final tightening pass, then the site goes live and transfers to you.' },
];

const AFTER_LAUNCH_DEFAULT =
  'Every build includes one month of the Essentials care plan, free, starting at handoff. Care keeps the site current, so your showcase never falls behind the work it exists to present.';

const INVESTMENT_DESCRIPTION_DEFAULT =
  '50% to begin. This reserves your build slot and starts the work.\n\n50% on handoff.\n\nThis covers design and build. It does not include hosting, domain, or third-party service fees, which are billed to you directly by those providers. Full payment terms are in the Statement of Work.';

const ACCEPTING_TERMS_DEFAULT =
  'If this works for you, reply and I will send the Statement of Work: the operating agreement with the full terms, scope detail, and schedule.\n\nYou sign it, the deposit invoice goes out, and we book the kickoff.';

const SITEMAP_DEFAULT = [
  { path: 'home/', depth: 0 },
  { path: 'about-us/', depth: 0 },
  { path: 'projects/', depth: 0 },
  { path: 'projects/item:', depth: 1 },
  { path: 'contact/', depth: 0 },
];

const SCOPE_DEFAULT = [
  'One CMS collection for your projects, considered motion and interaction across the site, on-page SEO, native Framer analytics, and responsive layouts for desktop, tablet, and mobile.',
  'The whole thing is designed and built in Framer as a single act, by one person. There is no handoff between a designer and a developer, so the art direction that gets approved is the art direction that ships.',
  'Full scope, including what sits outside it, is defined in the Statement of Work.',
].join('\n\n');

export const proposalSchema = defineType({
  name: 'proposal',
  title: 'Proposal',
  type: 'document',
  fields: [
    defineField({
      name: 'projectName',
      title: 'Project Name',
      description: 'Internal label for this proposal — not shown to the client.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      description:
        'Switches the template\'s labels and section titles. Content fields are unaffected — write them in whichever language you choose.',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Português (BR)', value: 'pt-BR' },
        ],
      },
      initialValue: 'en',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'clientCompany',
      title: 'Client Company',
      description: 'Shown as the big heading, next to "PROJECT PROPOSAL".',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      description: 'The contact person — shown in the "for" row.',
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
      name: 'sitemap',
      title: 'Sitemap',
      description:
        'Routes shown in the collapsible sitemap tree, rendered as ".{path}" — include a trailing slash for folders (e.g. "about-us/").',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'path', title: 'Path', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'depth',
              title: 'Depth',
              description: '0 = top level, 1 = nested under the item above it, and so on.',
              type: 'number',
              options: { list: [0, 1, 2] },
              initialValue: 0,
              validation: (r) => r.required().min(0).max(2),
            }),
          ],
          preview: {
            select: { title: 'path', subtitle: 'depth' },
            prepare: ({ title, subtitle }: { title?: string; subtitle?: number }) => ({
              title: `.${title ?? ''}`,
              subtitle: `depth ${subtitle ?? 0}`,
            }),
          },
        },
      ],
      initialValue: SITEMAP_DEFAULT,
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'scope',
      title: 'Scope Description',
      description: 'Prose shown below the sitemap tree.',
      type: 'text',
      initialValue: SCOPE_DEFAULT,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'process',
      title: 'How the Work Runs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (r) => r.required(),
            }),
          ],
        },
      ],
      initialValue: PROCESS_DEFAULT,
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'afterLaunchNote',
      title: 'After Launch',
      type: 'text',
      initialValue: AFTER_LAUNCH_DEFAULT,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'carePlansUrl',
      title: 'Care Plans URL',
      description: 'Optional — if set, adds a "view care plans" link to the after-launch row.',
      type: 'url',
    }),
    defineField({
      name: 'myWork',
      title: 'My Work',
      description: 'Select projects from the Projects collection to show as examples.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
    defineField({
      name: 'investmentValue',
      title: 'Investment Value',
      description: 'e.g. "U$3,000" — shown underlined above the description.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'investment',
      title: 'Investment Description',
      description: 'Free-form — line breaks are preserved as written.',
      type: 'text',
      initialValue: INVESTMENT_DESCRIPTION_DEFAULT,
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
      name: 'acceptingTerms',
      title: 'Accepting Terms',
      type: 'text',
      initialValue: ACCEPTING_TERMS_DEFAULT,
      validation: (r) => r.required(),
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
    select: { title: 'projectName', subtitle: 'clientCompany' },
  },
});
