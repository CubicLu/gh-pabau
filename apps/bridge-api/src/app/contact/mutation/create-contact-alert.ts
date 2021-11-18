import { mutationField, nonNull } from 'nexus'

export const ContactAlertCreateOneMutationCustom = mutationField(
  'createContactAlertAdvanced',
  {
    type: nonNull('ContactAlert'),
    args: {
      data: nonNull('ContactAlertCreateInput'),
    },
    async resolve(_parent, { data }, { prisma, select, authenticated }) {
      console.info('here it is the data:', data.Note)

      const tags = data.Note?.split('#')
        ?.splice(1)
        ?.map((item) => {
          return item.split(' ')[0]
        })

      for (const tag of tags) {
        const { id } = await prisma.medicalCondition.upsert({
          where: {
            unique_medical_condition_company: {
              name: tag,
              company_id: authenticated.company,
            },
          },
          create: {
            name: tag,
            company_id: authenticated.company,
          },
          update: {},
          select: {
            id: true,
          },
        })

        const refCondition = await prisma.contactMedicalCondition.upsert({
          where: {
            unique_contact_medical_condition: {
              contact_id: data.CmContact.connect.ID,
              medical_condition_id: id,
              medical_record_id: 0,
            },
          },
          create: {
            contact_id: data.CmContact.connect.ID,
            company_id: authenticated.company,
            medical_condition_id: id,
          },
          update: {},
          select: {
            id: true,
          },
        })

        console.info('condition', tag, id, refCondition)
      }

      return prisma.contactAlert.create({
        data,
        ...select,
      })
    },
  }
)
