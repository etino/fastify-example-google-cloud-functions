// Serverless function for Google Cloud Function

const fastify = require("fastify")({
  logger: true, // Use  logger: { level: 'info' } to set the log level
  serverFactory: (handler, opts) => {
    const server = require("http").createServer((req, res) => {
      handler(req, res);
    });
    return server;
  },
});

// Required https://github.com/fastify/fastify/issues/946#issuecomment-766319521
fastify.addContentTypeParser("application/json", {}, (req, body, done) => {
  done(null, body.body);
});

fastify.get("/", (req, reply) => {
  req.log.info("Hello World - GET - /");
  reply.send({
    message: "Hello World!",
    method: req.method,
    url: req.url,
  });
});

fastify.get("/hello", (req, reply) => {
  req.log.info("Hello World - GET - /hello");
  reply.send({
    message: "Hello World!",
    method: req.method,
    url: req.url,
  });
});

fastify.post("/", (req, reply) => {
  req.log.info("Hello World - POST - /");
  reply.send({
    message: "Hello World!",
    method: req.method,
    url: req.url,
  });
});

// Example with route, schema validation and custom log level
fastify.route({
  method: "POST",
  url: "/me",
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          method: { type: "string" },
          url: { type: "string" },
        },
      },
    },
  },
  handler: (req, reply) => {
    req.log.trace("Hello World - POST - /hello");
    const { name } = req.body;
    reply.code(200).send({
      message: `Hello ${name}!`,
      method: req.method,
      url: req.url,
    });
  },
  logLevel: "trace",
});

const app = async (req, res) => {
  // Wait for fastify ready
  await fastify.ready();
  // Emit request event
  fastify.server.emit("request", req, res);
};

exports.fastifyFunction = app;
