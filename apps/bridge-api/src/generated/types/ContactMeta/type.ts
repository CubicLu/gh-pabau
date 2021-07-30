import { objectType } from 'nexus'

export const ContactMeta = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ContactMeta',
  definition(t) {
    t.int('id')
    t.int('contact_id')
    t.string('meta_name')
    t.string('meta_value')
    t.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
  },
})
