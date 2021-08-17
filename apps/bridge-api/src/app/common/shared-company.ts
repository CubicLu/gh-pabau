import { Context } from '../../context'

export const findSharedCompanyIds = async (ctx: Context) => {
  const companyUser = await ctx.prisma.user.findFirst({
    where: {
      id: ctx.authenticated.user,
    },
  })

  const users = await ctx.prisma.user.findMany({
    where: {
      email: { equals: companyUser.email, not: { equals: '' } },
      deleted: { not: { equals: 1 } },
      company_id: { not: { equals: ctx.authenticated.company } },
      disable_multiple_clinics: { equals: 0 },
    },
    select: {
      company_id: true,
    },
  })

  let companyIds = users.map((thread) => thread.company_id)

  companyIds = [...new Set(companyIds)]

  const cmBranch = await ctx.prisma.companyBranch.groupBy({
    by: ['group_id', 'company_id'],
    where: {
      is_active: { equals: 1 },
      company_id: { in: companyIds },
    },
  })

  for (const data of cmBranch) {
    const companyBranches = await ctx.prisma.companyBranch.findMany({
      where: {
        group_id: { equals: data.group_id },
        is_active: { equals: 1 },
        company_id: { not: { equals: data.company_id } },
      },
      select: {
        company_id: true,
      },
    })
    companyIds = [
      ...companyIds,
      ...companyBranches.map((branch) => branch.company_id),
    ]
  }
  companyIds = [...new Set(companyIds)]
  return companyIds
}
