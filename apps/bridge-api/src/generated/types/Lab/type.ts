import { objectType } from 'nexus'

export const Lab = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Lab',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('is_active')
    t.string('lab_name')
    t.string('lab_email')
    t.string('lab_street')
    t.string('lab_street2')
    t.string('lab_city')
    t.string('lab_county')
    t.string('lab_postal')
    t.string('lab_phone')
    t.string('lab_provider_no')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('LabRequest', {
      type: 'LabRequest',
      args: {
        where: 'LabRequestWhereInput',
        orderBy: 'LabRequestOrderByWithRelationInput',
        cursor: 'LabRequestWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'LabRequestScalarFieldEnum',
      },
      resolve(root: any) {
        return root.LabRequest
      },
    })
    t.field('_count', {
      type: 'LabCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
