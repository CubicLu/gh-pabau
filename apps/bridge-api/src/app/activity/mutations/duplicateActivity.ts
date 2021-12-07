import { extendType, list, intArg } from 'nexus'
import { Context } from '../../../context'

export const duplicateActivity = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDuplicateActivity', {
      type: 'AffectRowsResponse',
      description:
        'Create duplicate activity based on input list of activity id',
      args: {
        ids: list(intArg()),
      },
      async resolve(_, { ids }, context: Context) {
        const activityData = await context.prisma.activity.findMany({
          where: {
            id: { in: ids },
          },
        })
        const prepareData = activityData.map((item) => {
          delete item.id
          delete item.created_at
          delete item.updated_at
          return item
        })
        const createActivity = await context.prisma.activity.createMany({
          data: prepareData,
        })
        return {
          affected_rows: createActivity.count,
        }
      },
    })
  },
})
