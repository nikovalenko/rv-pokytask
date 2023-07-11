import path from 'path';
import request from 'supertest';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import app from './app';

describe('Routes', () => {
  let authToken: string;
  const filePath = path.join(__dirname, 'testdata', 'pokemons.csv');
  const name = faker.person.firstName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  afterAll(() => {
    mongoose.connection.close();
  });

  describe('GET /', () => {
    it('should return a welcome message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Welcome to pokeAPI REST by Mykyta Kovalenko');
    });
  });

  describe('GET /api/pokemons/:page', () => {
    it('should return a list of pokemons', async () => {
      const response = await request(app).get('/api/pokemons/1');
      expect(response.status).toBe(200);
    });

    it('should handle invalid page parameter', async () => {
      const response = await request(app).get('/api/pokemons/wrongpage');
      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/pokemon/:param([0-9]+|[a-zA-Z]+)', () => {
    it('should return a specific pokemon', async () => {
      const response = await request(app).get('/api/pokemon/charizard');
      expect(response.status).toBe(200);
    });

    it('should handle invalid pokemon parameter', async () => {
      const response = await request(app).get('/api/pokemon/-123');
      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/type/:type', () => {
    it('should return pokemons of a specific type', async () => {
      const response = await request(app).get('/api/type/fire');
      expect(response.status).toBe(200);
    });

    it('should handle invalid type parameter', async () => {
      const response = await request(app).get('/api/type/wrongtype');
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/register', () => {
    it('should register a new user', async () => {
      const response = await request(app).post('/api/register').send({ name, email, password });
      expect(response.status).toBe(200);
    });

    it('should handle duplicate email', async () => {
      const response = await request(app).post('/api/register').send({ name, email, password });
      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/login', () => {
    it('should log in a user and return a token', async () => {
      const response = await request(app).post('/api/login').send({ email, password });
      expect(response.status).toBe(200);
      authToken = response.body.token;
    });

    it('should handle invalid credentials', async () => {
      const invalidPass = faker.internet.password();
      const response = await request(app).post('/api/login').send({ email, password: invalidPass });
      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/pokemons/upload', () => {
    it('should upload and process a file of pokemons', async () => {
      const response = await request(app)
        .post('/api/pokemons/upload')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('file', filePath);
      expect(response.status).toBe(200);
    });

    it('should handle missing file', async () => {
      const response = await request(app)
        .post('/api/pokemons/upload')
        .set('Authorization', `Bearer ${authToken}`);
      expect(response.status).toBe(400);
    });
  });
});
