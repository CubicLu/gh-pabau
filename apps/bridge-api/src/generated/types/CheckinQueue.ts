import { objectType, arg, extendType } from 'nexus'

export const CheckinQueue = objectType({
  name: 'CheckinQueue',
  definition(t) {
    t.model.id()
    t.model.uid()
    t.model.beenBefore()
    t.model.dateStart()
    t.model.accepted()
    t.model.isLunch()
    t.model.name()
    t.model.dateAccepted()
    t.model.dateEnd()
    t.model.wasAnyone()
    t.model.finalise()
    t.model.smsNumber()
    t.model.smsSent()
    t.model.smsWanted()
    t.model.skips()
    t.model.connectId()
    t.model.order()
    t.model.spotifyUri()
    t.model.dateBinned()
  },
})

export const checkinQueueQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.checkinQueue()
    t.field('findFirstCheckinQueue', {
      type: 'CheckinQueue',
      args: {
        where: 'CheckinQueueWhereInput',
        orderBy: arg({ type: 'CheckinQueueOrderByInput' }),
        cursor: 'CheckinQueueWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.checkinQueue.findFirst(args as any)
      },
    })
    t.crud.checkinQueues({ filtering: true, ordering: true })
    t.field('checkinQueuesCount', {
      type: 'Int',
      args: {
        where: 'CheckinQueueWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.checkinQueue.count(args as any)
      },
    })
  },
})

export const checkinQueueMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCheckinQueue()
    t.crud.updateOneCheckinQueue()
    t.crud.upsertOneCheckinQueue()
    t.crud.deleteOneCheckinQueue()
    t.crud.updateManyCheckinQueue()
    t.crud.deleteManyCheckinQueue()
  },
})
