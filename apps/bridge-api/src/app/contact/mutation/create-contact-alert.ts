import { extendType, nonNull } from 'nexus'
import { getMedicalConditionId } from '../contact.service'

export const contactAlertMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createContactAlertAdvanced', {
      type: nonNull('ContactAlert'),
      args: {
        data: nonNull('ContactAlertCreateInput'),
      },
      async resolve(_parent, { data }, { prisma, select, authenticated }) {
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

          await prisma.contactMedicalCondition.upsert({
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
        }

        return prisma.contactAlert.create({
          data,
          ...select,
        })
      },
    })
    t.field('updateContactAlertAdvanced', {
      type: nonNull('ContactAlert'),
      args: {
        where: nonNull('ContactAlertWhereUniqueInput'),
        data: nonNull('ContactAlertUpdateInput'),
      },
      async resolve(
        _parent,
        { data, where },
        { prisma, select, authenticated }
      ) {
        const { Note } = await prisma.contactAlert.findFirst({
          where,
        })
        const contactMedicalConditions = await prisma.contactMedicalCondition.findMany(
          {
            where: {
              contact_id: { equals: data?.CmContact?.connect?.ID },
            },
            select: {
              id: true,
              MedicalCondition: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          }
        )

        const tags_old = Note?.split('#')
          ?.splice(1)
          ?.map((item) => {
            return item.split(' ')[0]
          })

        const tags = data.Note?.set
          ?.split('#')
          ?.splice(1)
          ?.map((item) => {
            return item.split(' ')[0]
          })

        const difference = tags_old.filter((x) => !tags.includes(x))
        for (const old_tag of difference) {
          const contactAlerts = await prisma.contactAlert.findMany({
            where: {
              Note: { contains: `#` + old_tag },
              CmContact: { company_id: { equals: authenticated.company } },
              NOT: [{ ID: { equals: where.ID } }],
            },
          })
          const stillExists = contactAlerts.filter(
            (x) => x?.ContactID === data?.CmContact?.connect?.ID
          )
          if (stillExists?.length === 0) {
            await prisma.contactMedicalCondition.delete({
              where: {
                unique_contact_medical_condition: {
                  contact_id: data.CmContact.connect.ID,
                  medical_condition_id: getMedicalConditionId(
                    contactMedicalConditions,
                    old_tag
                  ),
                  medical_record_id: 0,
                },
              },
            })
          }
          if (contactAlerts?.length === 0) {
            await prisma.medicalCondition.delete({
              where: {
                id: getMedicalConditionId(contactMedicalConditions, old_tag),
              },
            })
          }
        }

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
          await prisma.contactMedicalCondition.upsert({
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
        }

        await prisma.contactAlert.update({
          where,
          data: {
            ...data,
          },
          select: {
            ID: true,
          },
        })

        return prisma.contactAlert.findFirst({
          where,
          ...select,
        })
      },
    })
    t.field('deleteContactAlertAdvanced', {
      type: nonNull('ContactAlert'),
      args: {
        where: nonNull('ContactAlertWhereUniqueInput'),
      },
      async resolve(_parent, { where }, { prisma, select, authenticated }) {
        const alert = await prisma.contactAlert.findFirst({
          where,
          ...select,
        })
        const contactMedicalConditions = await prisma.contactMedicalCondition.findMany(
          {
            where: {
              contact_id: { equals: alert?.ContactID },
            },
            select: {
              id: true,
              MedicalCondition: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          }
        )
        if (!alert) {
          return 'Requested record not found'
        }

        const deleteContactAlert = async () => {
          await prisma.contactAlert.delete({
            where,
          })
        }

        const deleteContactMedicalCondition = async (tag) => {
          await prisma.contactMedicalCondition.delete({
            where: {
              unique_contact_medical_condition: {
                contact_id: alert?.ContactID,
                medical_record_id: 0,
                medical_condition_id: getMedicalConditionId(
                  contactMedicalConditions,
                  tag
                ),
              },
            },
          })
        }

        const deleteMedicalCondition = async (tag) => {
          await prisma.medicalCondition.delete({
            where: {
              id: getMedicalConditionId(contactMedicalConditions, tag),
            },
          })
        }

        const tags = alert?.Note?.split('#')
          ?.splice(1)
          ?.map((item) => {
            return item.split(' ')[0]
          })
        if (tags?.length === 0) {
          await deleteContactAlert()
        } else {
          for (const tag of tags) {
            const contactAlerts = await prisma.contactAlert.findMany({
              where: {
                Note: { contains: `#` + tag },
                CmContact: { company_id: { equals: authenticated.company } },
                NOT: [{ ID: { equals: where.ID } }],
              },
            })
            const contactIds = contactAlerts?.map((i) => i?.ContactID)
            if (contactIds?.length === 0) {
              await deleteContactMedicalCondition(tag)
              await deleteMedicalCondition(tag)
              await deleteContactAlert()
            } else if (contactIds?.includes(alert?.ContactID)) {
              await deleteContactAlert()
            } else if (!contactIds?.includes(alert?.ContactID)) {
              await deleteContactAlert()
              await deleteContactMedicalCondition(tag)
            }
          }
        }
        return alert
      },
    })
  },
})
