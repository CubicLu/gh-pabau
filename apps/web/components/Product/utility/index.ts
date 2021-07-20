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
