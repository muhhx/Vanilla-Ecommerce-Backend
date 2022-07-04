import mongoose from "mongoose";
import ICategory from "../interfaces/category.interface";

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("CategoryModel", categorySchema);

export default CategoryModel;
