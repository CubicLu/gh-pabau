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

export const modifyLabel = async (contactId, labels, ctx) => {
  if (labels.deleteLabels?.length > 0) {
    await ctx.prisma.cmContactLabel.deleteMany({
      where: {
        label_id: {
          in: labels.deleteLabels,
        },
        contact_id: contactId,
        company_id: ctx.authenticated.company,
      },
    })
  }
  if (labels.createLabels?.length > 0) {
    await createLabel(
      ctx,
      labels.createLabels,
      contactId,
      ctx.authenticated.company
    )
  }
}
