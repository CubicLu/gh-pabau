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
        const communication = await ctx.prisma.communicationsRequestedForms.findFirst(
          {
            where: {
              contact_id: parent?.contact_id,
            },
          }
        )
        console.log('parent data---------------', parent)
        console.log('form data---------------', parent?.Form?.id)
        console.log('communications requested data=========', communication)

        if (
          communication?.form_ids &&
          JSON.parse(communication?.form_ids)?.includes(parent?.Form?.id)
        ) {
          return 'to_be_completed'
        } else {
          return parent?.complete ? 'completed' : 'not_completed'
        }
      },
    })
  },
})
