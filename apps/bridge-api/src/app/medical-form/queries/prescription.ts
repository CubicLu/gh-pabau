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
        if (!parent.data) return []

        const form = JSON.parse(Base64.decode(parent.data))
        const drug_ids = form.form_structure
          .map((item) => {
            if (item.cssClass === 'cl_drugs') return item.values
            return ''
          })
          .join(',')

        const drug_ids_arr = drug_ids.split(',').map(function (i) {
          return Number.parseInt(i, 10)
        })
        return await ctx.prisma.cmDrug.findMany({
          where: {
            id: { in: drug_ids_arr },
          },
        })
      },
    })
  },
})
