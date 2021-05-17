import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]: Maybe<T[SubKey]>};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<ResultUser>;
  login?: Maybe<ResultLogin>;
};

export type MutationRegisterArgs = {
  user: UserInput;
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<ResultUsers>;
  me?: Maybe<ResultUser>;
  /** Show stone list - Not implemented */
  stones?: Maybe<Scalars['Boolean']>;
};

/** Interface to specify the compulsory properties in responses */
export type Result = {
  /** Status of the operation */
  status: Scalars['Boolean'];
  /** Feedback message */
  message: Scalars['String'];
};

export type ResultLogin = Result & {
  __typename?: 'ResultLogin';
  /** Status of the login operation */
  status: Scalars['Boolean'];
  /** Feedback message */
  message: Scalars['String'];
  /** Access token from logedin user */
  token?: Maybe<Scalars['String']>;
};

export type ResultUser = Result & {
  __typename?: 'ResultUser';
  /** Status of the login operation */
  status: Scalars['Boolean'];
  /** Feedback message */
  message: Scalars['String'];
  /** Registered user info */
  user?: Maybe<User>;
};

export type ResultUsers = Result & {
  __typename?: 'ResultUsers';
  /** Status of the Users operation */
  status: Scalars['Boolean'];
  /** Feedback message */
  message: Scalars['String'];
  /** Users list */
  users: Array<User>;
};

export enum Role {
  Member = 'MEMBER',
  Admin = 'ADMIN',
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  userName: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  registerDate?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
};

/** Input to add user data for registration */
export type UserInput = {
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AddUserMutationVariables = Exact<{
  user: UserInput;
}>;

export type AddUserMutation = {__typename?: 'Mutation'} & {
  register?: Maybe<
    {__typename?: 'ResultUser'} & Pick<ResultUser, 'status' | 'message'> & {
        user?: Maybe<
          {__typename?: 'User'} & Pick<User, 'id' | 'userName' | 'email'>
        >;
      }
  >;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {__typename?: 'Mutation'} & {
  login?: Maybe<
    {__typename?: 'ResultLogin'} & Pick<
      ResultLogin,
      'status' | 'message' | 'token'
    >
  >;
};

export type UsersQueryVariables = Exact<{[key: string]: never}>;

export type UsersQuery = {__typename?: 'Query'} & {
  users?: Maybe<
    {__typename?: 'ResultUsers'} & Pick<ResultUsers, 'status' | 'message'> & {
        users: Array<
          {__typename?: 'User'} & Pick<
            User,
            | 'id'
            | 'userName'
            | 'name'
            | 'lastname'
            | 'email'
            | 'password'
            | 'registerDate'
            | 'avatar'
            | 'role'
          >
        >;
      }
  >;
};

export const AddUserDocument = gql`
  mutation addUser($user: UserInput!) {
    register(user: $user) {
      status
      message
      user {
        id
        userName
        email
      }
    }
  }
`;
export type AddUserMutationFn = Apollo.MutationFunction<
  AddUserMutation,
  AddUserMutationVariables
>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useAddUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUserMutation,
    AddUserMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(
    AddUserDocument,
    options,
  );
}
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<
  AddUserMutation,
  AddUserMutationVariables
>;
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const UsersDocument = gql`
  query Users {
    users {
      status
      message
      users {
        id
        userName
        name
        lastname
        email
        password
        registerDate
        avatar
        role
      }
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
