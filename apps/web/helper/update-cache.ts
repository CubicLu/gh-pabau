export const updateTable = (cache, existing, query, values) => {
  if (existing) {
    const key = Object.keys(existing)[0]
    cache.writeQuery({
      query,
      data: {
        [key]: [...existing[key], values],
      },
    })
  }
}
