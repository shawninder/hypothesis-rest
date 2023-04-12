# Hypothesis-REST

WORK-IN-PROGRESS
![License](https://img.shields.io/github/license/shawninder/hypothesis-rest)
[![npm version](https://img.shields.io/npm/v/hypothesis-rest?logo=npm)](https://npmjs.com/package/hypothesis-rest)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/hypothesis-rest?label=npm%20bundle%20size&logo=npm)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/shawninder/hypothesis-rest?logo=libraries.io)
![Deployment workflow](https://github.com/shawninder/hypothesis-rest/actions/workflows/deploy.yml/badge.svg)
[![Docs deployment](https://img.shields.io/github/deployments/shawninder/hypothesis-rest/github-pages?label=Docs%20deployment%20on%20GitHub%20pages&logo=github)](https://shawninder.github.io/hypothesis-rest)
[![Coverage Status](https://img.shields.io/coverallsCoverage/github/shawninder/hypothesis-rest?logo=coveralls&label=test%20coverage)](https://coveralls.io/github/shawninder/hypothesis-rest?branch=main)
[![Buy me a Coffee button](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg?logo=buymeacoffee)](https://buymeacoffee.com/shawninder)

A Typescript client for [the Hypothesis REST API](https://h.readthedocs.io/en/latest/api/) for Node.js and the browser

- Static type checking for your API calls, responses and errors
- Typescript errors for unauthenticated requests
- Deal with Annotations, Groups, Profiles and Users rather than just HTTP requests

Catch mistakes as you type and minimize the need for actually making real API calls just for testing purposes.

## [Get Started](https://shawninder.github.io/hypothesis-rest/pages/getting-started.html)
## [Examples](https://shawninder.github.io/hypothesis-rest/pages/examples.html)
## [Documentation](https://shawninder.github.io/hypothesis-rest/)
## Runtime Requirements: [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
This code uses `fetch` so it will run as-is in modern browsers and Node.js 18 or later (the [`fetch` Browser compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API#browser_compatibility) on MDN also mentions Node.js 18).

To support anything else, you can polyfill `fetch`:
- [For Node.js < 18](https://www.npmjs.com/package/node-fetch-polyfill)
- [For older or fringe browsers](https://www.npmjs.com/package/whatwg-fetch)
- There are [plenty of others](https://www.google.com/search?q=fetch+polyfill) out there

## Authorization
This package enforces the rules described in [the Hypothesis docs](https://h.readthedocs.io/en/latest/api-reference/) (notice the authentication method(s) required for each route noted next to the AUTHORIZATIONS label).

- [Generate your API token](https://hypothes.is/account/developer) (you'll need to be logged into Hypothesis)
- Generate au OAuth token
- Get an OAuth token for someone else's account

action | <small>Unauthenticated</small> | <small>API Key</small> | <small>Auth Client</small> | <small>Auth Client Forwarded User</small>
---|---|---|---|---
`root`                | ✓ | ✓ | ✓ | ✓
`search`              | ✓ | ✓ | ✓ | ✓
`createAnnotation`    |   | ✓ |   |
`fetchAnnotation`     | ✓ | ✓ |   |
`updateAnnotation`    |   | ✓ |   |
`deleteAnnotation`    |   | ✓ |   |
`flagAnnotation`      |   | ✓ |   |
`hideAnnotation`      |   | ✓ |   |
`showAnnotation`      |   | ✓ |   |
`getListOfGroups`     | ✓ | ✓ |   |
`createGroup`         |   | ✓ |   | ✓
`fetchGroup`          | ✓ | ✓ | ✓ |
`updateGroup`         |   | ✓ | ✓ | ✓
`createOrUpdateGroup` |   | ✓ |   | ✓
`getGroupMembers`     | ✓ | ✓ | ✓ |
`addGroupMember`      |   |   | ✓ |
`removeGroupMember`   |   | ✓ |   |
`fetchProfile`        | ✓ | ✓ |   |
`fetchUsersGroups`    | ✓ | ✓ |   |
`createUser`          |   |   | ✓ |
`fetchUser`           |   |   | ✓ |
`updateUser`          |   |   | ✓ |

## Development
- clone this repo
- `npm i` to install dependencies
- `npm run` to see more options

## Tests
**Heads Up!** : Running the tests performs **real** requests against the Hypothes.is **production** API!

If you intend to run the tests (`npm test`), you'll first need to create a local environment file (`cp .env.example .env.testing.local`) and add a value for each declared environment variable. This will allow you to test using the library to reach endpoints that require authentication, among other things.

## Coming Up
- Publish docs to github.io
- Test Coverage
- Bundle size analysis
- Badges (status, tests, size, test coverage, npm via badge.fury.io)
- Add Client Credentials auth method to /users endpoints (see https://h.readthedocs.io/en/latest/api/authorization/#client-credentials)
- 100% Route Coverage
- Publish to npm
- Battle-test
- v2 support
- Add to https://web.hypothes.is/tools-plug-ins-and-integrations/
- Optimize performance
- Local Test API Instance which can provide things like Auth Client tokens and avoid things like email notifications when an annotation is flagged.