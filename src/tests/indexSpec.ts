import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import path from 'path';
import ImageProcessing from '../utils/imageProcessing';

const request = supertest(app);
describe('Test URL Response Status Code', () => {
  it("It should return Error 500 if the user didn't include filename in the URL query parameters", async () => {
    const response = await request.get('/api/image');
    expect(response.status).toBe(500);
  });

  it("It should return Error 500 if the user didn't include width and height only in the URL query parameters", async () => {
    const response = await request.get('/api/image?width=100&height=100');
    expect(response.status).toBe(500);
  });

  it('It should return SUCCESS 200 if the user include filename only in the URL query parameters', async () => {
    const response = await request.get('/api/image?filename=fjord');
    expect(response.status).toBe(200);
  });

  it('It should return SUCCESS 200 if the user include filename & width only in the URL query parameters', async () => {
    const response = await request.get('/api/image?filename=fjord&width=100');
    expect(response.status).toBe(200);
  });

  it('It should return SUCCESS 200 if the user include filename & height only in the URL query parameters', async () => {
    const response = await request.get('/api/image?filename=fjord&height=100');
    expect(response.status).toBe(200);
  });

  it('It should return SUCCESS 200 if the user include filename & width & height in the URL query parameters', async () => {
    const response = await request.get(
      '/api/image?filename=fjord&width=100&height=100'
    );
    expect(response.status).toBe(200);
  });
});

describe('Test Error Message Validations', () => {
  it('Gets Error Message if the user enters width value equals to or less than zero', async () => {
    const response = await request.get(
      '/api/image?filename=fjord&width=0&height=100'
    );
    expect(response.text).toBe('Width should be greather than 0');
  });

  it('Gets Error Message if the user enters height value equals to or less than zero', async () => {
    const response = await request.get(
      '/api/image?filename=fjord&width=100&height=0'
    );
    expect(response.text).toBe('Height should be greater than 0');
  });

  it('Gets Error Message if the user enters any thing rather than a number for the width value', async () => {
    const response = await request.get(
      '/api/image?filename=fjord&width=xyz&height=100'
    );
    expect(response.text).toBe('Width should be type number only');
  });

  it('Gets Error Message if the user enters any thing rather than a number for the height value', async () => {
    const response = await request.get(
      '/api/image?filename=fjord&width=100&height=xyz'
    );
    expect(response.text).toBe('Height should be type number only');
  });

  it('Gets Error Message if the user enters a not valid filename', async () => {
    const response = await request.get(
      '/api/image?filename=xyz&width=100&height=100'
    );
    expect(response.text).toBe('Check the filename you entered');
  });

  it("Gets Error Message if the user didn't enter a filename", async () => {
    const response = await request.get(
      '/api/image?filename=&width=100&height=100'
    );
    expect(response.text).toBe(
      'You should enter at least a filename in the query string'
    );
  });
});

describe('Test Image Processing Used By Sharp', ()=>{
    const createdImagesFolder: string = path.join(
        __dirname,
        '../',
        '../',
        'images/',
        'createdImages/'
      );
    it('Gets The new name of the created image in createdImages directory', async()=>{
        const response = await request.get(
            '/api/image?filename=fjord&width=105&height=105'
        );
        expect(fs.existsSync(createdImagesFolder + '/fjord_105_105.jpg')).toBe(true);
    });
});