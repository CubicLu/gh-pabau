import { Context } from '../../context'

export const findManyContacts = async (where, ctx: Context) => {
  return await ctx.prisma.cmContact.findMany({
    where: where,
  })
}

export const findContactByEmail = async (ctx: Context, email: string) => {
  return await ctx.prisma.cmContact.findFirst({
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
