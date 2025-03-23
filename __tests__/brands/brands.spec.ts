import { randTextRange } from '@ngneat/falso';
import brandController from '../../controller/brand.controller';
import { Response } from 'supertest';

interface BrandData {
  name: string;
  description: string;
}

const generateBrandData = (): BrandData => ({
  name:
    randTextRange({ min: 10, max: 20 }) + Math.floor(Math.random() * 1000000),
  description: randTextRange({ min: 1, max: 100 }),
});

const ERROR_MESSAGES = {
  BRAND_NOT_FOUND: 'Brand not found.',
  UNABLE_TO_FETCH_BRAND: 'Unable to fetch brand',
  NAME_REQUIRED: 'Name is required',
  NAME_TOO_SHORT: 'Brand name is too short',
};

describe('Brands tests', () => {
  let postBrand: Response;
  const brandData = generateBrandData();

  beforeAll(async () => {
    postBrand = await brandController.postBrand(brandData);
  });

  afterAll(async () => {
    await brandController.deleteBrand(postBrand.body._id);
  });

  describe('Get /brands', () => {
    test('Should return list of brands', async () => {
      const response = await brandController.getBrands();
      expect(Object.keys(response.body[0])).toEqual(['_id', 'name']);
      expect(response.body.length).toBeGreaterThan(1);
      expect(response.statusCode).toEqual(200);
    });

    test('Should fetch new brand', async () => {
      const response = await brandController.fetchNewBrand(postBrand.body._id);
      expect(response.status).toEqual(200);
    });

    test('Business Logic - Throw error brand id not found, should return 404 status', async () => {
      const wrongBrandId = '67d460ec986188d4dce57990';
      const response = await brandController.fetchIdNotFound(wrongBrandId);
      expect(response.body).toEqual({ error: ERROR_MESSAGES.BRAND_NOT_FOUND });
      expect(response.status).toEqual(404);
    });

    test('Business Logic - Throw error brand does not exist, should return 422 status', async () => {
      const invalidBrandId = '12345';
      const response = await brandController.fetchInvalidId(invalidBrandId);
      expect(response.body).toEqual({
        error: ERROR_MESSAGES.UNABLE_TO_FETCH_BRAND,
      });
      expect(response.status).toEqual(422);
    });
  });

  describe('Post /brands', () => {
    test('Should create a new brand', async () => {
      expect(postBrand.body).toMatchObject(brandData);
      expect(postBrand.statusCode).toEqual(200);
    });

    test('Schema Verification - Name is a mandatory field, should return 422 status', async () => {
      const brandMissingName: BrandData = { ...brandData, name: '' };
      const response = await brandController.missingName(brandMissingName);
      expect(response.body).toEqual({ error: ERROR_MESSAGES.NAME_REQUIRED });
      expect(response.statusCode).toEqual(422);
    });

    test('Schema Verification - Name minimum character length, should return 422 status', async () => {
      const brandNameOneCharacter: BrandData = { ...brandData, name: 'A' };
      const response = await brandController.nameToShort(brandNameOneCharacter);
      expect(response.body).toEqual({ error: ERROR_MESSAGES.NAME_TOO_SHORT });
      expect(response.statusCode).toEqual(422);
    });

    test('Should create brand with empty description', async () => {
      const brandMissingDescription: BrandData = {
        ...generateBrandData(),
        description: '',
      };
      const response = await brandController.missingDescription(
        brandMissingDescription
      );
      expect(response.body).toMatchObject(brandMissingDescription);
      expect(response.body).toHaveProperty('description', '');
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('Delete /brands', () => {
    test('Should delete new brand', async () => {
      const response = await brandController.deleteBrand(postBrand.body._id);
      expect(response.status).toEqual(200);
    });
  });
});
