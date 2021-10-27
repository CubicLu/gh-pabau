import { extendType, list, nonNull } from 'nexus'
import { Context } from '../../../context'

import { Base64 } from 'js-base64'

export const MedicalFormExtended = extendType({
  type: 'MedicalForm',
  definition(t) {
    t.field('Drugs', {
      type: nonNull(list('CmDrug')),
      async resolve(parent: any, args, ctx: Context) {
        if (parent.data) {
          const form = Base64.decode(parent.data)
          const form2 = JSON.parse(form)
          const drug_ids = form2.form_structure
            .map((item) => {
              if (item.cssClass === 'cl_drugs') return item.values
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
        }

        return []
      },
    })
  },
})
