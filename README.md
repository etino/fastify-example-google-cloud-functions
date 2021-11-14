# Google Cloud Functions with Fastify 


This is a boilerplate repository (template) to create a Google Cloud Functions service that uses [Fastify](https://www.fastify.io/) framework.

## Why using Fastify for serverless functions?
The main reason (opinionated) is its **schema based** approach that make easy to validate and serialize input and outputs.

Even if Fastify is complete (extensible) web framework, it could be used also in a serverless environment keeping in mind *"that functions as a service should always use small and focused functions"* because *"is important to remember that the bigger the application the slower the initial boot will be."* ([Should you use Fastify in a serverless platform?](https://www.fastify.io/docs/latest/Serverless/#should-you-use-fastify-in-a-serverless-platform))


## Local test

Install [Google Functions Framework for Node.js](https://github.com/GoogleCloudPlatform/functions-framework-nodejs) 

```
// Globally
$ npm i -g @google-cloud/functions-framework

// or as development library
$ npm i --save-dev @google-cloud/functions-framework
```

Run locally with Function Framework

```
$ npx @google-cloud/functions-framework --target=fastifyFunction
```

Also a quick `npm run dev` command script is available in `package.json`

## Deploy
```
$ gcloud functions deploy fastifyFunction \
--runtime nodejs14 --trigger-http --region $GOOGLE_REGION --allow-unauthenticated
```

## Read Log

```
$ gcloud functions logs read
```

## Example request form `/me` endpoint

```
$ curl -X POST $GOOGLE_CLOUD_FUNCTION_URL/me -H "Content-Type: application/json" -d '{ "name": "World" }'
```

## References

- [Google Function Framework](https://cloud.google.com/functions/docs/functions-framework)
- [Fastify - How to deploy on Firebase Functions/Google Cloud Functions](https://github.com/fastify/fastify/issues/946#issuecomment-766319521)
- [Fastify - Routes options](https://www.fastify.io/docs/latest/Routes/#routes-options)
