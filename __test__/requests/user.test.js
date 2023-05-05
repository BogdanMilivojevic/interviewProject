import request from 'supertest'
import app from '../../app.js'
import User from '../../models/userModel.js'
import jwt from 'jsonwebtoken'

afterAll(async () => {
  await User.deleteMany({})
})

describe('create new user', () => {
  let adminToken = ''
  let moderatorToken = ''
  beforeAll(async () => {
    const admin = await User.create({
      name: 'Admin',
      lastName: 'Admin',
      username: 'administrator',
      password: '123456',
      email: 'administrator@test.com',
      role: 'admin'
    })
    const moderator = await User.create({
      name: 'Moderator',
      lastName: 'Moderator',
      username: 'moderator',
      password: '123456',
      email: 'moderator@test.com',
      role: 'moderator'
    })
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorToken = jwt.sign({ id: moderator.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
  })
  test('returns 201 is user is created', async () => {
    const res = await request(app).post('/users').send({
      name: 'Jon',
      lastName: 'Doe',
      username: 'johndoe',
      password: '123456',
      email: 'johndoe@test.com'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(201)
  })
  test('returns 403 if user doesnt have permission', async () => {
    const res = await request(app).post('/users').send({
      name: 'Jon',
      lastName: 'Doe',
      username: 'johndoe2',
      password: '123456',
      email: 'johndoe2@test.com'
    }).set('Authorization', `Bearer ${moderatorToken}`)
    expect(res.statusCode).toEqual(403)
  })
  test('returns 403 if jwt is missing', async () => {
    const res = await request(app).post('/users').send({
      name: 'Jon',
      lastName: 'Doe',
      username: 'johndoe',
      password: '123456',
      email: 'johndoe@test.com'
    })
    expect(res.statusCode).toEqual(403)
  })
  test('returns 400 is name is missing', async () => {
    const res = await request(app).post('/users').send({
      lastName: 'Doe',
      username: 'johndoe',
      password: '123456',
      email: 'johndoe@test.com'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns 400 if lastName is missing', async () => {
    const res = await request(app).post('/users').send({
      name: 'Jon',
      username: 'johndoe',
      password: '123456',
      email: 'johndoe@test.com'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns 400 is username is missing', async () => {
    const res = await request(app).post('/users').send({
      name: 'Jon',
      lastName: 'Doe',
      password: '123456',
      email: 'johndoe@test.com'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns 400 is password is missing', async () => {
    const res = await request(app).post('/users').send({
      name: 'Jon',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@test.com'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns 201 is email is missing', async () => {
    const res = await request(app).post('/users').send({
      name: 'Jon',
      lastName: 'Doe',
      username: 'johndoe',
      password: '123456'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns 400 if username is below 4 characters', async () => {
    const res = await request(app).post('/users').send({
      name: 'Jon',
      lastName: 'Doe',
      username: 'j',
      password: '123456',
      email: 'johndoe@test.com'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns 400 if username is below 4 characters', async () => {
    const res = await request(app).post('/users').send({
      name: 'Jon',
      lastName: 'Doe',
      username: 'j',
      password: '123456',
      email: 'johndoe22@test.com'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns 400 if password is below 4 characters', async () => {
    const res = await request(app).post('/users').send({
      name: 'Jon',
      lastName: 'Doe',
      username: 'johndoe22',
      password: '12',
      email: 'johndoe22@test.com'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
})

describe('get all users', () => {
  let adminToken = ''
  let moderatorToken = ''
  beforeAll(async () => {
    const admin = await User.create({
      name: 'Admin',
      lastName: 'Admin',
      username: 'administrator1',
      password: '123456',
      email: 'administrator1@test.com',
      role: 'admin'
    })
    const moderator = await User.create({
      name: 'Moderator',
      lastName: 'Moderator',
      username: 'moderator1',
      password: '123456',
      email: 'moderator1@test.com',
      role: 'moderator'
    })
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorToken = jwt.sign({ id: moderator.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
  })
  test('returns status 200 if users are retrieved', async () => {
    const res = await request(app).get('/users').set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(200)
  })
  test('returns status 403 if user doesnt have permission', async () => {
    const res = await request(app).get('/users').set('Authorization', `Bearer ${moderatorToken}`)

    expect(res.statusCode).toEqual(403)
  })
})

describe('update user', () => {
  let adminToken = ''
  let moderatorToken = ''
  let moderatorId = ''
  beforeAll(async () => {
    const admin = await User.create({
      name: 'Admin',
      lastName: 'Admin',
      username: 'administrator2',
      password: '123456',
      email: 'administrator2@test.com',
      role: 'admin'
    })
    const moderator = await User.create({
      name: 'Moderator',
      lastName: 'Moderator',
      username: 'moderator2',
      password: '123456',
      email: 'moderator2@test.com',
      role: 'moderator'
    })
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorToken = jwt.sign({ id: moderator.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorId = moderator.id
  })
  test('returns status code 200 if user is updated', async () => {
    const res = await request(app).patch(`/users/${moderatorId}`).send({
      name: 'Fun Moderator',
      lastName: 'Moderator',
      username: 'moderator3',
      email: 'moderator3@test.com',
      role: 'moderator'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(200)
  })
  test('returns status code 403 if user doesnt have permission', async () => {
    const res = await request(app).patch(`/users/${moderatorId}`).send({
      name: 'Fun Moderator',
      lastName: 'Moderator',
      username: 'moderator4',
      email: 'moderator4@test.com',
      role: 'moderator'
    }).set('Authorization', `Bearer ${moderatorToken}`)
    expect(res.statusCode).toEqual(403)
  })
  test('returns status code 400 if user wants to update to an existing email', async () => {
    const res = await request(app).patch(`/users/${moderatorId}`).send({
      name: 'Fun Moderator',
      lastName: 'Moderator',
      username: 'moderator4',
      email: 'moderator@test.com',
      role: 'moderator'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns status code 400 if user wants to update to an existing username', async () => {
    const res = await request(app).patch(`/users/${moderatorId}`).send({
      name: 'Fun Moderator',
      lastName: 'Moderator',
      username: 'moderator',
      email: 'moderator4@test.com',
      role: 'moderator'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
})

describe('delete user', () => {
  let adminToken = ''
  let moderatorToken = ''
  let moderatorId = ''
  beforeAll(async () => {
    const admin = await User.create({
      name: 'Admin',
      lastName: 'Admin',
      username: 'administrator4',
      password: '123456',
      email: 'administrator4@test.com',
      role: 'admin'
    })
    const moderator = await User.create({
      name: 'Moderator',
      lastName: 'Moderator',
      username: 'moderator4',
      password: '123456',
      email: 'moderator4@test.com',
      role: 'moderator'
    })
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorToken = jwt.sign({ id: moderator.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorId = moderator.id
  })

  test('returns code 204 is user is deleted', async () => {
    const res = await request(app).delete(`/users/${moderatorId}`).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(204)
  })
  test('returns code 403 is user is deleted', async () => {
    const res = await request(app).delete(`/users/${moderatorId}`).set('Authorization', `Bearer ${moderatorToken}`)
    expect(res.statusCode).toEqual(403)
  })
})

describe('update password', () => {
  let adminToken = ''
  let moderatorToken = ''
  let moderatorId = ''
  beforeAll(async () => {
    const admin = await User.create({
      name: 'Admin',
      lastName: 'Admin',
      username: 'administrator6',
      password: '123456',
      email: 'administrator6@test.com',
      role: 'admin'
    })
    const moderator = await User.create({
      name: 'Moderator',
      lastName: 'Moderator',
      username: 'moderator6',
      password: '123456',
      email: 'moderator6@test.com',
      role: 'moderator'
    })
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorToken = jwt.sign({ id: moderator.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorId = moderator.id
  })
  test('returns status code 403 is user doesnt have permission', async () => {
    const res = await request(app).patch(`/users/updatepassword/${moderatorId}`).send({
      password: '12345678'
    }).set('Authorization', `Bearer ${moderatorToken}`)

    expect(res.statusCode).toEqual(403)
  })
  test('returns status code 200 is password has been updated', async () => {
    const res = await request(app).patch(`/users/updatepassword/${moderatorId}`).send({
      password: '12345678'
    }).set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(200)
  })
})
