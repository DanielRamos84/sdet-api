import { randTextRange } from '@ngneat/falso';
import controller from '../controller/brand.controller';
import { Response } from 'supertest';

interface BrandData {
  name: string;
  description: string;
}

describe('Brands tests', () => {
  let postBrand: Response;

  const brandData: BrandData = {
    name: randTextRange({ min: 10, max: 20 }) + Math.floor(Math.random() * 1000000),
    description: randTextRange({ min: 1, max: 100 }),
  };

  describe('Get /brands', () => {
    beforeAll(async () => {
      postBrand = await controller.postBrand(brandData);
    });

    afterAll(async () => {
      await controller.deleteBrand(postBrand.body._id);
    });

    test('Should return list of brands', async () => {
      const response = await controller.getBrands();

      expect(Object.keys(response.body[0])).toEqual(['_id', 'name']);
      expect(response.body.length).toBeGreaterThan(1);
      expect(response.statusCode).toEqual(200);
    });

    test('Should fetch new brand', async () => {
      const response = await controller.fetchNewBrand(postBrand.body._id);

      expect(response.status).toEqual(200);
    });

    test('Business Logic - Throw error brand id not found, should return 404 status', async () => {
      const wrongBrandId = '67d460ec986188d4dce57990';
      const brandIdNotFoundError = 'Brand not found.';
      const response = await controller.fetchIdNotFound(wrongBrandId);

      expect(response.body).toEqual({ error: brandIdNotFoundError });
      expect(response.status).toEqual(404);
    });

    test('Business Logic - Throw error brand does not exist, should return 422 status', async () => {
      const invalidBrandId = '12345';
      const invalidBrandIdError = 'Unable to fetch brand';
      const response = await controller.fetchInvalidId(invalidBrandId);

      expect(response.body).toEqual({ error: invalidBrandIdError });
      expect(response.status).toEqual(422);
    });
  });

  describe('Post /brands', () => {
    beforeAll(async () => {
      postBrand = await controller.postBrand(brandData);
    });

    afterAll(async () => {
      await controller.deleteBrand(postBrand.body._id);
    });

    test('Should create a new brand', async () => {
      expect(postBrand.body).toMatchObject(brandData);
      expect(postBrand.statusCode).toEqual(200);
    });

    test('Schema Verification - Name is a mandatory field, should return 422 status', async () => {
      const brandMissingName: BrandData = {
        ...brandData,
        name: '',
      };

      const brandNameMissingNameError = 'Name is required';

      const response = await controller.missingName(brandMissingName);

      expect(response.body).toEqual({ error: brandNameMissingNameError });
      expect(response.statusCode).toEqual(422);
    });

    test('Schema Verification - Name minimum character length, should return 422 status', async () => {
      const brandNameOneCharacter: BrandData = {
        ...brandData,
        name: 'A',
      };

      const brandNameOneCharacterError = 'Brand name is too short';

      const response = await controller.nameToShort(brandNameOneCharacter);

      expect(response.body).toEqual({ error: brandNameOneCharacterError });
      expect(response.statusCode).toEqual(422);
    });

    test('Should create brand with empty description', async () => {
      const brandMissingDescription: BrandData = {
        name: randTextRange({ min: 10, max: 20 }) + Math.floor(Math.random() * 1000000),
        description: '',
      };

      const response = await controller.missingDescription(brandMissingDescription);

      expect(response.body).toMatchObject(brandMissingDescription);
      expect(response.body).toHaveProperty('description', '');
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('Delete /brands', () => {
    beforeAll(async () => {
      postBrand = await controller.postBrand(brandData);
    });

    test('Should delete new brand', async () => {
      const response = await controller.deleteBrand(postBrand.body._id);

      expect(response.status).toEqual(200);
    });
  });
});
