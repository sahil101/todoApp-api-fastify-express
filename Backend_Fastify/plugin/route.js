
const employers = []
const getOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            team: { type: 'string' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' }
          }
        }
      }
    }
  }
}
const getOption = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          team: { type: 'string' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' }
        }
      }
    }
  }
}
const postOption = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      team: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        _id: { type: 'string' }
      }
    }
  }
}
function routes (fastify, options, done) {
  fastify.get('/', getOptions, async (request, reply) => {
    return employers
  })

  fastify.get('/:id', getOption, async (request, reply) => {
    const employer = employers.find(emp => emp._id === request.params.id)
    return employer
  })

  fastify.post('/', postOption, async (request, reply) => {
    const id = (Math.floor(Math.random() * 100)).toString()
    const createdAt = new Date()
    const updatedAt = new Date()
    const newEmployee = {
      _id: id,
      name: request.body.name,
      team: request.body.team,
      created_at: createdAt,
      updated_at: updatedAt
    }
    employers.push(newEmployee)
    return { _id: id }
  })
  fastify.put('/', async (request, reply) => {
    const team = request.body.team
    const id = request.body._id
    const employerIndex = employers.findIndex(emp => id === emp._id)
    if (employerIndex === -1) {
      return 'employer with this ID does not exist'
    }
    employers[employerIndex].team = team
    return 'successfully Updated'
  })
  fastify.delete('/:id', async (request, reply) => {
    const employerIndex = employers.findIndex(emp => request.params.id === emp._id)
    if (employerIndex === -1) {
      return 'employer with this ID does not exits'
    }
    employers.splice(employerIndex, 1)
    return 'employer deleted'
  })
  done()
}

module.exports = routes
