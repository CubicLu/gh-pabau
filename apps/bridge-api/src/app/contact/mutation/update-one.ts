

import { mutationField, list, nonNull, intArg, inputObjectType } from 'nexus'
import { Context } from '../../../context'

export const UpdateContactCustomFieldType = inputObjectType({
    name: 'UpdateContactCustomFieldType',
    definition(t) {
      t.int('id')
      t.nonNull.int('custom_field_id')
      t.nonNull.string('label')
      t.nonNull.string('value')
    },
})

export const updateContact = mutationField('updateOneContact', {
    type: 'Boolean',
    args: {
       contactId: nonNull(intArg()),
       data: nonNull('ContactDataInput'),
       customFields: list('UpdateContactCustomFieldType'),
       contactPreferences: 'ContactPreferenceDataInput',
       labels: list('labelFieldType'),
    },
    async resolve(_root, input, ctx: Context) {

        const customFieldData = input.customFields.map((cmFields) => {
            return {
                where:{
                    id: cmFields.id
                },
                create: {
                    company_id: ctx.authenticated.company,
                    custom_field_id: cmFields.custom_field_id,
                    custom_field_label: cmFields.label,
                    custom_field_value: cmFields.value,
                },
                update: {
                    custom_field_value: cmFields.value,
                },
            }
          })

          let contactData
          for (const item of Object.keys(input.data)) {
            contactData= {
                ...contactData,
                [item]: {set: input.data[item]}
            }
          }

          let contactPreferenceData
          for (const item of Object.keys(input.contactPreferences)) {
            contactPreferenceData= {
                ...contactPreferenceData,
                [item]: {set: input.contactPreferences[item]}
            }
          }

         await ctx.prisma.cmContact.update({
            where:{
                ID: input.contactId
            },
            data:{
              ...contactData,
              CmContactCustom:{
                upsert: [
                    ...customFieldData
                ]
              },
              ContactPreference:{
                  update:{
                     ...contactPreferenceData
                  }
              },
              ContactMeta:{
                update: {
                    where:{
                        id:90,
                    },
                    data:{
                        meta_value: {set:input.data.preferred_language},
                    }
                }
              },
            }, 
         })
         return true
    }
})