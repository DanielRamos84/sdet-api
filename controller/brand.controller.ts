import supertest from "supertest";
import { Response } from "superagent";
import config from "../config/base.config";
const request = supertest(config.baseUrl);

export class BrandController {
  postBrand(brandData: {
    name: string;
    description: string;
  }): Promise<Response> {
    return request
      .post('/brands')
      .send(brandData)
      .set('Accept', 'application/json');
  }

  deleteBrand(brandId: string): Promise<Response> {
    return request.delete(`/brands/${brandId}`);
  }

  missingName(brandMissingName: {
    name: string;
    description: string;
  }): Promise<Response> {
    return request
      .post('/brands')
      .send(brandMissingName)
      .set('Accept', 'application/json');
  }

  nameToShort(brandNameOneCharacter: {
    name: string;
    description: string;
  }): Promise<Response> {
    return request
      .post('/brands')
      .send(brandNameOneCharacter)
      .set('Accept', 'application/json');
  }

  missingDescription(brandMissingDescription: {
    name: string;
    description: string;
  }): Promise<Response> {
    return request
      .post('/brands')
      .send(brandMissingDescription)
      .set('Accept', 'application/json');
  }

  getBrands(): Promise<Response> {
    return request.get('/brands');
  }

  fetchNewBrand(brandId: string): Promise<Response> {
    return request.get(`/brands/${brandId}`);
  }

  fetchIdNotFound(wrongBrandId: string): Promise<Response> {
    return request.get(`/brands/${wrongBrandId}`);
  }

  fetchInvalidId(invalidBrandId: string): Promise<Response> {
    return request.get(`/brands/${invalidBrandId}`);
  }
}

export default new BrandController();
