import { objectType, arg, extendType } from 'nexus'

export const UserSalutation = objectType({
  name: 'UserSalutation',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.company_id()
    t.model.Company()
  },
})

export const userSalutationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userSalutation()
    t.field('findFirstUserSalutation', {
      type: 'UserSalutation',
      args: {
        where: 'UserSalutationWhereInput',
        orderBy: arg({ type: 'UserSalutationOrderByInput' }),
        cursor: 'UserSalutationWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userSalutation.findFirst(args as any)
      },
    })
    t.crud.userSalutations({ filtering: true, ordering: true })
    t.field('userSalutationsCount', {
      type: 'Int',
      args: {
        where: 'UserSalutationWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userSalutation.count(args as any)
      },
    })
  },
})

export const userSalutationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserSalutation()
    t.crud.updateOneUserSalutation()
    t.crud.upsertOneUserSalutation()
    t.crud.deleteOneUserSalutation()
    t.crud.updateManyUserSalutation()
  },
})
