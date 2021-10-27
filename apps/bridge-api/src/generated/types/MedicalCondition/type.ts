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
    t.string('custom_id')
    t.int('is_common')
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
    t.list.field('CmContactMedicalCondition', {
      type: 'CmContactMedicalCondition',
      args: {
        where: 'CmContactMedicalConditionWhereInput',
        orderBy: 'CmContactMedicalConditionOrderByWithRelationInput',
        cursor: 'CmContactMedicalConditionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactMedicalConditionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactMedicalCondition
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
