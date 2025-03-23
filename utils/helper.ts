import adminsController from '../controller/admins.controller';
import categoriesController from '../controller/categories.controller';

export const login = async (email: string, password: string) => {
  const body = {
    email: email,
    password: password,
  };

  const response = await adminsController.adminLogin(body);

  return response.body.token;
};

export const createCategory = async (categoryName: object, token: string) => {
  const response = categoriesController.postCategory(categoryName, token);
  return response;
};

export const deleteCategory = async (categoryId: string, token: string) => {
  const response = categoriesController.deleteCategory(categoryId, token);
  return response;
};
