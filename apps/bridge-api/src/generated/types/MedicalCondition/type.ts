import { objectType } from 'nexus'

export const MedicalCondition = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MedicalCondition',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('company_id')
    t.nullable.string('custom_id')
    t.nullable.int('is_common')
    t.list.field('ContactAlert', {
      type: 'ContactAlert',
      args: {
        where: 'ContactAlertWhereInput',
        orderBy: 'ContactAlertOrderByWithRelationInput',
        cursor: 'ContactAlertWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ContactAlertScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ContactAlert
      },
    })
    t.list.field('ContactMedicalCondition', {
      type: 'ContactMedicalCondition',
      args: {
        where: 'ContactMedicalConditionWhereInput',
        orderBy: 'ContactMedicalConditionOrderByWithRelationInput',
        cursor: 'ContactMedicalConditionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ContactMedicalConditionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ContactMedicalCondition
      },
    })
    t.nullable.field('_count', {
      type: 'MedicalConditionCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
