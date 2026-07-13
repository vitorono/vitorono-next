import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { projectSchema } from './sanity/schema/project';
import { siteContentSchema } from './sanity/schema/siteContent';

export default defineConfig({
  name: 'vitorono',
  title: 'Vitor Ono',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('project').title('Projects'),
            S.listItem()
              .title('Site Texts')
              .child(
                S.document()
                  .schemaType('siteContent')
                  .documentId('siteContent')
              ),
          ]),
    }),
  ],
  schema: {
    types: [projectSchema, siteContentSchema],
  },
});
