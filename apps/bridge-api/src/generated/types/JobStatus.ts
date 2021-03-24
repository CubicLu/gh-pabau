import { objectType, arg, extendType } from 'nexus'

export const JobStatus = objectType({
  name: 'JobStatus',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.name()
    t.model.status()
    t.model.order()
    t.model.Company()
  },
})

export const jobStatusQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.jobStatus()
    t.field('findFirstJobStatus', {
      type: 'JobStatus',
      args: {
        where: 'JobStatusWhereInput',
        orderBy: arg({ type: 'JobStatusOrderByInput' }),
        cursor: 'JobStatusWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.jobStatus.findFirst(args as any)
      },
    })
    t.crud.jobStatuses({ filtering: true, ordering: true })
    t.field('jobStatusesCount', {
      type: 'Int',
      args: {
        where: 'JobStatusWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.jobStatus.count(args as any)
      },
    })
  },
})

export const jobStatusMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneJobStatus()
    t.crud.updateOneJobStatus()
    t.crud.upsertOneJobStatus()
    t.crud.deleteOneJobStatus()
    t.crud.updateManyJobStatus()
    t.crud.deleteManyJobStatus()
  },
})
