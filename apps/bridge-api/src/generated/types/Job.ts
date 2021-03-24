import { objectType, arg, extendType } from 'nexus'

export const Job = objectType({
  name: 'Job',
  definition(t) {
    t.model.job_id()
    t.model.create_date()
    t.model.created_by_id()
    t.model.start_date()
    t.model.closing_date()
    t.model.opening_title()
    t.model.job_location()
    t.model.what_you_do()
    t.model.is_closed()
    t.model.department()
    t.model.job_country()
    t.model.opening_job_blurb()
    t.model.employment_type()
    t.model.company_id()
    t.model.experience()
    t.model.Company()
  },
})

export const jobQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.job()
    t.field('findFirstJob', {
      type: 'Job',
      args: {
        where: 'JobWhereInput',
        orderBy: arg({ type: 'JobOrderByInput' }),
        cursor: 'JobWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.job.findFirst(args as any)
      },
    })
    t.crud.jobs({ filtering: true, ordering: true })
    t.field('jobsCount', {
      type: 'Int',
      args: {
        where: 'JobWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.job.count(args as any)
      },
    })
  },
})

export const jobMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneJob()
    t.crud.updateOneJob()
    t.crud.upsertOneJob()
    t.crud.deleteOneJob()
    t.crud.updateManyJob()
    t.crud.deleteManyJob()
  },
})
