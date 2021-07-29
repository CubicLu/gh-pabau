import { Context } from '../../context'
import { LabelType } from './types'

export const createLabel = async (
  ctx: Context,
  labels: LabelType[],
  contactId: number,
  companyId: number
) => {
  const labelInsert = labels.map((data) => {
    return ctx.prisma.cmLabel.upsert({
      where: {
        name: data.label,
      },
      create: {
        name: data.label,
        color: data.color,
        company_id: companyId,
        CmContactLabel: {
          create: {
            contact_id: contactId,
            company_id: companyId,
          },
        },
      },
      update: {
        name: data.label,
        CmContactLabel: {
          create: {
            contact_id: contactId,
            company_id: companyId,
          },
        },
      },
    })
  })

  await ctx.prisma.$transaction(labelInsert)
}
