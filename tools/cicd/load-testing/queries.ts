import {gql} from "graphql-request";

interface Query {
  query: string
  validate?(data: any): void
}

export const queries: Record<string, Query> = {
  PRISMA_SIMPLE: {
    query: gql`
      query {
        me {
          id
          full_name
        }
      }
    `,
    validate(data) {
      if (!data?.me?.full_name) throw new Error("Invalid data received from server")
    },
  },
  PRISMA_COMPLEX: {
    query: gql`
      query {
        me {
          id
          full_name
          Company {
            id
            remote_url
            details {
              company_id
              company_name
            }
          }
        }
        findManyUser(orderBy: {
          username: asc
        }){
          username
          full_name
        }
      }
    `,
    validate(data) {
      if (data?.me?.Company?.id !== 8119) throw new Error("Invalid data received from server")
    },
  },
  HASURA_SIMPLE: {
    query: gql`
      query {
        feature_flags(limit: 1) { id }
      }
    `,
    validate(data) {
      if (!(data?.feature_flags.length > 0)) throw new Error("Invalid data received from server")
    },
  },
  HASURA_COMPLEX: {
    query: gql`
      query {
        feature_flags { id status }
        test1: feature_flags { id status }
        test2: feature_flags { id status }
        test3: feature_flags { id status }
        test4: feature_flags { id status }
        test5: feature_flags { id status }
        test6: feature_flags { id status }
        test7: feature_flags { id status }
        test8: feature_flags { id status }
        test9: feature_flags { id status }
        chat { message }
        chat_room { participants { room_id room { chats { message } } } }
      }
    `,
    validate(data) {
      if (!(data?.feature_flags.length > 0)) throw new Error("Invalid data received from server")
    },
  }
} as const
