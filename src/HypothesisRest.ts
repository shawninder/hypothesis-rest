/**
 * Use the default export `HypothesisRestClient` to get a Client ready to make API calls using an authorization method that matches what you provide in the options.
 *
 * As an example, provide APIKeyOptions to the constructor to get a client ready to make requests authorized by that API key. Something similar can be said for each of the 4 supported authorization methods:
 * - Unauthenticated
 * - Using an API Key
 * - Using au Auth Client
 * - Using au Auth Client Forwarded User
 *
 * @module
 */
import z from 'zod'

import type { Annotation } from './Annotation'
import type { Group } from './Group'
import type { User } from './User'
import type { Profile } from './Profile'

import root, { type IndexResponse } from './api/root'
import search, { Query, Result} from './api/search'


import createAnnotation, { type NewAnnotation } from './api/createAnnotation'
import fetchAnnotation from './api/fetchAnnotation'
import updateAnnotation from './api/updateAnnotation'
import deleteAnnotation from './api/deleteAnnotation'
import flagAnnotation from './api/flagAnnotation'
import hideAnnotation from './api/hideAnnotation'
import showAnnotation from './api/showAnnotation'

import getListOfGroups from './api/getListOfGroups'
import createGroup, { type NewGroup } from './api/createGroup'
import fetchGroup from './api/fetchGroup'
import updateGroup from './api/updateGroup'
import createOrUpdateGroup from './api/createOrUpdateGroup'
import getGroupMembers from './api/getGroupMembers'
import addGroupMember from './api/addGroupMember'
import removeGroupMember from './api/removeGroupMember'

import fetchProfile from './api/fetchProfile'
import fetchUsersGroups from './api/fetchUsersGroups'

import createUser, { type NewUser } from './api/createUser'
import fetchUser from './api/fetchUser'
import updateUser from './api/updateUser'

/**
 * @group Zod Schemas
 */
export const options = z.object({
  apiUrl: z.string().optional()
}).strict()
/**
 * @group Client constructor
 * @virtual
 */
export type Options = z.infer<typeof options>

/**
 * @group Zod Schemas
 */
export const unauthenticatedOptions = options.extend({})

/**
 * @group Client constructor options
 */
export type UnauthenticatedOptions = z.infer<typeof unauthenticatedOptions>

/**
 * @group Clients
 */
