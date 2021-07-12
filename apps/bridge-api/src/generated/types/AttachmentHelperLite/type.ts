import { objectType } from 'nexus'

export const AttachmentHelperLite = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AttachmentHelperLite',
  definition(t) {
    t.int('id')
    t.int('contact_id')
    t.string('f')
    t.string('x')
    t.int('type')
  },
})
