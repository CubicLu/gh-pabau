import { extendType, list, nonNull } from 'nexus'
import { Context } from '../../../context'

import { Base64 } from 'js-base64'
import { MedicalForm } from '@prisma/client'

export const MedicalFormExtended = extendType({
  type: 'MedicalForm',
  definition(t) {
    t.field('Drugs', {
      type: nonNull(list('CmDrug')),
      async resolve(parent: MedicalForm, args, ctx: Context) {
        if (!parent?.data) return []

        const structure = JSON.parse(Base64.decode(parent.data))?.form_structure
        const drug_ids = structure
          .filter(function (item) {
            return item.cssClass === 'cl_drugs' && !!item.values
          })
          ?.map(function (item) {
            return item.values.split(',')
          })
          ?.join(',')
          ?.split(',')
          ?.map(function (id) {
            return Number.parseInt(id, 10)
          })
          .filter(function (id) {
            return !Number.isNaN(Number(id))
          })

        return await ctx.prisma.cmDrug.findMany({
          where: {
            id: { in: drug_ids },
          },
        })
      },
    })
  },
})
