import {
  DocumentNode,
  QueryHookOptions,
  QueryResult,
  useQuery,
} from '@apollo/client'

/**
 * Like useQuery + useSubscription combined =]
 *
 * @param query - the gql that is a `query{}` with a single top-level query
 * @param options - contains `{variables:{}}`
 */
export function useLiveQuery<T>(
  query: DocumentNode,
  options?: QueryHookOptions<T> & { subscription?: DocumentNode }
): Omit<QueryResult, 'subscribeToMore'> {
  const { subscribeToMore, ...rest } = useQuery<T>(query, {
    ssr: false,
    skip: typeof window === 'undefined',
    ...options,
  })
  // rest.
  // useEffect(() => {
  //   console.log('creating sub!')
  //   const cancelFunc = subscribeToMore({
  //     document: options?.subscription || convert(query),
  //     variables: options?.variables ? options.variables : undefined,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       console.log('GOT SUBSCRIPTION DATA', prev, subscriptionData)
  //
  //       if (!subscriptionData.data) return prev
  //       const key = Object.keys(subscriptionData.data)[0]
  //       return Object.assign({}, prev, {
  //         [key]: (subscriptionData.data as Record<string, unknown>)[key],
  //       })
  //     },
  //   })
  //
  //   return () => {
  //     console.log('cleaning up sub!')
  //     cancelFunc()
  //   }
  // }, [query, subscribeToMore, options])

  const data = rest.data
    ? Object.keys(rest.data).length > 1
      ? rest.data
      : (rest.data as Record<string, unknown>)[
          Object.keys(rest.data as Record<string, unknown>)[0]
        ]
    : undefined
  return { ...rest, data }
}
