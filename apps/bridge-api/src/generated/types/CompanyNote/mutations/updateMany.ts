import { mutationField, nonNull } from 'nexus'

export const CompanyNoteUpdateManyMutation = mutationField(
  'updateManyCompanyNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyNoteUpdateManyMutationInput'),
      where: 'CompanyNoteWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyNote.updateMany(args as any)
    },
  },
)
