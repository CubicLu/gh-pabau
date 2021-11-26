import { queryField, list } from 'nexus'

export const StaffNoteAggregateQuery = queryField('aggregateStaffNote', {
  type: 'AggregateStaffNote',
  args: {
    where: 'StaffNoteWhereInput',
    orderBy: list('StaffNoteOrderByWithRelationInput'),
    cursor: 'StaffNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffNote.aggregate({ ...args, ...select }) as any
  },
})
