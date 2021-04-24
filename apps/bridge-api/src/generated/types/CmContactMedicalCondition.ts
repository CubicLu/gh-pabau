import { objectType, arg, extendType } from 'nexus'

export const CmContactMedicalCondition = objectType({
  name: 'CmContactMedicalCondition',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.contact_id()
    t.model.medical_condition_id()
    t.model.medical_record_id()
    t.model.is_active()
    t.model.CmContact()
    t.model.Company()
    t.model.MedicalCondition()
  },
})

export const cmContactMedicalConditionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmContactMedicalCondition()
    t.field('findFirstCmContactMedicalCondition', {
      type: 'CmContactMedicalCondition',
      args: {
        where: 'CmContactMedicalConditionWhereInput',
        orderBy: arg({ type: 'CmContactMedicalConditionOrderByInput' }),
        cursor: 'CmContactMedicalConditionWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactMedicalCondition.findFirst(args as any)
      },
    })
    t.crud.cmContactMedicalConditions({ filtering: true, ordering: true })
    t.field('cmContactMedicalConditionsCount', {
      type: 'Int',
      args: {
        where: 'CmContactMedicalConditionWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactMedicalCondition.count(args as any)
      },
    })
  },
})

export const cmContactMedicalConditionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmContactMedicalCondition()
    t.crud.updateOneCmContactMedicalCondition()
    t.crud.upsertOneCmContactMedicalCondition()
    t.crud.deleteOneCmContactMedicalCondition()
    t.crud.updateManyCmContactMedicalCondition()
  },
})
