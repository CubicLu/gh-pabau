import { inputObjectType, list, mutationField, nonNull } from 'nexus'
import { Context } from '../../../context'
import { LeadInput } from '../types'

export const CreateLeadCustomFieldType = inputObjectType({
  name: 'createLeadCustomFieldType',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('label')
    t.nonNull.string('value')
  },
})

export const LeadDataInput = inputObjectType({
  name: 'LeadDataInput',
  definition(t) {
    t.nonNull.string('Fname')
    t.nonNull.string('Lname')
    t.nonNull.string('Email')
    t.nonNull.string('Salutation')
    t.field('DOB', { type: 'DateTime' })
    t.nonNull.string('Mobile')
    t.nonNull.string('Phone')
    t.nonNull.string('MailingProvince')
    t.nonNull.string('MailingCity')
    t.nonNull.string('MailingStreet')
    t.nonNull.string('MailingPostal')
    t.nonNull.string('MailingCountry')
    t.nonNull.int('MarketingOptInEmail')
    t.nonNull.int('MarketingOptInPhone')
    t.nonNull.int('MarketingOptInPost')
    t.nonNull.int('MarketingOptInText')
    t.nonNull.int('LeadSource')
    t.nonNull.int('LeadStatus')
    t.nonNull.string('Description')
    t.nonNull.int('location_id')
    t.int('OwnerID')
    t.string('notes')
  },
})

export const createLead = mutationField('createOneLead', {
  type: 'CmLead',
  args: {
    data: nonNull('LeadDataInput'),
    customFields: list('createLeadCustomFieldType'),
  },
  async resolve(_root, input, ctx: Context) {
    let leadInputData: LeadInput = input.data
    let notesInputData

    if (leadInputData.notes) {
      leadInputData = {
        ...leadInputData,
        first_interaction: new Date(),
        latest_interaction: new Date(),
      }
      notesInputData = {
        Note: leadInputData.notes,
        OwnerID: ctx.authenticated.user,
      }
    }

    delete leadInputData.notes

    const customFieldData = input.customFields
      ? input.customFields.map((cmFields) => {
          return {
            company_id: ctx.authenticated.company,
            custom_field_id: cmFields.id,
            custom_field_label: cmFields.label,
            custom_field_value: cmFields.value,
          }
        })
      : []

    return await ctx.prisma.cmLead.create({
      data: {
        ...leadInputData,
        company_id: ctx.authenticated.company,
        OwnerID: leadInputData.OwnerID
          ? leadInputData.OwnerID
          : ctx.authenticated.user,
        CmLeadCustomField: {
          createMany: {
            data: customFieldData,
          },
        },
        CmLeadNote: {
          create: notesInputData,
        },
      },
    })
  },
})
