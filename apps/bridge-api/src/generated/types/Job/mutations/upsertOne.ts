import { mutationField, nonNull } from 'nexus'

export const JobUpsertOneMutation = mutationField('upsertOneJob', {
  type: nonNull('Job'),
  args: {
    where: nonNull('JobWhereUniqueInput'),
    create: nonNull('JobCreateInput'),
    update: nonNull('JobUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.job.upsert({
      ...args,
      ...select,
    })
  },
})
