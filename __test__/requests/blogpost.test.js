import request from 'supertest'
import app from '../../app.js'
import User from '../../models/userModel.js'
import BlogPost from '../../models/blogPostModel.js'
import jwt from 'jsonwebtoken'

afterAll(async () => {
  await BlogPost.deleteMany({})
  await User.deleteMany({})
})

describe('create new blogpost', () => {
  let adminToken = ''
  let moderatorToken = ''
  let guestToken = ''
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
    const guest = await User.create({
      name: 'Guest',
      lastName: 'Guest',
      username: 'guest',
      password: '123456',
      email: 'guest@test.com'
    })
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorToken = jwt.sign({ id: moderator.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    guestToken = jwt.sign({ id: guest.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
  })
  test('returns status 201 is blogpost is created by admin', async () => {
    const res = await request(app).post('/blogposts').send({
      title: 'Title',
      author: 'Author',
      body: 'Hello there guys, this is my new blogpost, '
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(201)
  })
  test('returns status 201 is blogpost is created by moderator', async () => {
    const res = await request(app).post('/blogposts').send({
      title: 'Title',
      author: 'Author',
      body: 'Hello there guys, this is my new blogpost, '
    }).set('Authorization', `Bearer ${moderatorToken}`)
    expect(res.statusCode).toEqual(201)
  })
  test('returns status 403 if guest attemps to create blogpost', async () => {
    const res = await request(app).post('/blogposts').send({
      title: 'Title',
      author: 'Author',
      body: 'Hello there guys, this is my new blogpost, '
    }).set('Authorization', `Bearer ${guestToken}`)
    expect(res.statusCode).toEqual(403)
  })
  test('returns status 400 if title is missing', async () => {
    const res = await request(app).post('/blogposts').send({
      author: 'Author',
      body: 'Hello there guys, this is my new blogpost, '
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns status 400 if author is missing', async () => {
    const res = await request(app).post('/blogposts').send({
      title: 'Title',
      body: 'Hello there guys, this is my new blogpost, '
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns status 400 if body is missing ', async () => {
    const res = await request(app).post('/blogposts').send({
      title: 'Title',
      author: 'Author'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns status 400 if title is below 5 characters', async () => {
    const res = await request(app).post('/blogposts').send({
      title: 'e',
      author: 'Author',
      body: 'Hello there guys, this is my new blogpost, '
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns status 400 if author is below 5 characters', async () => {
    const res = await request(app).post('/blogposts').send({
      title: 'Title',
      author: 'e',
      body: 'Hello there guys, this is my new blogpost, '
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
  test('returns status 400 if body is below 20 characters', async () => {
    const res = await request(app).post('/blogposts').send({
      title: 'Title',
      author: 'Author',
      body: 'Hello there'
    }).set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(400)
  })
})

describe('get all blogposts', () => {
  let adminToken = ''
  let moderatorToken = ''
  let guestToken = ''
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
    const guest = await User.create({
      name: 'Guest',
      lastName: 'Guest',
      username: 'guest1',
      password: '123456',
      email: 'guest1@test.com'
    })
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorToken = jwt.sign({ id: moderator.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    guestToken = jwt.sign({ id: guest.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
  })
  test('returns status 200 if blogpost are read by admin', async () => {
    const res = await request(app).get('/blogposts').set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(200)
  })
  test('returns status 200 if blogposts are read by moderator', async () => {
    const res = await request(app).get('/blogposts').set('Authorization', `Bearer ${moderatorToken}`)

    expect(res.statusCode).toEqual(200)
  })
  test('returns status 200 if blogposts are read by guest', async () => {
    const res = await request(app).get('/blogposts').set('Authorization', `Bearer ${guestToken}`)

    expect(res.statusCode).toEqual(200)
  })
})

describe('blogpost update', () => {
  let adminToken = ''
  let moderatorToken = ''
  let guestToken = ''
  let blogpostId = ''
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
    const guest = await User.create({
      name: 'Guest',
      lastName: 'Guest',
      username: 'guest2',
      password: '123456',
      email: 'guest2@test.com'
    })
    const blogpost = await BlogPost.create({
      title: 'Title',
      author: 'Author',
      body: 'Hello there everyone, this is my blog, please read it'
    })
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorToken = jwt.sign({ id: moderator.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    guestToken = jwt.sign({ id: guest.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    blogpostId = blogpost.id
  })
  test('returns status code 200 if blogpost is updated by admin', async () => {
    const res = await request(app).patch(`/blogposts/${blogpostId}`).send({
      title: 'Title',
      author: 'Author',
      body: 'Hello there everyone, this is my blog, please read it, and give it a like'
    }).set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(200)
  })
  test('returns status code 200 if blogpost is updated by moderator', async () => {
    const res = await request(app).patch(`/blogposts/${blogpostId}`).send({
      title: 'Title',
      author: 'Author',
      body: 'Hello there everyone, this is my blog, please read it, and give it a like and share it with friends'
    }).set('Authorization', `Bearer ${moderatorToken}`)

    expect(res.statusCode).toEqual(200)
  })
  test('returns status code 403 if guest attempts to update blog', async () => {
    const res = await request(app).patch(`/blogposts/${blogpostId}`).send({
      title: 'Title',
      author: 'Author',
      body: 'Hello there everyone, this is my blog, please read it, and give it a like and share it with friends'
    }).set('Authorization', `Bearer ${guestToken}`)

    expect(res.statusCode).toEqual(403)
  })
  test('returns status code 400 if title is less than 5 characters', async () => {
    const res = await request(app).patch(`/blogposts/${blogpostId}`).send({
      title: 'T',
      author: 'Author',
      body: 'Hello there everyone, this is my blog, please read it, and give it a like and share it with friends'
    }).set('Authorization', `Bearer ${guestToken}`)

    expect(res.statusCode).toEqual(400)
  })
  test('returns status code 400 if author is less than 5 characters', async () => {
    const res = await request(app).patch(`/blogposts/${blogpostId}`).send({
      title: 'Title',
      author: 'a',
      body: 'Hello there everyone, this is my blog, please read it, and give it a like and share it with friends'
    }).set('Authorization', `Bearer ${guestToken}`)

    expect(res.statusCode).toEqual(400)
  })
  test('returns status code 400 if body is less than 20 characters', async () => {
    const res = await request(app).patch(`/blogposts/${blogpostId}`).send({
      title: 'Title',
      author: 'Author',
      body: 'Hello there'
    }).set('Authorization', `Bearer ${guestToken}`)

    expect(res.statusCode).toEqual(400)
  })
})

describe('delete blogpost', () => {
  let adminToken = ''
  let moderatorToken = ''
  let guestToken = ''
  let blogpostId = ''
  let blogpostTwoId = ''
  beforeAll(async () => {
    const admin = await User.create({
      name: 'Admin',
      lastName: 'Admin',
      username: 'administrator3',
      password: '123456',
      email: 'administrator3@test.com',
      role: 'admin'
    })
    const moderator = await User.create({
      name: 'Moderator',
      lastName: 'Moderator',
      username: 'moderator3',
      password: '123456',
      email: 'moderator3@test.com',
      role: 'moderator'
    })
    const guest = await User.create({
      name: 'Guest',
      lastName: 'Guest',
      username: 'guest3',
      password: '123456',
      email: 'guest3@test.com'
    })
    const blogpost = await BlogPost.create({
      title: 'Title',
      author: 'Author',
      body: 'Hello there everyone, this is my blog, please read it'
    })
    const blogpost1 = await BlogPost.create({
      title: 'Title',
      author: 'Author',
      body: 'Hello there everyone, this is my blog, please read it'
    })
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorToken = jwt.sign({ id: moderator.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    guestToken = jwt.sign({ id: guest.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    blogpostId = blogpost.id
    blogpostTwoId = blogpost1.id
  })
  test('returns status code 403 if guest attempts to delete blog', async () => {
    const res = await request(app).delete(`/blogposts/${blogpostId}`).set('Authorization', `Bearer ${guestToken}`)

    expect(res.statusCode).toEqual(403)
  })
  test('returns status code 204 if blogpost is deleted by admin', async () => {
    const res = await request(app).delete(`/blogposts/${blogpostId}`).set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(204)
  })
  test('returns status code 204 if blogpost is deleted by moderator', async () => {
    const res = await request(app).delete(`/blogposts/${blogpostTwoId}`).set('Authorization', `Bearer ${moderatorToken}`)

    expect(res.statusCode).toEqual(204)
  })
})

describe('blogpost like', () => {
  let adminToken = ''
  let moderatorToken = ''
  let guestToken = ''
  let blogpostId = ''
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
    const guest = await User.create({
      name: 'Guest',
      lastName: 'Guest',
      username: 'guest4',
      password: '123456',
      email: 'guest4@test.com'
    })
    const blogpost = await BlogPost.create({
      title: 'Title',
      author: 'Author',
      body: 'Hello there everyone, this is my blog, please read it'
    })
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorToken = jwt.sign({ id: moderator.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    guestToken = jwt.sign({ id: guest.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    blogpostId = blogpost.id
  })
  test('returns code 200 if blogpost is liked', async () => {
    const res = await request(app).patch(`/blogposts/like/${blogpostId}`).set('Authorization', `Bearer ${guestToken}`)

    expect(res.statusCode).toEqual(200)
  })
  test('returns code 403 if admin attempts to like blogpost', async () => {
    const res = await request(app).patch(`/blogposts/like/${blogpostId}`).set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(403)
  })
  test('returns code 403 if moderator attempts to like blogpost', async () => {
    const res = await request(app).patch(`/blogposts/like/${blogpostId}`).set('Authorization', `Bearer ${moderatorToken}`)

    expect(res.statusCode).toEqual(403)
  })
})

describe('blogpost search by author', () => {
  let adminToken = ''
  let moderatorToken = ''
  let guestToken = ''
  beforeAll(async () => {
    const admin = await User.create({
      name: 'Admin',
      lastName: 'Admin',
      username: 'administrator5',
      password: '123456',
      email: 'administrator5@test.com',
      role: 'admin'
    })
    const moderator = await User.create({
      name: 'Moderator',
      lastName: 'Moderator',
      username: 'moderator5',
      password: '123456',
      email: 'moderator5@test.com',
      role: 'moderator'
    })
    const guest = await User.create({
      name: 'Guest',
      lastName: 'Guest',
      username: 'guest5',
      password: '123456',
      email: 'guest5@test.com'
    })
    await BlogPost.create({
      title: 'Title',
      author: 'Author',
      body: 'Hello there everyone, this is my blog, please read it'
    })
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorToken = jwt.sign({ id: moderator.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    guestToken = jwt.sign({ id: guest.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
  })
  test('returns code 200 if blogpost is read by admin', async () => {
    const res = await request(app).get('/blogposts/author/Author').set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(200)
  })
  test('returns code 200 if blogpost is read by moderator', async () => {
    const res = await request(app).get('/blogposts/author/Author').set('Authorization', `Bearer ${moderatorToken}`)

    expect(res.statusCode).toEqual(200)
  })
  test('returns code 200 if blogpost is read by guest', async () => {
    const res = await request(app).get('/blogposts/author/Author').set('Authorization', `Bearer ${guestToken}`)

    expect(res.statusCode).toEqual(200)
  })
  test('returns code 404 if blogpost is not found', async () => {
    const res = await request(app).get('/blogposts/author/Authorrrr').set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(404)
  })
})

describe('blogpost search by title', () => {
  let adminToken = ''
  let moderatorToken = ''
  let guestToken = ''
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
    const guest = await User.create({
      name: 'Guest',
      lastName: 'Guest',
      username: 'guest6',
      password: '123456',
      email: 'guest6@test.com'
    })
    await BlogPost.create({
      title: 'Spring',
      author: 'Author',
      body: 'Hello there everyone, this is my blog, please read it'
    })
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    moderatorToken = jwt.sign({ id: moderator.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    guestToken = jwt.sign({ id: guest.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
  })
  test('returns code 200 if blogpost is read by admin', async () => {
    const res = await request(app).get('/blogposts/title/Spring').set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(200)
  })
  test('returns code 200 if blogpost is read by moderator', async () => {
    const res = await request(app).get('/blogposts/title/Spring').set('Authorization', `Bearer ${moderatorToken}`)

    expect(res.statusCode).toEqual(200)
  })
  test('returns code 200 if blogpost is read by guest', async () => {
    const res = await request(app).get('/blogposts/title/Spring').set('Authorization', `Bearer ${guestToken}`)

    expect(res.statusCode).toEqual(200)
  })
  test('returns code 404 if blogpost is not found', async () => {
    const res = await request(app).get('/blogposts/title/SpringBreak').set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(404)
  })
})
