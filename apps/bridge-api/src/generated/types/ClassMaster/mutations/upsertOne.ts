import { mutationField, nonNull } from 'nexus'

export const ClassMasterUpsertOneMutation = mutationField(
  'upsertOneClassMaster',
  {
    type: nonNull('ClassMaster'),
    args: {
      where: nonNull('ClassMasterWhereUniqueInput'),
      create: nonNull('ClassMasterCreateInput'),
      update: nonNull('ClassMasterUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classMaster.upsert({
        ...args,
        ...select,
      })
    },
  },
)
