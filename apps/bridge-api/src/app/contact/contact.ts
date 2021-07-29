import { Context } from '../../context'
import { CreateContactInput, CustomFieldType, ContactType } from './types'
import { CmContact } from '@prisma/client'
import { createLabel } from './label'

const findMaxCustomId = async (
  ctx: Context,
  companyId: number
): Promise<string> => {
  const data = await ctx.prisma.$queryRaw`
      SELECT IFNULL(MAX(CAST(a.custom_id AS INTEGER)) + 1,1) as max FROM cm_contacts a WHERE a.Occupier = ${companyId}
    `
  return data[0].max.toString()
}
const createContact = async (
  ctx: Context,
  data: ContactType,
  customFields: CustomFieldType[],
  locationId: number[],
  companyId: number
): Promise<CmContact> => {
  const customFieldData = customFields.map((cmFields) => {
    return {
      company_id: companyId,
      custom_field_id: cmFields.id,
      custom_field_label: cmFields.label,
      custom_field_value: cmFields.value,
    }
  })

  const locationData = locationId.map((id) => {
    return {
      company_id: companyId,
      location_id: id,
    }
  })

  return await ctx.prisma.cmContact.create({
    data: {
      ...data,
      CmContactCustom: {
        createMany: {
          data: customFieldData,
        },
      },
      CmContactLocation: {
        createMany: {
          data: locationData,
        },
      },
    },
  })
}

export const create = async (
  ctx: Context,
  input: CreateContactInput
): Promise<CmContact[]> => {
  let companyIds = [ctx.authenticated.company]

  if (input.otherCompanyIds) {
    companyIds = [...companyIds, ...input.otherCompanyIds]
  }

  const contactList = []

  for (const id of companyIds) {
    const maxCustomId = await findMaxCustomId(ctx, id)

    const inputData: ContactType = {
      ...input.data,
      company_id: id,
      preferred_language: !input.data.preferred_language
        ? ctx.authenticated.language.company
        : input.data.preferred_language,
      OwnerID: ctx.authenticated.user,
      DOB: input.data.DOB ? new Date(input.data.DOB) : null,
      custom_id: maxCustomId,
    }
    const contactData = await createContact(
      ctx,
      inputData,
      input.customFields ? input.customFields : [],
      id === ctx.authenticated.company && input.limitContactLocations
        ? input.limitContactLocations
        : [],
      id
    )

    if (input.labels) {
      await createLabel(ctx, input.labels, contactData.ID, id)
    }

    contactList.push(contactData)
  }
  return contactList
}
