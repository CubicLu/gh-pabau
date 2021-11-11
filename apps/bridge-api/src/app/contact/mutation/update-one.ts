import { mutationField, list, nonNull, intArg, inputObjectType } from 'nexus'
import { Context } from '../../../context'
import { createLabel } from '../label'

export const UpdateContactCustomFieldType = inputObjectType({
  name: 'UpdateContactCustomFieldType',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('label')
    t.nonNull.string('value')
  },
})

export const UpdateContactLabelType = inputObjectType({
  name: 'UpdateContactLabelType',
  definition(t) {
    t.list.field('createLabels', { type: 'labelFieldType' })
    t.list.int('deleteLabels')
  },
})

export const UpdateContactDataInput = inputObjectType({
  name: 'UpdateContactDataInput',
  definition(t) {
    t.nonNull.string('Fname')
    t.nonNull.string('Lname')
    t.nonNull.string('Email')
    t.nonNull.string('Salutation')
    t.nonNull.string('MailingProvince')
    t.nonNull.string('MailingCity')
    t.nonNull.string('MailingStreet')
    t.nonNull.string('MailingPostal')
    t.nonNull.string('MailingCountry')
    t.nonNull.int('MarketingOptInEmail')
    t.nonNull.int('MarketingOptInPhone')
    t.nonNull.int('MarketingOptInPost')
    t.nonNull.int('MarketingOptInText')
    t.nonNull.int('MarketingSource')
    t.field('DOB', { type: 'DateTime' })
    t.nonNull.string('Mobile')
    t.nonNull.string('Phone')
    t.nonNull.string('gender')
    t.nonNull.string('preferred_language')
    t.string('privacy_policy')
    t.boolean('need_to_knows')
    t.int('is_active')
    t.string('Avatar')
    t.string('custom_id')
    t.string('RefferalSource')
  },
})

export const updateContact = mutationField('updateOneContact', {
  type: 'CmContact',
  args: {
    contactId: nonNull(intArg()),
    data: nonNull('UpdateContactDataInput'),
    customFields: list('UpdateContactCustomFieldType'),
    contactPreferences: 'ContactPreferenceDataInput',
    labels: 'UpdateContactLabelType',
  },
  async resolve(_root, input, ctx: Context) {
    const customFieldData = input.customFields
      ? input.customFields.map((cmFields) => {
          return {
            where: {
              unique_company_id_contact_id_custom_field_id: {
                company_id: ctx.authenticated.company,
                contact_id: input.contactId,
                custom_field_id: cmFields.id,
              },
            },
            create: {
              company_id: ctx.authenticated.company,
              custom_field_id: cmFields.id,
              custom_field_label: cmFields.label,
              custom_field_value: cmFields.value,
            },
            update: {
              custom_field_value: cmFields.value,
            },
          }
        })
      : []

    let contactData
    for (const item of Object.keys(input.data)) {
      if (item !== 'preferred_language') {
        contactData = {
          ...contactData,
          [item]: { set: input.data[item] },
        }
      }
    }

    const updatedContactData = await ctx.prisma.cmContact.update({
      where: {
        ID: input.contactId,
      },
      data: {
        ...contactData,
        CmContactCustom: {
          upsert: [...customFieldData],
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
          },
        },
        ContactMeta: {
          upsert: {
            where: {
              contact_id_meta_name: {
                contact_id: input.contactId,
                meta_name: 'preferred_language',
              },
            },
            create: {
              meta_name: 'preferred_language',
              meta_value: input.data.preferred_language,
            },
            update: {
              meta_value: { set: input.data.preferred_language },
            },
          },
        },
      },
    })

    if (input.labels) {
      if (input.labels.deleteLabels?.length > 0) {
        await ctx.prisma.cmContactLabel.deleteMany({
          where: {
            label_id: {
              in: input.labels.deleteLabels,
            },
            contact_id: input.contactId,
            company_id: ctx.authenticated.company,
          },
        })
      }
      if (input.labels.createLabels?.length > 0) {
        await createLabel(
          ctx,
          input.labels.createLabels,
          input.contactId,
          ctx.authenticated.company
        )
      }
    }

    return updatedContactData
  },
})
