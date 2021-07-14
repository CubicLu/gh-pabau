import { ApolloError } from '@apollo/client'

export const uniqueConstraintErrorDecoder = (
  error: ApolloError
): { error: ApolloError; model: string; field: string; type: string } => {
  const uniqueConstraintError = error?.graphQLErrors?.find(
    (err) => err?.extensions?.name === 'UniqueConstraintError'
  )?.extensions
  return {
    model: uniqueConstraintError?.modelName,
    field: uniqueConstraintError?.fieldName,
    type: uniqueConstraintError?.name,
    error: error,
  }
}
