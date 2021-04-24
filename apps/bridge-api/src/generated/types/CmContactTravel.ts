import { objectType, arg, extendType } from 'nexus'

export const CmContactTravel = objectType({
  name: 'CmContactTravel',
  definition(t) {
    t.model.id()
    t.model.contact_id()
    t.model.country_id()
    t.model.start_date()
    t.model.end_date()
    t.model.company_id()
    t.model.duration()
    t.model.mode()
    t.model.uid()
    t.model.medical_record_id()
    t.model.creation_date()
    t.model.modified_date()
    t.model.Company()
    t.model.CmContact()
    t.model.Country()
    t.model.User()
    t.model.MedicalFormContact()
  },
})

export const cmContactTravelQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmContactTravel()
    t.field('findFirstCmContactTravel', {
      type: 'CmContactTravel',
      args: {
        where: 'CmContactTravelWhereInput',
        orderBy: arg({ type: 'CmContactTravelOrderByInput' }),
        cursor: 'CmContactTravelWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactTravel.findFirst(args as any)
      },
    })
    t.crud.cmContactTravels({ filtering: true, ordering: true })
    t.field('cmContactTravelsCount', {
      type: 'Int',
      args: {
        where: 'CmContactTravelWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactTravel.count(args as any)
      },
    })
  },
})

export const cmContactTravelMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmContactTravel()
    t.crud.updateOneCmContactTravel()
    t.crud.upsertOneCmContactTravel()
    t.crud.deleteOneCmContactTravel()
    t.crud.updateManyCmContactTravel()
  },
})
