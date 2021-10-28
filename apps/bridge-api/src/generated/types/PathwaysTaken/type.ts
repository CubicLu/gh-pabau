import { objectType } from 'nexus'

export const PathwaysTaken = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PathwaysTaken',
  definition(t) {
    t.int('id')
    t.int('pathway_id')
    t.int('contact_id')
    t.int('booking_id')
    t.field('started_on', { type: 'DateTime' })
    t.field('status', { type: 'cp_pathways_taken_status' })
    t.string('comment')
    t.field('Pathway', {
      type: 'Pathway',
      resolve(root: any) {
        return root.Pathway
      },
    })
    t.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.field('Booking', {
      type: 'Booking',
      resolve(root: any) {
        return root.Booking
      },
    })
    t.list.field('PathwayStepsTaken', {
      type: 'PathwayStepsTaken',
      args: {
        where: 'PathwayStepsTakenWhereInput',
        orderBy: 'PathwayStepsTakenOrderByWithRelationInput',
        cursor: 'PathwayStepsTakenWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PathwayStepsTakenScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PathwayStepsTaken
      },
    })
    t.nullable.field('_count', {
      type: 'PathwaysTakenCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
