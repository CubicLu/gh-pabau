import { Context } from '../../context'

export const findManyLeads = async (where, ctx: Context) => {
  return await ctx.prisma.cmLead.findMany({
    where: where,
  })
}
