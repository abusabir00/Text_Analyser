const request = require('supertest');
const app = require('../app');
const Text = require('../models/text');
const TextService = require('../services/TextService');


// Mock the Text model to avoid real database interaction
jest.mock('../models/text');
jest.mock('../services/TextService');

describe('POST /api/text', () => {
  it('should create a new text entry and return 201 status', async () => {
    const mockText = { id: 1, text: '"The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun."' };
    Text.create.mockResolvedValue(mockText);

    const res = await request(app)
      .post('/api/text')
      .send({ text: 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(mockText);
  });

  it('should return 400 if text is missing', async () => {
    const res = await request(app).post('/api/text').send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('"text" is a required field');
  });

  it('should return 400 if text is too short', async () => {
    const res = await request(app).post('/api/text').send({ text: 'Hi' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('"text" should have a minimum length of 3');
  });

  it('should return 500 if there is a server error', async () => {
    // Simulate a database error
    Text.create.mockRejectedValue(new Error('Database error'));

    const res = await request(app).post('/api/text').send({ text: 'Valid text' });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });
});

// Test for getWordCount function
describe('GET /api/text/:id/words', () => {
  it('should return the word count for valid text ID', async () => {
    const mockText = { id: 1, text: 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.' };
    Text.findByPk.mockResolvedValue(mockText);

    TextService.countWords.mockReturnValue(5);

    const res = await request(app).get('/api/text/1/words');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ wordCount: 5 });
  });

  it('should return 400 for invalid text ID', async () => {
    const res = await request(app).get('/api/text/invalid/words');

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid text ID format');
  });

  it('should return 404 if text is not found', async () => {
    Text.findByPk.mockResolvedValue(null);

    const res = await request(app).get('/api/text/999/words');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Text not found');
  });

  it('should return 500 if there is a server error', async () => {
    Text.findByPk.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/api/text/1/words');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });
});

// Test for getCharacterCount function
describe('GET /api/text/:id/characters', () => {
  it('should return the character count for valid text ID', async () => {
    const mockText = { id: 1, text: 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.' };
    Text.findByPk.mockResolvedValue(mockText);

    TextService.countCharacters.mockReturnValue(70);

    const res = await request(app).get('/api/text/1/characters');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ characterCount: 70 });
  });

  it('should return 400 for invalid text ID', async () => {
    const res = await request(app).get('/api/text/invalid/characters');

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid text ID format');
  });

  it('should return 404 if text is not found', async () => {
    Text.findByPk.mockResolvedValue(null);

    const res = await request(app).get('/api/text/999/characters');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Text not found');
  });

  it('should return 500 if there is a server error', async () => {
    Text.findByPk.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/api/text/1/characters');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });
});

// Test for getSentenceCount function
describe('GET /api/text/:id/sentences', () => {
  it('should return the sentence count for valid text ID', async () => {
    const mockText = { id: 1, text: 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.' };
    Text.findByPk.mockResolvedValue(mockText);

    TextService.countSentences.mockReturnValue(2);

    const res = await request(app).get('/api/text/1/sentences');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ sentenceCount: 2 });
  });

  it('should return 400 for invalid text ID', async () => {
    const res = await request(app).get('/api/text/invalid/sentences');

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid text ID format');
  });

  it('should return 404 if text is not found', async () => {
    Text.findByPk.mockResolvedValue(null);

    const res = await request(app).get('/api/text/999/sentences');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Text not found');
  });

  it('should return 500 if there is a server error', async () => {
    Text.findByPk.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/api/text/1/sentences');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });
});

// Test for getParagraphCount function
describe('GET /api/text/:id/paragraphs', () => {
  it('should return the paragraph count for valid text ID', async () => {
    const mockText = { id: 1, text: 'The quick brown fox jumps over the lazy dog.\n\nThe lazy dog slept in the sun.' };
    Text.findByPk.mockResolvedValue(mockText);

    TextService.countParagraphs.mockReturnValue(2);

    const res = await request(app).get('/api/text/1/paragraphs');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ paragraphCount: 2 });
  });

  it('should return 400 for invalid text ID', async () => {
    const res = await request(app).get('/api/text/invalid/paragraphs');

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid text ID format');
  });

  it('should return 404 if text is not found', async () => {
    Text.findByPk.mockResolvedValue(null);

    const res = await request(app).get('/api/text/999/paragraphs');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Text not found');
  });

  it('should return 500 if there is a server error', async () => {
    Text.findByPk.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/api/text/1/paragraphs');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });
});

// Test for getLongestWords function
describe('GET /api/text/:id/longest-words', () => {
  it('should return the longest words for valid text ID', async () => {
    const mockText = { id: 1, text: 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.' };
    Text.findByPk.mockResolvedValue(mockText);

    TextService.longestWordInParagraph.mockReturnValue(['paragraph', 'paragraph']);

    const res = await request(app).get('/api/text/1/longest-words');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ longestWords: ['paragraph', 'paragraph'] });
  });

  it('should return 400 for invalid text ID', async () => {
    const res = await request(app).get('/api/text/invalid/longest-words');

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid text ID format');
  });

  it('should return 404 if text is not found', async () => {
    Text.findByPk.mockResolvedValue(null);

    const res = await request(app).get('/api/text/999/longest-words');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Text not found');
  });

  it('should return 500 if there is a server error', async () => {
    Text.findByPk.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/api/text/1/longest-words');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });
});




