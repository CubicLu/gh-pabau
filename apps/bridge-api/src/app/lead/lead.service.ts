import { Context } from '../../context'

export const findManyLeads = async (where, ctx: Context) => {
  return await ctx.prisma.cmLead.findMany({
    where: where,
  })
}

export const findLeadByEmail = async (ctx: Context, email: string) => {
  return await ctx.prisma.cmLead.findFirst({
    where: {
      company_id: {
        equals: ctx.authenticated.company,
      },
      Email: {
        equals: email,
      },
    },
  })
}
