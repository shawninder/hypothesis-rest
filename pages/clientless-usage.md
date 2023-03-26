The 4 clients represent the 4 authentication methods available, but you can also just call the action you want to perform directly and provide the appropriate connection options yourself.
You'll notice in the docs for each action that there is a first parameter, `connectionOptions`, which isn't required when using the clients since they provide this for you based on the information used during instantiation. When using the action functions directly however, you need to provide the options yourself. Here is how these parameters were created for use in the examples of clientless usage below:

{@codeblock fixtures.ts#connectionOptions*}

## Examples
###   Fetch an Annotation unauthenticated
{@codeblock clientless/unauthenticated.test-d.ts#fetchAnnotation}

### Create an Annotation using an API key
{@codeblock clientless/apiKey.test-d.ts#createAnnotation}

### Fetch a Group using an Auth Client
{@codeblock clientless/authClient.test-d.ts#fetchGroup}

### Fetch the API root using an Auth Client Forwarded User
{@codeblock clientless/authClientForwardedUser.test-d.ts#root}
