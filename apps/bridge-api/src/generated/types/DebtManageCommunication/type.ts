import { objectType } from 'nexus'

export const DebtManageCommunication = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'DebtManageCommunication',
  description: `/ The underlying table does not contain a valid unique identifier and can therefore currently not be handled by the Prisma Client.
/ model custom_fields_display {
/ }`,
  definition(t) {
    t.int('id')
    t.int('invoice_id')
    t.int('communication_id')
    t.int('letter_no')
    t.int('type')
    t.nullable.int('company_id')
    t.int('uid')
    t.nullable.field('creation_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
