const fastify = require('fastify')({ logger: true })

fastify.register(require('./plugin/route'), { prefix: '/post' })

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (error) {
    console.log(error)
    fastify.log.error(error)
  }
}
start()
