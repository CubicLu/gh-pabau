import { extendType, objectType, intArg, list } from 'nexus'
import { Context } from '../../../context'

export const AffectRowsResponse = objectType({
  name: 'AffectRowsResponse',
  definition(t) {
    t.int('affected_rows')
  },
})

export const DeleteManyActivity = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteManyActivity', {
      type: 'AffectRowsResponse',
      description: 'Delete activity records based on input list of activity id',
      args: {
        ids: list(intArg()),
      },
      async resolve(_, { ids }, context: Context) {
        const response = await context.prisma.activity.deleteMany({
          where: {
            id: { in: ids },
          },
        })
        return {
          affected_rows: response.count,
        }
      },
    })
  },
})
