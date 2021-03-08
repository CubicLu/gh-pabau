import { objectType, arg, extendType } from 'nexus'

export const CancelReason = objectType({
  name: 'CancelReason',
  definition(t) {
    t.model.id()
    t.model.reasonName()
    t.model.occupier()
    t.model.lateCancel()
    t.model.applyCancellationPolicy()
    t.model.createdAt()
    t.model.modifiedAt()
  },
})

export const cancelReasonQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cancelReason()
    t.field('findFirstCancelReason', {
      type: 'CancelReason',
      args: {
        where: 'CancelReasonWhereInput',
        orderBy: arg({ type: 'CancelReasonOrderByInput' }),
        cursor: 'CancelReasonWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cancelReason.findFirst(args as any)
      },
    })
    t.crud.cancelReasons({ filtering: true, ordering: true })
    t.field('cancelReasonsCount', {
      type: 'Int',
      args: {
        where: 'CancelReasonWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cancelReason.count(args as any)
      },
    })
  },
})

export const cancelReasonMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCancelReason()
    t.crud.updateOneCancelReason()
    t.crud.upsertOneCancelReason()
    t.crud.deleteOneCancelReason()
    t.crud.updateManyCancelReason()
    t.crud.deleteManyCancelReason()
  },
})
