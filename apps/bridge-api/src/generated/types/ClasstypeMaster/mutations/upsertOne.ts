import { mutationField, nonNull } from 'nexus'

export const ClasstypeMasterUpsertOneMutation = mutationField(
  'upsertOneClasstypeMaster',
  {
    type: nonNull('ClasstypeMaster'),
    args: {
      where: nonNull('ClasstypeMasterWhereUniqueInput'),
      create: nonNull('ClasstypeMasterCreateInput'),
      update: nonNull('ClasstypeMasterUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classtypeMaster.upsert({
        ...args,
        ...select,
      })
    },
  },
)
