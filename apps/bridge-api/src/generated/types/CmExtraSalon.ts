import { objectType, arg, extendType } from 'nexus'

export const CmExtraSalon = objectType({
  name: 'CmExtraSalon',
  definition(t) {
    t.model.id()
    t.model.contact_id()
    t.model.primary_service()
    t.model.hair_length()
    t.model.hair_texture()
    t.model.company_id()
    t.model.skin_type()
    t.model.CmContact()
    t.model.Company()
  },
})

export const cmExtraSalonQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmExtraSalon()
    t.field('findFirstCmExtraSalon', {
      type: 'CmExtraSalon',
      args: {
        where: 'CmExtraSalonWhereInput',
        orderBy: arg({ type: 'CmExtraSalonOrderByInput' }),
        cursor: 'CmExtraSalonWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmExtraSalon.findFirst(args as any)
      },
    })
    t.crud.cmExtraSalons({ filtering: true, ordering: true })
    t.field('cmExtraSalonsCount', {
      type: 'Int',
      args: {
        where: 'CmExtraSalonWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmExtraSalon.count(args as any)
      },
    })
  },
})

export const cmExtraSalonMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmExtraSalon()
    t.crud.updateOneCmExtraSalon()
    t.crud.upsertOneCmExtraSalon()
    t.crud.deleteOneCmExtraSalon()
    t.crud.updateManyCmExtraSalon()
  },
})
