import { Context } from '../../context'

export const findManyContacts = async (where, ctx: Context) => {
  return await ctx.prisma.cmContact.findMany({
    where: where,
  })
}
