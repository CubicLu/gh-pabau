import { objectType } from 'nexus'

export const ServiceProcedure = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ServiceProcedure',
  definition(t) {
    t.int('id')
    t.int('sid')
    t.string('name')
    t.nullable.string('sites')
    t.nullable.string('external_code')
    t.nullable.string('notes')
    t.nullable.int('procedure_group_id')
    t.nullable.string('modality_type')
    t.int('company_id')
    t.int('uid')
    t.nullable.field('creation_date', { type: 'DateTime' })
    t.field('Service', {
      type: 'CompanyService',
      resolve(root: any) {
        return root.Service
      },
    })
  },
})
