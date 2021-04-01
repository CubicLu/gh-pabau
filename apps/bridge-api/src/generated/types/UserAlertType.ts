import { objectType, arg, extendType } from 'nexus'

export const UserAlertType = objectType({
  name: 'UserAlertType',
  definition(t) {
    t.model.id()
    t.model.uid()
    t.model.cc_name()
    t.model.cc_email()
    t.model.cc_phone()
    t.model.User()
  },
})

export const userAlertTypeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userAlertType()
    t.field('findFirstUserAlertType', {
      type: 'UserAlertType',
      args: {
        where: 'UserAlertTypeWhereInput',
        orderBy: arg({ type: 'UserAlertTypeOrderByInput' }),
        cursor: 'UserAlertTypeWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userAlertType.findFirst(args as any)
      },
    })
    t.crud.userAlertTypes({ filtering: true, ordering: true })
    t.field('userAlertTypesCount', {
      type: 'Int',
      args: {
        where: 'UserAlertTypeWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userAlertType.count(args as any)
      },
    })
  },
})

export const userAlertTypeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserAlertType()
    t.crud.updateOneUserAlertType()
    t.crud.upsertOneUserAlertType()
    t.crud.deleteOneUserAlertType()
    t.crud.updateManyUserAlertType()
  },
})
