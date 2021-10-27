import { queryField, list } from 'nexus'

export const CandidateAggregateQuery = queryField('aggregateCandidate', {
  type: 'AggregateCandidate',
  args: {
    where: 'CandidateWhereInput',
    orderBy: list('CandidateOrderByWithRelationInput'),
    cursor: 'CandidateWhereUniqueInput',
    distinct: 'CandidateScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.candidate.aggregate({ ...args, ...select }) as any
  },
})
