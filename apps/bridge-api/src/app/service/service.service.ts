import { Context } from '../../context'

export const getServicesByStaff = async (staffId, ctx: Context) => {
  const services = await getServices(ctx)

  return services.filter(
    (service) =>
      !service.disabledusers
        ?.split(',')
        .map((id) => Number(id))
        .includes(staffId)
  )
}

const getServices = async (ctx: Context) => {
  return await ctx.prisma.companyService.findMany({
    where: { company_id: { equals: ctx.authenticated.company } },
  })
}
