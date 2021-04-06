import { objectType, arg, extendType } from 'nexus'

export const HealthcodeInsurer = objectType({
  name: 'HealthcodeInsurer',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.code()
    t.model.name()
    t.model.edi()
    t.model.me()
    t.model.Company()
    t.model.InsuranceDetail()
  },
})

export const healthcodeInsurerQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.healthcodeInsurer()
    t.field('findFirstHealthcodeInsurer', {
      type: 'HealthcodeInsurer',
      args: {
        where: 'HealthcodeInsurerWhereInput',
        orderBy: arg({ type: 'HealthcodeInsurerOrderByInput' }),
        cursor: 'HealthcodeInsurerWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.healthcodeInsurer.findFirst(args as any)
      },
    })
    t.crud.healthcodeInsurers({ filtering: true, ordering: true })
    t.field('healthcodeInsurersCount', {
      type: 'Int',
      args: {
        where: 'HealthcodeInsurerWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.healthcodeInsurer.count(args as any)
      },
    })
  },
})

export const healthcodeInsurerMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneHealthcodeInsurer()
    t.crud.updateOneHealthcodeInsurer()
    t.crud.upsertOneHealthcodeInsurer()
    t.crud.deleteOneHealthcodeInsurer()
    t.crud.updateManyHealthcodeInsurer()
  },
})
