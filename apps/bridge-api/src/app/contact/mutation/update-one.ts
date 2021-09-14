import { mutationField, list, nonNull, intArg, inputObjectType } from 'nexus'
import { Context } from '../../../context'
import { createLabel } from '../label'

export const UpdateContactCustomFieldType = inputObjectType({
    name: 'UpdateContactCustomFieldType',
    definition(t) {
      t.int('id')
      t.nonNull.int('custom_field_id')
      t.nonNull.string('label')
      t.nonNull.string('value')
    },
})

export const UpdateContactLabelType = inputObjectType({
    name: 'UpdateContactLabelType',
    definition(t) {
        t.list.field('createLabels', { type: 'labelFieldType' })
        t.list.int('deleteLabels')
    }
})

export const UpdateContactLocationType = inputObjectType({
    name: 'UpdateContactLocationType',
    definition(t) {
        t.list.int('createLocations')
        t.list.int('deleteLocations')
    }
})

export const updateContact = mutationField('updateOneContact', {
    type: 'Boolean',
    args: {
       contactId: nonNull(intArg()),
       data: nonNull('ContactDataInput'),
       customFields: list('UpdateContactCustomFieldType'),
       contactPreferences: 'ContactPreferenceDataInput',
       labels: 'UpdateContactLabelType',
       limitContactLocations: 'UpdateContactLocationType',
    },
    async resolve(_root, input, ctx: Context) {

        const customFieldData = input.customFields.map((cmFields) => {
            return {
                where: {
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
            if(item !== 'preferred_language')  {
                contactData= {
                    ...contactData,
                    [item]: {set: input.data[item]}
                }
            }
        }

        const locationData =  input.limitContactLocations?.createLocations ? 
           input.limitContactLocations.createLocations.map((id) => {
            return {
              company_id: ctx.authenticated.company,
              location_id: id,
            }
        }) : []

         await ctx.prisma.cmContact.update({
            where: {
                ID: input.contactId
            },
            data: {
              ...contactData,
              CmContactCustom: {
                upsert: [
                    ...customFieldData
                ]
              },
              CmContactLocation: {
                createMany: {
                  data: locationData,
                },
              },
              ContactPreference: {
                upsert: {
                    create: {
                        ...input.contactPreferences,
                        company_id: ctx.authenticated.company,
                    },
                    update: {
                        ...input.contactPreferences,
                        company_id: ctx.authenticated.company,
                    },
                }
            },
            //   ContactMeta: {
            //     update: { 
            //         where: { 
            //             id: 90,
            //         },
            //         data: {
            //             meta_value: { set:input.data.preferred_language },
            //         }
            //     }
            //   },
            }, 
         })

        const transactionData = []
        if(input.limitContactLocations && input.limitContactLocations?.deleteLocations) {
            transactionData.push(ctx.prisma.cmContactLocation.deleteMany({
                where:{
                    location_id: {
                        in: input.limitContactLocations.deleteLocations
                    },
                    contact_id:input.contactId,
                    company_id: ctx.authenticated.company,
                }
            }))
        }
       
        if(input.labels) {
            if(input.labels.deleteLabels) {
                transactionData.push(ctx.prisma.cmContactLabel.deleteMany({
                    where: {
                        label_id: {
                            in: input.labels.deleteLabels
                        },
                        contact_id:input.contactId,
                        company_id: ctx.authenticated.company,
                    }
                }))
            } 
            if(input.labels.createLabels) {
                await createLabel(
                    ctx,
                    input.labels.createLabels,
                    input.contactId,
                    ctx.authenticated.company
                )
            }
        }

        if(transactionData.length > 0) {
            await ctx.prisma.$transaction(transactionData)
        }
        
        return true
    }
})