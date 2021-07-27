import type { StaffMeta } from '@pabau/graphql'

export const updateTable = (proxy, existing, query, values) => {
  if (existing) {
    const key = Object.keys(existing)[0]
    proxy.writeQuery({
      query,
      data: {
        [key]: [...existing[key], values],
      },
    })
  }
}

export const filter = (status: number): boolean => status === 0

export const isActionDisabled = (
  permission: string,
  staffMeta: Pick<StaffMeta, 'id' | 'meta_name' | 'meta_value'>[]
): boolean =>
  Number(
    staffMeta?.find((meta) => meta?.meta_name === permission)?.meta_value
  ) !== 1
