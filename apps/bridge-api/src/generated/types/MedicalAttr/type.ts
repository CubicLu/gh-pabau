import { objectType } from 'nexus'

export const MedicalAttr = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MedicalAttr',
  definition(t) {
    t.int('id')
    t.nullable.string('name')
    t.nullable.field('created_at', { type: 'DateTime' })
    t.nullable.field('updated_at', { type: 'DateTime' })
    t.nullable.field('deleted_at', { type: 'DateTime' })
    t.nullable.int('company_id')
    t.string('description')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('MedicalContactAttr', {
      type: 'MedicalContactAttr',
      args: {
        where: 'MedicalContactAttrWhereInput',
        orderBy: 'MedicalContactAttrOrderByWithRelationInput',
        cursor: 'MedicalContactAttrWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalContactAttrScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalContactAttr
      },
    })
    t.nullable.field('_count', {
      type: 'MedicalAttrCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
