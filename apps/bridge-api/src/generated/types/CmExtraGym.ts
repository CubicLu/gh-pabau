import { objectType, arg, extendType } from 'nexus'

export const CmExtraGym = objectType({
  name: 'CmExtraGym',
  definition(t) {
    t.model.id()
    t.model.contact_id()
    t.model.primary_goal()
    t.model.intro_class()
    t.model.age_group()
    t.model.occupier()
    t.model.skill_level()
    t.model.membership()
    t.model.CmContact()
  },
})

export const cmExtraGymQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmExtraGym()
    t.field('findFirstCmExtraGym', {
      type: 'CmExtraGym',
      args: {
        where: 'CmExtraGymWhereInput',
        orderBy: arg({ type: 'CmExtraGymOrderByInput' }),
        cursor: 'CmExtraGymWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmExtraGym.findFirst(args as any)
      },
    })
    t.crud.cmExtraGyms({ filtering: true, ordering: true })
    t.field('cmExtraGymsCount', {
      type: 'Int',
      args: {
        where: 'CmExtraGymWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmExtraGym.count(args as any)
      },
    })
  },
})

export const cmExtraGymMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmExtraGym()
    t.crud.updateOneCmExtraGym()
    t.crud.upsertOneCmExtraGym()
    t.crud.deleteOneCmExtraGym()
    t.crud.updateManyCmExtraGym()
  },
})
