import { extendType, list } from 'nexus'
import { Context } from '../../../context'
import { LabRequest } from '@prisma/client'
import { LabRequestTests } from '../nexus-type'
import { checkAbnormalTests } from '../lab-request-service'

export const LabRequestExtended = extendType({
  type: 'LabRequest',
  definition(t) {
    t.field('tests', {
      type: list(LabRequestTests),
      async resolve(parent: LabRequest, args, ctx: Context) {
        let productCodes = []
        const medForm = await ctx.prisma.medicalFormContact.findUnique({
          where: {
            id: parent.request_id,
          },
          include: {
            MedicalContactAttr: {
              select: {
                value: true,
              },
              where: {
                MedicalAttr: {
                  name: {
                    contains: 'labs test',
                  },
                },
              },
            },
          },
        })
        if (medForm && medForm.MedicalContactAttr.length > 0) {
          const productIds = [
            ...new Set(
              medForm.MedicalContactAttr.map((elem) => elem.value)
                .join(',')
                .split(',')
                .map((elem) => Number.parseInt(elem))
            ),
          ]

          productCodes = await ctx.prisma.invProduct.findMany({
            where: {
              id: {
                in: productIds,
              },
            },
            select: {
              code: true,
            },
          })
        }
        return checkAbnormalTests(
          await ctx.prisma.labProductTemplate.findMany({
            where: {
              code: {
                in: productCodes.map((elem) => elem.code),
              },
            },
          }),
          parent.receive_result ? JSON.parse(parent.receive_result) : []
        )
      },
    })
    t.field('resultUrl', {
      type: 'String',
      async resolve(parent: LabRequest, args, ctx: Context) {
        return (
          ctx.authenticated.remote_url ||
          'https://crm.pabau.com/' +
            'modules/connect/lab_results.php?id=' +
            parent.id +
            '&clientview=1'
        )
      },
    })
  },
})
