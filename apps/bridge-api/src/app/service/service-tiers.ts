import { Context } from '../../context'

export const getServiceTier = async (
  service_id: number,
  employee_id: number,
  location_id: number,
  ctx: Context
) => {
  return {
    cost: 0,
    duration: 0,
  }
}
