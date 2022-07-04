import CategoryModel from "../models/category.model";

export const createCategory = (name: string) => {
  return CategoryModel.create({
    name,
  });
};

export const getCategories = () => {
  return CategoryModel.find({}, { _id: 1, name: 1 });
};

export const updateCategory = (categoryId: string, newName: string) => {
  return CategoryModel.findByIdAndUpdate(categoryId, { name: newName });
};

export const deleteCategory = (categoryId: string) => {
  return CategoryModel.findByIdAndDelete({ _id: categoryId });
};
