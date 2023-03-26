## 1. Install
```
npm i hypothesis-rest
```

## 2. Import
```ts
import HypothesisRestClient from 'hypothesis-rest'
```

## 3. Authentication
Get a client appropriate to your authorization requirements, it will provide you with only those API endpoints available with this authentication method:

### {@link HypothesisRest.UnauthenticatedClient | "Unauthenticated" Client}:

{@codeblock clients/unauthenticated.test-d.ts#instantiation}

### {@link HypothesisRest.ApiKeyClient | "API key" Client}:

{@codeblock clients/apiKey.test-d.ts#instantiation}

### {@link HypothesisRest.AuthClientClient | "Auth Client" Client}:

{@codeblock clients/authClient.test-d.ts#instantiation}

### {@link HypothesisRest.AuthClientForwardedUserClient | "Auth Client Forwarded User" Client}:

{@codeblock clients/authClientForwardedUser.test-d.ts#instantiation}

See which endpoints support or require which auth types in [the endpoints table](#endpoints) below, or go directly to [the Hypothesis docs on Authorization](https://h.readthedocs.io/en/latest/api-reference/v1/#section/Hypothesis-API/Authorization)

## 4. Perform requests

### e.g. Fetch an Annotation unauthenticated
{@codeblock clients/unauthenticated.test-d.ts#fetchAnnotation}

### e.g. Create an Annotation using an API key
{@codeblock clients/apiKey.test-d.ts#createAnnotation}

### e.g. Fetch a Group using an Auth Client
{@codeblock clients/authClient.test-d.ts#fetchGroup}

### e.g. Fetch the API root using an Auth Client Forwarded User
{@codeblock clients/authClientForwardedUser.test-d.ts#root}

## [Clientless usage](clientless-usage.md)

## [Error Handling](error-handling.md)
