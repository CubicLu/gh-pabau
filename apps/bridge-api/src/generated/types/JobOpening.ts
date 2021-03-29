import { objectType, arg, extendType } from 'nexus'

export const JobOpening = objectType({
  name: 'JobOpening',
  definition(t) {
    t.model.openingid()
    t.model.opening_title()
    t.model.hiring_manager()
    t.model.start_date()
    t.model.end_date()
    t.model.status()
    t.model.published()
    t.model.company_id()
    t.model.description()
    t.model.attached_forms()
    t.model.created_date()
    t.model.Company()
  },
})

export const jobOpeningQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.jobOpening()
    t.field('findFirstJobOpening', {
      type: 'JobOpening',
      args: {
        where: 'JobOpeningWhereInput',
        orderBy: arg({ type: 'JobOpeningOrderByInput' }),
        cursor: 'JobOpeningWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.jobOpening.findFirst(args as any)
      },
    })
    t.crud.jobOpenings({ filtering: true, ordering: true })
    t.field('jobOpeningsCount', {
      type: 'Int',
      args: {
        where: 'JobOpeningWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.jobOpening.count(args as any)
      },
    })
  },
})

export const jobOpeningMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneJobOpening()
    t.crud.updateOneJobOpening()
    t.crud.upsertOneJobOpening()
    t.crud.deleteOneJobOpening()
  },
})
