import { objectType, arg, extendType } from 'nexus'

export const MedicalCondition = objectType({
  name: 'MedicalCondition',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.company_id()
    t.model.custom_id()
    t.model.is_common()
    t.model.CmContactAlert()
  },
})

export const medicalConditionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.medicalCondition()
    t.field('findFirstMedicalCondition', {
      type: 'MedicalCondition',
      args: {
        where: 'MedicalConditionWhereInput',
        orderBy: arg({ type: 'MedicalConditionOrderByInput' }),
        cursor: 'MedicalConditionWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.medicalCondition.findFirst(args as any)
      },
    })
    t.crud.medicalConditions({ filtering: true, ordering: true })
    t.field('medicalConditionsCount', {
      type: 'Int',
      args: {
        where: 'MedicalConditionWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.medicalCondition.count(args as any)
      },
    })
  },
})

export const medicalConditionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneMedicalCondition()
    t.crud.updateOneMedicalCondition()
    t.crud.upsertOneMedicalCondition()
    t.crud.deleteOneMedicalCondition()
    t.crud.updateManyMedicalCondition()
  },
})
