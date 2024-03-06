import supertest from 'supertest'

const agent = supertest.agent('http://localhost:3000/api/v1')

describe('Authorization', () => {
  it('POST /account/login', async () => {
    const member = {
      email: 'clarabelle83@hotmail.com',
      password: 'Password123!',
    }
    const res = await agent.post('/account/login').send(member)
    // set authorization cookie for subsequent tests
    agent.set('Cookie', res.headers['set-cookie'])
    expect(res.statusCode).toEqual(201)
  })

  it('GET /people', async () => {
    const res = await agent.get('/people')
    const { body } = res
    expect(res.statusCode).toEqual(200)
    //console.info({ body })
  })
})
