import { objectType, arg, extendType } from 'nexus'

export const ClockinBreak = objectType({
  name: 'ClockinBreak',
  definition(t) {
    t.model.breakTimeId()
    t.model.clockId()
    t.model.breakTimeStart()
    t.model.breakTimeOut()
  },
})

export const clockinBreakQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.clockinBreak()
    t.field('findFirstClockinBreak', {
      type: 'ClockinBreak',
      args: {
        where: 'ClockinBreakWhereInput',
        orderBy: arg({ type: 'ClockinBreakOrderByInput' }),
        cursor: 'ClockinBreakWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.clockinBreak.findFirst(args as any)
      },
    })
    t.crud.clockinBreaks({ filtering: true, ordering: true })
    t.field('clockinBreaksCount', {
      type: 'Int',
      args: {
        where: 'ClockinBreakWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.clockinBreak.count(args as any)
      },
    })
  },
})

export const clockinBreakMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneClockinBreak()
    t.crud.updateOneClockinBreak()
    t.crud.upsertOneClockinBreak()
    t.crud.deleteOneClockinBreak()
    t.crud.updateManyClockinBreak()
    t.crud.deleteManyClockinBreak()
  },
})
