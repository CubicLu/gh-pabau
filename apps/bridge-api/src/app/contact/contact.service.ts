import { Context } from '../../context'

export const findManyContacts = async (where, ctx: Context) => {
  return await ctx.prisma.cmContact.findMany({
    where: where,
  })
}

export const getMedicalConditionId = (contactMedicalConditions, value) => {
  return contactMedicalConditions?.find(
    (i) => i?.MedicalCondition?.name === value
  )?.MedicalCondition?.id
}
