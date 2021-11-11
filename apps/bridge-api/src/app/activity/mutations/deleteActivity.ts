import { extendType, objectType, inputObjectType, nonNull } from 'nexus'
import { Context } from '../../../context'

export const DeleteManyActivityResponse = objectType({
  name: 'DeleteManyActivityResponse',
  definition(t) {
    t.int('affected_rows')
  },
})

export const DeleteManyActivityInputType = inputObjectType({
  name: 'DeleteManyActivityInputType',
  definition(t) {
    t.nonNull.list.int('ids')
  },
})

export const DeleteManyActivity = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteManyActivity', {
      type: 'DeleteManyActivityResponse',
      description: 'Delete activity records based on input list of activity id',
      args: {
        where: nonNull('DeleteManyActivityInputType'),
      },
      async resolve(_, { where: { ids } }, context: Context) {
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
