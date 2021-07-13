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
    t.list.field('CmContactAlert', {
      type: 'CmContactAlert',
      args: {
        where: 'CmContactAlertWhereInput',
        orderBy: 'CmContactAlertOrderByInput',
        cursor: 'CmContactAlertWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactAlertScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactAlert
      },
    })
    t.list.field('CmContactMedicalCondition', {
      type: 'CmContactMedicalCondition',
      args: {
        where: 'CmContactMedicalConditionWhereInput',
        orderBy: 'CmContactMedicalConditionOrderByInput',
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
