import { objectType, arg, extendType } from 'nexus'

export const AcLogAction = objectType({
  name: 'AcLogAction',
  definition(t) {
    t.model.id()
    t.model.pabauid()
    t.model.actionName()
    t.model.actionStatus()
    t.model.command()
    t.model.tableAff()
    t.model.rowAff()
    t.model.rowId()
  },
})

export const acLogActionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.acLogAction()
    t.field('findFirstAcLogAction', {
      type: 'AcLogAction',
      args: {
        where: 'AcLogActionWhereInput',
        orderBy: arg({ type: 'AcLogActionOrderByInput' }),
        cursor: 'AcLogActionWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.acLogAction.findFirst(args as any)
      },
    })
    t.crud.acLogActions({ filtering: true, ordering: true })
    t.field('acLogActionsCount', {
      type: 'Int',
      args: {
        where: 'AcLogActionWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.acLogAction.count(args as any)
      },
    })
  },
})

export const acLogActionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneAcLogAction()
    t.crud.updateOneAcLogAction()
    t.crud.upsertOneAcLogAction()
    t.crud.deleteOneAcLogAction()
    t.crud.updateManyAcLogAction()
    t.crud.deleteManyAcLogAction()
  },
})
