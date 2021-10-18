import { extendType, objectType, inputObjectType, nonNull } from 'nexus'
import { Context } from '../../../context'

export const DuplicateActivityResponse = objectType({
  name: 'DuplicateActivityResponse',
  definition(t) {
    t.int('affected_rows')
  },
})

export const DuplicateActivityInputType = inputObjectType({
  name: 'DuplicateActivityInputType',
  definition(t) {
    t.nonNull.list.int('ids')
  },
})

export const duplicateActivity = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDuplicateActivity', {
      type: 'DuplicateActivityResponse',
      description:
        'Create duplicate activity based on input list of activity id',
      args: {
        where: nonNull('DuplicateActivityInputType'),
      },
      async resolve(_, { where: { ids } }, context: Context) {
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
