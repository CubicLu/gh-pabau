import { objectType, arg, extendType } from 'nexus'

export const JobConfiguration = objectType({
  name: 'JobConfiguration',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.about_us()
    t.model.color_scheme()
    t.model.opening_blurb()
    t.model.page_title()
    t.model.first_name()
    t.model.last_name()
    t.model.email()
    t.model.dob()
    t.model.phone()
    t.model.address()
    t.model.city()
    t.model.postal()
    t.model.country()
    t.model.cover_letter()
    t.model.resume()
    t.model.date_available()
    t.model.linkedin()
    t.model.reference()
    t.model.how_did_hear()
    t.model.who_referred()
    t.model.default_reply()
    t.model.Company()
  },
})

export const jobConfigurationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.jobConfiguration()
    t.field('findFirstJobConfiguration', {
      type: 'JobConfiguration',
      args: {
        where: 'JobConfigurationWhereInput',
        orderBy: arg({ type: 'JobConfigurationOrderByInput' }),
        cursor: 'JobConfigurationWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.jobConfiguration.findFirst(args as any)
      },
    })
    t.crud.jobConfigurations({ filtering: true, ordering: true })
    t.field('jobConfigurationsCount', {
      type: 'Int',
      args: {
        where: 'JobConfigurationWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.jobConfiguration.count(args as any)
      },
    })
  },
})

export const jobConfigurationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneJobConfiguration()
    t.crud.updateOneJobConfiguration()
    t.crud.upsertOneJobConfiguration()
    t.crud.deleteOneJobConfiguration()
    t.crud.updateManyJobConfiguration()
  },
})
