import { extendType, nonNull } from 'nexus'

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

          // console.info('condition', tag, id, refCondition)
        }

        return prisma.contactAlert.create({
          data,
          ...select,
        })
      },
    })
    t.field('updateContactAlertAdvanced', {
      // type: nonNull('ContactAlert'),
      type: 'Int',
      args: {
        where: nonNull('ContactAlertWhereUniqueInput'),
        data: nonNull('ContactAlertUpdateInput'),
      },
      async resolve(
        _parent,
        { data, where },
        { prisma, select, authenticated }
      ) {
        const { id, Note } = await prisma.contactAlert.findFirst({
          where,
        })

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

        // console.info(tags_old, tags)
        const difference = tags_old.filter((x) => !tags.includes(x))
        for (let old_tag of difference) {
          old_tag = `#` + old_tag
          console.info('old tag:', old_tag)

          const contactAlerts = await prisma.contactAlert.findMany({
            where: {
              Note: { contains: old_tag },
              CmContact: { company_id: authenticated.company },
              NOT: [{ ID: where.ID }],
            },
          })
          const stillExists = contactAlerts.filter(
            (x) => x.ContactID === data.CmContact.connect.ID
          )
          if (stillExists.length === 0) {
            const deleted = await prisma.contactMedicalCondition.delete({
              contact_id: data.CmContact.connect.ID,
              medical_record_id: 0,
              MedicalCondition: { name: old_tag },
              company_id: authenticated.company,
            })
          }
          if (contactAlerts.length === 0) {
            const deleted = await prisma.medicalCondition.delete({
              name: old_tag,
              company_id: authenticated.company,
            })
          }

          console.info('contactAlerts-->', contactAlerts, stillExists)
        }

        console.info('tags:', tags_old, tags, difference)

        // for (const tag of tags) {
        //   // console.info('--->', tag)
        //   const { id } = await prisma.medicalCondition.upsert({
        //     where: {
        //       unique_medical_condition_company: {
        //         name: tag,
        //         company_id: authenticated.company,
        //       },
        //     },
        //     create: {
        //       name: tag,
        //       company_id: authenticated.company,
        //     },
        //     update: {},
        //     select: {
        //       id: true,
        //     },
        //   })
        //   const refCondition = await prisma.contactMedicalCondition.upsert({
        //     where: {
        //       unique_contact_medical_condition: {
        //         contact_id: data.CmContact.connect.ID,
        //         medical_condition_id: id,
        //         medical_record_id: 0,
        //       },
        //     },
        //     create: {
        //       contact_id: data.CmContact.connect.ID,
        //       company_id: authenticated.company,
        //       medical_condition_id: id,
        //     },
        //     update: {},
        //     select: {
        //       id: true,
        //     },
        //   })
        //   // console.info('condition', tag, id, refCondition)
        // }
        // console.info('---->', where, data, select)

        // console.info(
        //   await prisma.contactAlert.update({
        //     where,
        //     data,
        //     select: {
        //       ID: true,
        //     },
        //   })
        // )
        // return prisma.contactAlert.findFirst({
        //   where,
        //   ...select,
        // })
        return 1
      },
    })
  },
})