export type UnauthenticatedClient = {
  /**
   * Performs a request against the API root, returning a list of available services
   * `GET /`
   * @see root: https://h.readthedocs.io/en/latest/api-reference/#tag/general/paths/~1/get
   * @throws {@link hypothesisFetch.ApiError}
   */
  root: () => Promise<IndexResponse>
  /**
   * Finds annotations based on a query object
   * `GET /search`
   * @param query Search query object
   * @see search: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1search/get
   * @throws {@link hypothesisFetch.ApiError}
   */
  search: (query: Query) => Promise<Result>
  annotations: {
    /**
     * Fetches an annotation by its ID
     * `GET /annotations/\{id\}`
     * @param annotationId ID of the annotation to be fetched
     * @see fetchAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    fetchAnnotation: (annotationId: string) => Promise<Annotation>
  }
  groups: {
    /**
     * Retrieve a list of applicable Groups as well as a user's private Groups.
     * `GET /groups`
     * @see getListOfGroups: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    getListOfGroups: () => Promise<Group[]>
    /**
     * Fetches a group by its ID
     * `GET /groups/\{id\}`
     * @param groupId ID of the group to be fetched
     * @see fetchGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    fetchGroup: (groupId: string) => Promise<Group>
    /**
     * Gets group members by group ID
     * `GET /groups/\{id\}/members`
     * @param groupId ID of the group to be created or updated
     * @see getGroupMembers: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}~1members/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    getGroupMembers: (groupId: string) => Promise<User[]>
  },
  profile: {
    /**
     * Fetches user's profile
     * `GET /profile`
     * @see fetchProfile: https://h.readthedocs.io/en/latest/api-reference/#tag/profile/paths/~1profile/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    fetchProfile: () => Promise<Profile>
    /**
     * Fetch the groups for which the currently-authenticated user is a member.
     * `GET /profile/groups`
     * @see fetchUsersGroups: https://h.readthedocs.io/en/latest/api-reference/#tag/profile/paths/~1profile~1groups/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    fetchUsersGroups: () => Promise<Group[]>
  }
}

// API Key
/**
 * @group Zod Schemas
 */
export const apiKeyOptions = options.extend({
  apiKey: z.string()
})

/**
 * @group Client constructor options
 */
export type ApiKeyOptions = z.infer<typeof apiKeyOptions>

/**
 * @group Clients
 */
export type ApiKeyClient = {
  /**
   * Performs a request against the API root, returning a list of available services
   * `GET /`
   * @see root: https://h.readthedocs.io/en/latest/api-reference/#tag/general/paths/~1/get
   * @throws {@link hypothesisFetch.ApiError}
   */
  root: () => Promise<IndexResponse>
  /**
   * Finds annotations based on a query object
   * `GET /search`
   * @param query Search query object
   * @see search: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1search/get
   * @throws {@link hypothesisFetch.ApiError}
   */
  search: (query: Query) => Promise<Result>
  annotations: {
    /**
     * Creates an annotation based on the information provided
     * `POST /annotations`
     * @param newAnnotation Annotation to be created
     * @see createAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations/post
     * @throws {@link hypothesisFetch.ApiError}
     */
    createAnnotation: (newAnnotation: NewAnnotation) => Promise<Annotation>
    /**
     * Fetches an annotation by its ID
     * `GET /annotations/\{id\}`
     * @param annotationId ID of the annotation to be fetched
     * @see fetchAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    fetchAnnotation: (annotationId: string) => Promise<Annotation>
    /**
     * Updates an annotation
     * `PATCH /annotations/\{id\}`
     * @param annotationId ID of the annotation to be updated
     * @param updatedAnnotation Update annotation
     * @see updateAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}/patch
     * @throws {@link hypothesisFetch.ApiError}
     */
    updateAnnotation: (annotationId: string, updatedAnnotation: NewAnnotation) => Promise<Annotation>
    /**
     * Deletes an annotation
     * `DELETE /annotations/\{id\}`
     * @param annotationId ID of the annotation to be deleted
     * @see deleteAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}/delete
     * @throws {@link hypothesisFetch.ApiError}
     */
    deleteAnnotation: (annotationId: string) => Promise<Annotation['id']>
    /**
     * Flags an annotation
     * `PUT /annotations/\{id\}/flag`
     * @param annotationId ID of the annotation to be flagged
     * @see flagAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}~1flag/put
     * @throws {@link hypothesisFetch.ApiError}
     */
    flagAnnotation: (annotationId: string) => Promise<boolean>
    /**
     * Hides an annotation
     * `PUT /annotations/\{id\}/hide`
     * @param annotationId ID of the annotation to be hidden
     * @see hideAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}~1hide/put
     * @throws {@link hypothesisFetch.ApiError}
     */
    hideAnnotation: (annotationId: string) => Promise<boolean>
    /**
     * Shows an annotation
     * `DELETE /annotations/\{id\}/hide`
     * @param annotationId ID of the annotation to be shown
     * @see showAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}~1hide/delete
     * @throws {@link hypothesisFetch.ApiError}
     */
    showAnnotation: (annotationId: string) => Promise<boolean>
  }
  groups: {
    /**
     * Retrieve a list of applicable Groups as well as a user's private Groups.
     * `GET /groups`
     * @see getListOfGroups: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    getListOfGroups: () => Promise<Group[]>
    /**
     * Creates a group
     * `POST /groups`
     * @param newGroup The new group to be created
     * @see createGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups/post
     * @throws {@link hypothesisFetch.ApiError}
     */
    createGroup: (group: NewGroup) => Promise<Group>
    /**
     * Fetches a group by its ID
     * `GET /groups/\{id\}`
     * @param groupId ID of the group to be fetched
     * @see fetchGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    fetchGroup: (groupId: string) => Promise<Group>
    /**
     * Updates a group by its ID
     * `PATCH /groups/\{id\}`
     * @param groupId ID of the group to be updated
     * @param group Updated group
     * @see updateGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/patch
     * @throws {@link hypothesisFetch.ApiError}
     */
    updateGroup: (groupId: string, updatedGroup: NewGroup) => Promise<Group>
    /**
     * Creates or updates a group
     * `PUT /groups/\{id\}`
     * @param groupId ID of the group to be created or updated
     * @param group New or updated group
     * @see createOrUpdateGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/put
     * @throws {@link hypothesisFetch.ApiError}
     */
    createOrUpdateGroup: (groupId: string, newOrUpdatedGroup: NewGroup) => Promise<Group>
    /**
     * Gets group members by group ID
     * `GET /groups/\{id\}/members`
     * @param groupId ID of the group to be created or updated
     * @see getGroupMembers: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}~1members/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    getGroupMembers: (groupId: string) => Promise<User[]>
    /**
     * Removes a member from a group
     * `DELETE /groups/\{id\}/members/\{user\}`
     * @param groupId ID of the group from which the member should be removed
     * @see removeGroupMember: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}~1members~1\{user\}/delete
     * @throws {@link hypothesisFetch.ApiError}
     */
    removeGroupMember: (groupId: string) => Promise<boolean>
  },
  profile: {
    /**
     * Fetches user's profile
     * `GET /profile`
     * @see fetchProfile: https://h.readthedocs.io/en/latest/api-reference/#tag/profile/paths/~1profile/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    fetchProfile: () => Promise<Profile>
    /**
     * Fetch the groups for which the currently-authenticated user is a member.
     * `GET /profile/groups`
     * @see fetchUsersGroups: https://h.readthedocs.io/en/latest/api-reference/#tag/profile/paths/~1profile~1groups/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    fetchUsersGroups: () => Promise<Group[]>
  }
}

/**
 * @group Zod Schemas
 */
export const authClientOptions = options.extend({
  authClient: z.string()
})

/**
 * @group Clients
 */
export type AuthClientClient = {
  /**
   * Performs a request against the API root, returning a list of available services
   * `GET /`
   * @see root: https://h.readthedocs.io/en/latest/api-reference/#tag/general/paths/~1/get
   * @throws {@link hypothesisFetch.ApiError}
   */
  root: () => Promise<IndexResponse>
  /**
   * Finds annotations based on a query object
   * `GET /search`
   * @param query Search query object
   * @see search: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1search/get
   * @throws {@link hypothesisFetch.ApiError}
   */
  search: (query: Query) => Promise<Result>
  groups: {
    /**
     * Fetches a group by its ID
     * `GET /groups/\{id\}`
     * @param groupId ID of the group to be fetched
     * @see fetchGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    fetchGroup: (groupId: string) => Promise<Group>
    /**
     * Updates a group by its ID
     * `PATCH /groups/\{id\}`
     * @param groupId ID of the group to be updated
     * @param group Updated group
     * @see updateGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/patch
     * @throws {@link hypothesisFetch.ApiError}
     */
    updateGroup: (groupId: string, updatedGroup: NewGroup) => Promise<Group>
    /**
     * Gets group members by group ID
     * `GET /groups/\{id\}/members`
     * @param groupId ID of the group to be created or updated
     * @see getGroupMembers: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}~1members/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    getGroupMembers: (groupId: string) => Promise<User[]>
    /**
     * Adds a member to a group
     * `POST /groups/\{id\}/members/\{user\}`
     * @param groupId ID of the group to which the member should be added
     * @param userId ID of the user to add to the group as a new member
     * @see addGroupMember: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}~1members~1\{user\}/post
     * @throws {@link hypothesisFetch.ApiError}
     */
    addGroupMember: (groupId: string, userId: string) => Promise<boolean>
  },
  users: {
    /**
     * Creates a new user
     * `POST /users`
     * @param newUser New User to be created
     * @see createUser: https://h.readthedocs.io/en/latest/api-reference/#tag/users/paths/~1users/post
     * @throws {@link hypothesisFetch.ApiError}
     */
    createUser: (newUser: NewUser) => Promise<User>
    /**
     * Fetches a user by ID
     * `GET /users/\{id\}`
     * @param userId ID of the user to fetch
     * @see fetchUser: https://h.readthedocs.io/en/latest/api-reference/#tag/users/paths/~1users~1\{user\}/get
     * @throws {@link hypothesisFetch.ApiError}
     */
    fetchUser: (userId: User['userid']) => Promise<User>
    /**
     * Updates a user
     * `PATCH /users/\{id\}`
     * @param userId ID of the user to update
     * @param updatedUser Updated user
     * @see updateUser: https://h.readthedocs.io/en/latest/api-reference/#tag/users/paths/~1users~1\{username\}/patch
     * @throws {@link hypothesisFetch.ApiError}
     */
    updateUser: (userId: User['userid'], newUser: NewUser) => Promise<User>
  }
}

/**
 * @group Client constructor options
 */
export type AuthClientOptions = z.infer<typeof authClientOptions>

/**
 * @group Zod Schemas
 */
export const authClientForwardedUserOptions = options.extend({
  authClientForwardedUser: z.string()
})

/**
 * @group Client constructor options
 */
export type AuthClientForwardedUserOptions = z.infer<typeof authClientForwardedUserOptions>

/**
 * @group Clients
 */
export type AuthClientForwardedUserClient = {
  /**
   * Performs a request against the API root, returning a list of available services
   * `GET /`
   * @see root: https://h.readthedocs.io/en/latest/api-reference/#tag/general/paths/~1/get
   * @throws {@link hypothesisFetch.ApiError}
   */
  root: () => Promise<IndexResponse>
  /**
   * Finds annotations based on a query object
   * `GET /search`
   * @param query Search query object
   * @see search: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1search/get
   * @throws {@link hypothesisFetch.ApiError}
   */
  search: (query: Query) => Promise<Result>
  groups: {
    /**
     * Creates a group
     * `POST /groups`
     * @param newGroup The new group to be created
     * @see createGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups/post
     * @throws {@link hypothesisFetch.ApiError}
     */
    createGroup: (group: NewGroup) => Promise<Group>
    /**
     * Updates a group by its ID
     * `PATCH /groups/\{id\}`
     * @param groupId ID of the group to be updated
     * @param group Updated group
     * @see updateGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/patch
     * @throws {@link hypothesisFetch.ApiError}
     */
    updateGroup: (groupId: string, updatedGroup: NewGroup) => Promise<Group>
    /**
     * Creates or updates a group
     * `PUT /groups/\{id\}`
     * @param groupId ID of the group to be created or updated
     * @param group New or updated group
     * @see createOrUpdateGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/put
     * @throws {@link hypothesisFetch.ApiError}
     */
    createOrUpdateGroup: (groupId: string, newOrUpdatedGroup: NewGroup) => Promise<Group>
  }
}
/**
 * @group Client constructor
 */
export type Client = UnauthenticatedClient | ApiKeyClient | AuthClientClient | AuthClientForwardedUserClient

/**
 * @group Zod Schemas
 */
export const optionsSchema = apiKeyOptions
  .or(authClientOptions)
  .or(authClientForwardedUserOptions)
  .or(unauthenticatedOptions)

/**
 * @group Constants
 */
export const DEFAULT_API_URL = 'https://hypothes.is/api' as const
/**
 * @group Constants
 */
export const COMMON_HEADERS = {
  Accept: 'application/vnd.hypothesis.v1+json' // @see https://h.readthedocs.io/en/latest/api-reference/v1/#section/Hypothesis-API/Versions "We urge clients to use `Accept: application/vnd.hypothesis.v1+json`"
} as const

/**
 * @override For **unauthenticated** access
 * @param options.apiUrl (optional) Target annotation database API URL. Default: `https://hypothes.is/api`
 * @see API: https://h.readthedocs.io/en/latest/api/
 * @see Authorization: https://h.readthedocs.io/en/latest/api-reference/#section/Hypothesis-API/Authorization
 */
export default function HypothesisRest (options?: UnauthenticatedOptions): UnauthenticatedClient;
/**
 * @override For access authenticated via **API Key**
 * @param options.apiKey API Key to use for authorizing the request
 * @param options.apiUrl (optional) Target annotation database API URL. Default: `https://hypothes.is/api`
 * @see API: https://h.readthedocs.io/en/latest/api/
 * @see API-Key: https://h.readthedocs.io/en/latest/api-reference/#section/Authentication/ApiKey
 * @see Access-Tokens: https://h.readthedocs.io/en/latest/api/authorization/#access-tokens
 */
export default function HypothesisRest (options: ApiKeyOptions): ApiKeyClient;
/**
 * @override For access authenticated via **Auth Client**
 * @param options.authClient Auth Client to use for authorizing the request
 * @param options.apiUrl (optional) Target annotation database API URL. Default: `https://hypothes.is/api`
 * @see API: https://h.readthedocs.io/en/latest/api/
 * @see AuthClient: https://h.readthedocs.io/en/latest/api-reference/#section/Authentication/AuthClient
 * @see Using-OAuth: https://h.readthedocs.io/en/latest/api/using-oauth/
 */
export default function HypothesisRest (options: AuthClientOptions): AuthClientClient;
/**
 * @override For access authenticated via **Auth Client Forwarded User**
 * @param options.AuthClientForwardedUser Auth Client Forwarded User to use for authorizing the request
 * @param options.apiUrl (optional) Target annotation database API URL. Default: `https://hypothes.is/api`
 * @see API: https://h.readthedocs.io/en/latest/api/
 * @see AuthClientForwardedUser: https://h.readthedocs.io/en/latest/api-reference/#section/Authentication/AuthClientForwardedUser
 * @see Using-OAuth: https://h.readthedocs.io/en/latest/api/using-oauth/
 */
export default function HypothesisRest (options: AuthClientForwardedUserOptions): AuthClientForwardedUserClient;
/**
 * @group Client constructor
 */
export default function HypothesisRest (
  options: UnauthenticatedOptions
    | ApiKeyOptions
    | AuthClientOptions
    | AuthClientForwardedUserOptions
    = {}
): Client {
  const validOptions = optionsSchema.parse(options)
  let authType = 'unauthenticated'
  const keys = Object.keys(validOptions)

  keys.forEach((key) => {
    switch (key) {
      case 'apiKey':
        authType = 'apiKey'
        break
      case 'authClient':
        authType = 'authClient'
        break
      case 'authClientForwardedUser':
        authType = 'authClientForwardedUser'
        break
    }
  })

  if (authType === 'apiKey') {
    const opts = validOptions as ApiKeyOptions
    const headers = {
      ...COMMON_HEADERS,
      Authorization: `Bearer ${opts.apiKey}`
    }

    const connectionOptions = {
      apiUrl: validOptions.apiUrl || DEFAULT_API_URL,
      headers
    }

    return {
      root: root.bind(root, connectionOptions),
      search: search.bind(search, connectionOptions),
      annotations: {
        createAnnotation: createAnnotation.bind(createAnnotation, connectionOptions),
        fetchAnnotation: fetchAnnotation.bind(fetchAnnotation, connectionOptions),
        updateAnnotation: updateAnnotation.bind(updateAnnotation, connectionOptions),
        deleteAnnotation: deleteAnnotation.bind(deleteAnnotation, connectionOptions),
        flagAnnotation: flagAnnotation.bind(flagAnnotation, connectionOptions),
        hideAnnotation: hideAnnotation.bind(hideAnnotation, connectionOptions),
        showAnnotation: showAnnotation.bind(showAnnotation, connectionOptions)
      },
      groups: {
        getListOfGroups: getListOfGroups.bind(getListOfGroups, { ...connectionOptions, headers }),
        createGroup: createGroup.bind(createGroup, { ...connectionOptions, headers }),
        fetchGroup: fetchGroup.bind(fetchGroup, { ...connectionOptions, headers }),
        updateGroup: updateGroup.bind(updateGroup, { ...connectionOptions, headers }),
        createOrUpdateGroup: createOrUpdateGroup.bind(createOrUpdateGroup, { ...connectionOptions, headers }),
        getGroupMembers: getGroupMembers.bind(getGroupMembers, { ...connectionOptions, headers }),
        removeGroupMember: removeGroupMember.bind(removeGroupMember, { ...connectionOptions, headers })
      },
      profile: {
        fetchProfile: fetchProfile.bind(fetchProfile, { ...connectionOptions, headers }),
        fetchUsersGroups: fetchUsersGroups.bind(fetchUsersGroups, { ...connectionOptions, headers })
      }
    } as ApiKeyClient
  }
  if (authType === 'authClient') {
    const opts = validOptions as AuthClientOptions
    const headers = { ...COMMON_HEADERS, Authorization: `Basic ${opts.authClient}` }
    const connectionOptions = {
      apiUrl: validOptions.apiUrl || DEFAULT_API_URL,
      headers
    }

    return {
      root: root.bind(root, connectionOptions),
      search: search.bind(search, connectionOptions),
      groups: {
        fetchGroup: fetchGroup.bind(fetchGroup, { ...connectionOptions, headers }),
        updateGroup: updateGroup.bind(updateGroup, { ...connectionOptions, headers }),
        getGroupMembers: getGroupMembers.bind(getGroupMembers, { ...connectionOptions, headers }),
        addGroupMember: addGroupMember.bind(addGroupMember, { ...connectionOptions, headers }),
      },
      users: {
        createUser: createUser.bind(createUser, { ...connectionOptions, headers }),
        fetchUser: fetchUser.bind(fetchUser, { ...connectionOptions, headers }),
        updateUser: updateUser.bind(updateUser, { ...connectionOptions, headers }),
      }
    } as AuthClientClient
  }
  if (authType === 'authClientForwardedUser') {
    const opts = validOptions as AuthClientForwardedUserOptions
    const headers = { ...COMMON_HEADERS, 'X-Forwarded-User': opts.authClientForwardedUser }
    const connectionOptions = {
      apiUrl: validOptions.apiUrl || DEFAULT_API_URL,
      headers
    }

    return {
      root: root.bind(root, connectionOptions),
      search: search.bind(search, connectionOptions),
      groups: {
        createGroup: createGroup.bind(createGroup, { ...connectionOptions, headers }),
        updateGroup: updateGroup.bind(updateGroup, { ...connectionOptions, headers }),
        createOrUpdateGroup: createOrUpdateGroup.bind(createOrUpdateGroup, { ...connectionOptions, headers })
      }
    } as AuthClientForwardedUserClient
  }
  const connectionOptions = {
    apiUrl: validOptions.apiUrl || DEFAULT_API_URL,
    headers: COMMON_HEADERS
  }

  return {
    root: root.bind(root, connectionOptions),
      search: search.bind(search, connectionOptions),
      annotations: {
        fetchAnnotation: fetchAnnotation.bind(fetchAnnotation, connectionOptions)
      },
      groups: {
        getListOfGroups: getListOfGroups.bind(getListOfGroups, connectionOptions),
        fetchGroup: fetchGroup.bind(fetchGroup, connectionOptions),
        getGroupMembers: getGroupMembers.bind(getGroupMembers, connectionOptions)
      },
      profile: {
        fetchProfile: fetchProfile.bind(fetchProfile, connectionOptions),
        fetchUsersGroups: fetchUsersGroups.bind(fetchUsersGroups, connectionOptions)
      }
  } as UnauthenticatedClient
}
