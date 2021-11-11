import { extendType } from 'nexus'
import { Context } from '../../../context'

import { MedicalFormContact, MedicalForm } from '@prisma/client'

interface MedicalFormContactData extends MedicalFormContact {
  Form: MedicalForm
}

export const MedicalFormContactExtended = extendType({
  type: 'MedicalFormContact',
  definition(t) {
    t.field('status', {
      type: 'String',
      async resolve(parent: MedicalFormContactData, args, ctx: Context) {
        let communication = []
        if (parent?.Form?.id) {
          communication = await ctx.prisma.communicationsRequestedForms.findMany(
            {
              where: {
                contact_id: { equals: parent?.contact_id },
                form_ids: { contains: parent?.Form?.id?.toString() },
              },
            }
          )

          if (communication?.length > 0) {
            return 'to_be_completed'
          }
        }
        if (communication?.length === 0) {
          return parent?.complete ? 'completed' : 'not_completed'
        }
      },
    })
  },
})
