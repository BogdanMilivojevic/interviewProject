import request from 'supertest'
import app from '../../app.js'
import User from '../../models/userModel.js'

afterAll(async () => {
  await User.deleteMany({})
})

describe('register', () => {
  test('returns status code 201 if user is registered', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'Jonathan',
      lastName: 'Doegooder',
      username: 'johndoe',
      password: '123456',
      email: 'johndoe@test.com',
      role: 'admin'
    })
    expect(res.statusCode).toEqual(201)
  })
  test('returns status code 400 if email is missing', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'Jonathan',
      lastName: 'Doegooder',
      username: 'johndoe',
      password: '123456',
      role: 'admin'
    })
    expect(res.statusCode).toEqual(400)
  })
  test('returns status code 400 if password is missing', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'Jonathan',
      lastName: 'Doegooder',
      username: 'johndoe',
      email: 'johndoe@test.com',
      role: 'admin'
    })
    expect(res.statusCode).toEqual(400)
  })
  test('returns status code 400 if name is missing', async () => {
    const res = await request(app).post('/users/register').send({
      lastName: 'Doegooder',
      username: 'johndoe',
      password: '123456',
      email: 'johndoe@test.com',
      role: 'admin'
    })
    expect(res.statusCode).toEqual(400)
  })
  test('returns status code 400 if lastName is missing', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'Jonathan',
      username: 'johndoe',
      password: '123456',
      email: 'johndoe@test.com',
      role: 'admin'
    })
    expect(res.statusCode).toEqual(400)
  })
  test('returns status code 400 if username is missing', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'Jonathan',
      lastName: 'Doegooder',
      password: '123456',
      email: 'johndoe@test.com',
      role: 'admin'
    })
    expect(res.statusCode).toEqual(400)
  })
  test('returns status code 400 if email is already in use', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'Jonathan',
      lastName: 'Doegooder',
      username: 'johndoe1',
      password: '123456',
      email: 'johndoe@test.com',
      role: 'admin'
    })
    expect(res.statusCode).toEqual(422)
  })
  test('returns status code 400 if username is already in use', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'Jonathan',
      lastName: 'Doegooder',
      username: 'johndoe',
      password: '123456',
      email: 'johndoe1@test.com',
      role: 'admin'
    })
    expect(res.statusCode).toEqual(422)
  })
})

describe('login', () => {
  test('returns status code 200 if user logs in', async () => {
    const res = await request(app).post('/users/login').send({
      password: '123456',
      email: 'johndoe@test.com'
    })
    expect(res.statusCode).toEqual(200)
  })
  test('returns status code 401 if password is wrong', async () => {
    const res = await request(app).post('/users/login').send({
      password: '12345678',
      email: 'johndoe@test.com'
    })
    expect(res.statusCode).toEqual(401)
  })
  test('returns status code 401 if email is wrong', async () => {
    const res = await request(app).post('/users/login').send({
      password: '123456',
      email: 'johndoe1@test.com'
    })
    expect(res.statusCode).toEqual(401)
  })
  test('returns status code 400 if password is missing', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'johndoe1@test.com'
    })
    expect(res.statusCode).toEqual(400)
  })
  test('returns status code 400 if email is missing', async () => {
    const res = await request(app).post('/users/login').send({
      password: '123456'
    })
    expect(res.statusCode).toEqual(400)
  })
})
