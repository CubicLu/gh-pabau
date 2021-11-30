import { queryField, nonNull, list } from 'nexus'

export const CompanyNoteFindCountQuery = queryField(
  'findManyCompanyNoteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyNoteWhereInput',
      orderBy: list('CompanyNoteOrderByWithRelationInput'),
      cursor: 'CompanyNoteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyNoteScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyNote.count(args as any)
    },
  },
)
