import { objectType } from 'nexus'

export const GlCode = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'GlCode',
  description: `/ The underlying table does not contain a valid unique identifier and can therefore currently not be handled by the Prisma Client.
/ model face_body_diagram_settings {
/ }`,
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('code')
    t.field('description', { type: 'gl_codes_description' })
    t.nullable.int('related_to')
    t.nullable.field('InvPaymentType', {
      type: 'InvPaymentType',
      resolve(root: any) {
        return root.InvPaymentType
      },
    })
  },
})
