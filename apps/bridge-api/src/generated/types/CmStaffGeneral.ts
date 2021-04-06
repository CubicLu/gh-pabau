import { objectType, arg, extendType } from 'nexus'

export const CmStaffGeneral = objectType({
  name: 'CmStaffGeneral',
  definition(t) {
    t.model.ID()
    t.model.OwnerID()
    t.model.company_id()
    t.model.Avatar()
    t.model.Fname()
    t.model.Lname()
    t.model.MI()
    t.model.Birthdate()
    t.model.SSN()
    t.model.Address1()
    t.model.Address2()
    t.model.City()
    t.model.St()
    t.model.Zip()
    t.model.Country()
    t.model.HomePhone()
    t.model.WorkPhone()
    t.model.CellPhone()
    t.model.Fax()
    t.model.Email()
    t.model.Status()
    t.model.EmployeeNumber()
    t.model.HireDate()
    t.model.RenewalDate()
    t.model.max_vacation_days()
    t.model.Location()
    t.model.Position()
    t.model.Department()
    t.model.Manager()
    t.model.W4Status()
    t.model.Exemptions()
    t.model.Gender()
    t.model.EEOCode()
    t.model.EEOCategory()
    t.model.NextReview()
    t.model.EnumStatus()
    t.model.CreatedDate()
    t.model.IpAddress()
    t.model.pabau_id()
    t.model.DefaultLocation()
    t.model.consultation_fee()
    t.model.deleted_on()
    t.model.secretary()
    t.model.secretary_enable()
    t.model.Salutation()
    t.model.commission_sheet_id()
    t.model.User()
    t.model.Company()
    t.model.CompanyBranch()
    t.model.CompanyPosition()
    t.model.HolidayRequest()
  },
})

export const cmStaffGeneralQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmStaffGeneral()
    t.field('findFirstCmStaffGeneral', {
      type: 'CmStaffGeneral',
      args: {
        where: 'CmStaffGeneralWhereInput',
        orderBy: arg({ type: 'CmStaffGeneralOrderByInput' }),
        cursor: 'CmStaffGeneralWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmStaffGeneral.findFirst(args as any)
      },
    })
    t.crud.cmStaffGenerals({ filtering: true, ordering: true })
    t.field('cmStaffGeneralsCount', {
      type: 'Int',
      args: {
        where: 'CmStaffGeneralWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmStaffGeneral.count(args as any)
      },
    })
  },
})

export const cmStaffGeneralMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmStaffGeneral()
    t.crud.updateOneCmStaffGeneral()
    t.crud.upsertOneCmStaffGeneral()
    t.crud.deleteOneCmStaffGeneral()
    t.crud.updateManyCmStaffGeneral()
  },
})
